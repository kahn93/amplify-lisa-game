using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace TonProxyService
{
    public class Startup
    {
        // Configure CORS to allow requests from your app
        readonly string AllowSpecificOrigins = "_allowSpecificOrigins";

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000", 
                                           "http://127.0.0.1:3000",
                                           "http://localhost:5000",
                                           "http://127.0.0.1:5000",
                                           "http://localhost:8080",
                                           "http://127.0.0.1:8080",
                                           "file://")
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });

            // Register HTTP client
            services.AddHttpClient();
            services.AddLogging();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseCors(AllowSpecificOrigins);

            app.UseEndpoints(endpoints =>
            {
                // Endpoint for getting sequence number
                endpoints.MapGet("/api/getseqno/{address}", async context =>
                {
                    try
                    {
                        string address = context.Request.RouteValues["address"]?.ToString();
                        if (string.IsNullOrEmpty(address))
                        {
                            await WriteErrorResponse(context, "Address parameter is required", 400);
                            return;
                        }

                        logger.LogInformation($"Getting seqno for address: {address}");
                        var httpClientFactory = context.RequestServices.GetRequiredService<IHttpClientFactory>();
                        var httpClient = httpClientFactory.CreateClient();
                        
                        // Try multiple endpoints
                        var endpoints = new string[] {
                            $"https://toncenter.com/api/v2/runGetMethod?address={address}&method=seqno",
                            $"https://tonapi.io/v2/blockchain/accounts/{address}/methods/get_seqno"
                        };

                        Exception lastException = null;
                        foreach (var endpoint in endpoints)
                        {
                            try
                            {
                                var apiResponse = await httpClient.GetAsync(endpoint);
                                if (apiResponse.IsSuccessStatusCode)
                                {
                                    var content = await apiResponse.Content.ReadAsStringAsync();
                                    var jsonContent = JsonDocument.Parse(content);
                                    
                                    // Parse the result based on the API format
                                    int seqno = 0;
                                    if (endpoint.Contains("toncenter.com"))
                                    {
                                        if (jsonContent.RootElement.TryGetProperty("result", out var resultProp))
                                        {
                                            if (resultProp.ValueKind == JsonValueKind.Object && 
                                                resultProp.TryGetProperty("stack", out var stackProp) && 
                                                stackProp.ValueKind == JsonValueKind.Array && 
                                                stackProp.GetArrayLength() > 0)
                                            {
                                                var firstItem = stackProp[0];
                                                if (firstItem.TryGetProperty("value", out var valueProp))
                                                {
                                                    seqno = int.Parse(valueProp.GetString() ?? "0");
                                                }
                                            }
                                        }
                                    }
                                    else // tonapi.io format
                                    {
                                        if (jsonContent.RootElement.TryGetProperty("seqno", out var seqnoProp))
                                        {
                                            seqno = seqnoProp.GetInt32();
                                        }
                                    }
                                    
                                    var response = new
                                    {
                                        success = true,
                                        seqno = seqno,
                                        timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds()
                                    };

                                    await WriteJsonResponse(context, response);
                                    return;
                                }
                            }
                            catch (Exception ex)
                            {
                                lastException = ex;
                                logger.LogError($"Failed to get seqno from {endpoint}: {ex.Message}");
                            }
                        }
                        
                        // If all endpoints failed, return an error
                        if (lastException != null)
                        {
                            await WriteErrorResponse(context, $"All API endpoints failed. Last error: {lastException.Message}", 500);
                        }
                        else
                        {
                            await WriteErrorResponse(context, "All API endpoints failed", 500);
                        }
                    }
                    catch (Exception ex)
                    {
                        logger.LogError($"Error in getseqno: {ex.Message}");
                        await WriteErrorResponse(context, $"Error getting seqno: {ex.Message}", 500);
                    }
                });

                // Endpoint for fetching manifest
                endpoints.MapGet("/api/manifest", async context =>
                {
                    try
                    {
                        string url = context.Request.Query["url"];
                        if (string.IsNullOrEmpty(url))
                        {
                            await WriteErrorResponse(context, "URL parameter is required", 400);
                            return;
                        }

                        logger.LogInformation($"Fetching manifest from: {url}");
                        var httpClientFactory = context.RequestServices.GetRequiredService<IHttpClientFactory>();
                        var httpClient = httpClientFactory.CreateClient();
                        httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
                        httpClient.DefaultRequestHeaders.Add("Cache-Control", "no-cache");
                        
                        try
                        {
                            var manifestResponse = await httpClient.GetAsync(url);
                            if (manifestResponse.IsSuccessStatusCode)
                            {
                                var content = await manifestResponse.Content.ReadAsStringAsync();
                                await context.Response.WriteAsync(content);
                                return;
                            }
                        }
                        catch (Exception ex)
                        {
                            logger.LogError($"Error fetching manifest directly: {ex.Message}");
                        }

                        // Try through a proxy
                        try
                        {
                            string proxyUrl = $"https://api.allorigins.win/raw?url={WebUtility.UrlEncode(url)}";
                            var proxyResponse = await httpClient.GetAsync(proxyUrl);
                            
                            if (proxyResponse.IsSuccessStatusCode)
                            {
                                var content = await proxyResponse.Content.ReadAsStringAsync();
                                await context.Response.WriteAsync(content);
                                return;
                            }
                        }
                        catch (Exception ex)
                        {
                            logger.LogError($"Error fetching manifest through proxy: {ex.Message}");
                        }
                        
                        // If all attempts fail, return a default manifest
                        var defaultManifest = new
                        {
                            url = url,
                            name = "Lisa Airdrop Game",
                            iconUrl = "",
                            termsOfUseUrl = "",
                            privacyPolicyUrl = "",
                            version = "1.0.0"
                        };
                        
                        await WriteJsonResponse(context, defaultManifest);
                    }
                    catch (Exception ex)
                    {
                        logger.LogError($"Error in manifest endpoint: {ex.Message}");
                        await WriteErrorResponse(context, $"Error fetching manifest: {ex.Message}", 500);
                    }
                });

                // Health check endpoint
                endpoints.MapGet("/api/health", async context =>
                {
                    await context.Response.WriteAsync("TonProxyService is running!");
                });
            });
        }

        private static async Task WriteJsonResponse(HttpContext context, object data)
        {
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonSerializer.Serialize(data));
        }

        private static async Task WriteErrorResponse(HttpContext context, string message, int statusCode)
        {
            context.Response.StatusCode = statusCode;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonSerializer.Serialize(new { error = message }));
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseUrls("http://localhost:5000");
                });
    }
}
