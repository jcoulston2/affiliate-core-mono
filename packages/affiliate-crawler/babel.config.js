module.exports = (api) => {
  const isTest = api.env('test');
  const baseConfig = {
    presets: ['@babel/preset-env', '@babel/preset-flow'],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      'require-context-hook',
      'transform-class-properties',
    ],
  };
  return isTest ? baseConfig : { ...baseConfig, ignore: ['./evaluation'] };
};
