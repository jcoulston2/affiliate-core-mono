const context = require.context('./', true, /.json/);
const modules = () => context.keys().map(context);

module.exports = modules().reduce((ac, currentModule) => {
  return {
    ...ac,
    ...currentModule.default,
  };
}, {});
