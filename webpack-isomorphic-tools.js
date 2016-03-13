var webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')



module.exports = {
  assets: {
    styles: {
      extension: 'css',
      filter: function(module, regular_expression, options, log) {
        if (options.development) {
          return webpack_isomorphic_tools_plugin.style_loader_filter(module, regular_expression, options, log)
        }
      },
      path: webpack_isomorphic_tools_plugin.style_loader_path_extractor,
      parser: webpack_isomorphic_tools_plugin.css_loader_parser,
    }
  }
}
