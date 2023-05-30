const config = {
    baseUrl: process.env.baseUrl || 'https://cataas.com',
    greeting: process.env.GREETING || 'Hello',
    who: process.env.WHO || 'You',
    width: parseInt(process.env.WIDTH) || 400,
    height: parseInt(process.env.HEIGHT) || 500,
    color: process.env.COLOR || 'Pink',
    size: parseInt(process.env.SIZE) || 100
  };
  
  export default config;
  