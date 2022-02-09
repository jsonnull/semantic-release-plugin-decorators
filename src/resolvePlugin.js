const { basename } = require('path');

// Given a plugin definitien (entry in a list of plugins, get the plugin module back and its configuration
const resolvePlugin = pluginDefinition => {
  if (
    Array.isArray(pluginDefinition) &&
    typeof pluginDefinition[0] === 'string'
  ) {
    const [path, pluginConfig] = pluginDefinition;
    return {
      plugin: require(path),
      pluginConfig,
      pluginName: basename(path),
    };
  } else if (typeof pluginDefinition === 'string') {
    return {
      plugin: require(pluginDefinition),
      pluginConfig: {},
      pluginName: pluginDefinition,
    };
  } else if (pluginDefinition && 'path' in pluginDefinition) {
    const { path, ...pluginConfig } = pluginDefinition;
    return {
      plugin: require(path),
      pluginConfig,
      pluginName: path,
    };
  }

  throw new Error(
    `${
      wrapperName ? wrapperName : 'semantic-release-plugin-decorators'
    }: Incorrect plugin type. Expected string, tuple of string and options, or object containing path, but was ${JSON.stringify(
      pluginDefinition
    )}.`
  );
};

module.exports = resolvePlugin;
