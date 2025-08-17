declare const awsconfig: {
  Auth: {
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
  };
  Storage: {
    bucket: string;
    region: string;
  };
  API: {
    endpoints: Array<{
      name: string;
      endpoint: string;
    }>;
  };
};

export default awsconfig;