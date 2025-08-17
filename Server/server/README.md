# TON Proxy Service

This is a local proxy service that provides more reliable access to TON blockchain APIs.

## Prerequisites

1. Install .NET 6.0 SDK from https://dotnet.microsoft.com/download/dotnet/6.0

## Setup

1. Navigate to this directory in your terminal/command prompt:
```
cd "c:\Users\tyler\OneDrive\Desktop\Lisa Airdrop Game\Lisa Airdrop Game\server"
```

2. Install dependencies:
```
dotnet restore
```

3. Run the service:
```
dotnet run
```

The service will start at http://localhost:5000

## Verify the service is running

Open your web browser and navigate to:
http://localhost:5000/api/health

You should see the message "TonProxyService is running!"

## Integration with your game

The JavaScript application will automatically detect when the proxy service is running and use it as a fallback when TON APIs fail.

To prioritize the local proxy for more reliable connections, you can add this code:

```javascript
import { tonApiService } from './services/tonApiService.js';

// Set local proxy as the priority
tonApiService.setLocalProxyOptions({
  useLocalProxy: true,
  localProxyPriority: true
});
```

## Troubleshooting

- If the service fails to start, make sure port 5000 is not already in use
- Check Windows Firewall settings if your JavaScript app can't connect to the service
- To view debug logs, run with the development environment:
  ```
  set ASPNETCORE_ENVIRONMENT=Development
  dotnet run
  ```
