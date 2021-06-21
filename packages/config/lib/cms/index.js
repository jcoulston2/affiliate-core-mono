const context = require.context('./', true, /index\.js/);
const modules = () => context.keys().map(context);

module.exports = modules().reduce((ac, currentModule) => {
  return {
    ...ac,
    ...currentModule.default,
  };
}, {});
