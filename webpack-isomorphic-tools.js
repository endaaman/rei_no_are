'use strict'
var webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')



module.exports = {
  assets: {
    images: {
      extensions: ['png', 'jpe?g', 'gif', 'ico', 'svg']
    },

    style_modules: {
      extensions: ['css'],
      filter: function(module, regex, options, log) {
        // if (options.development) {
        //   return webpack_isomorphic_tools_plugin.style_loader_filter(module, regex, options, log)
        // }
        return regex.test(module.name)
      },

      path: function(module, options, log) {
        if (options.development) {
          return webpack_isomorphic_tools_plugin.style_loader_path_extractor(module, options, log);
        }
        return module.name
      },

      parser: function(module, options, log) {
        // if (options.development) {
        //   return webpack_isomorphic_tools_plugin.css_modules_loader_parser(module, options, log);
        // }
        return module.source
      }
    }
  }
}
