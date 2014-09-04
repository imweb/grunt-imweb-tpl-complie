/*!
 * grunt-imweb-tpl-complie
 *
 * Modified grunt-template-inline
 * https://github.com/vermilion1/grunt-template-inline
 * Thanks to these open source projects
 * The MIT License
 */

'use strict';

module.exports = function (grunt) {

  var path = require('path')
    , fs = require('fs')
    , beautify = require('js-beautify')
    , EOL = '\n'
    , compileTmpl = require('micro-tpl');

  grunt.registerMultiTask('tplComplie', 'Compile templates to JS file', function () {
    var options = this.options({
      namespace: 'JST',
      processContent: function (src) {
        return src;
      },
      processName: function (name) {
        return path.basename(name).replace('.html', '');
      }
    });
    var processName = options.processName || function (name) { return path.basename(name).replace('.html', ''); };

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function (f) {
      var path = require('path')
        , name = options.namespace + '_' + (path.basename(f.dest, '.js'));

      var output = f.src.filter(function (filepath) {
        var exists = grunt.file.exists(filepath);
        if (!exists) {
          grunt.log.warn('File "' + filepath + '" not found.');
        }
        return exists;
      })
      .map(function (filepath) {
        var src = options.processContent(grunt.file.read(filepath));
        var compiled = compileTmpl(src, { path: filepath });
        var filename = processName(filepath);
        return "    '" + filename + "' : " + compiled + ",";
      });

      output.unshift([
        "(function (root, factory) {",
        "  if (typeof define === 'function' && define.amd) {",
        "    define(factory);",
        "  } else {",
        "    root['" + name + "'] = factory();",
        "  }",
        "}(this, function (){",
        "  return {"
      ].join(EOL));
      output.push('  };');
      output = output.join(grunt.util.normalizelf(grunt.util.linefeed));
      var lastDou = output.lastIndexOf(',');
      output = output.substr(0, lastDou) + output.substr(lastDou + 1);
      output += EOL + '}));';

      grunt.file.write(f.dest, beautify(output, {
        "jslint_happy": true
      }));
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
