/*!
 * grunt-imweb-tpl-complie
 *
 * Copyright (c) 2013 Daniel Yang
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var path = require('path')
    , fs = require('fs')
    , EOL = '\n';
  function compileTmpl(tmpl) {
    var res = []
      , strict = (/\bit\b/).test(tmpl);
    tmpl.replace(/<\/script>/ig, '</s<%=""%>cript>');
    res.push([
      "function (it, opt) {",
      "      it = it || {};",
      "      with (it) {",
      "      var _$out_= [];",
      "      _$out_.push('" + tmpl
        .replace(/\r\n|\n|\r/g, "\v")
        .replace(/(?:^|%>).*?(?:<%|$)/g, function($0) {
          return $0.replace(/('|\\)/g, "\\$1").replace(/[\v\t]/g, "").replace(/\s+/g, " ")
        })
        .replace(/[\v]/g, EOL)
        .replace(/<%==(.*?)%>/g, "', opt.encodeHtml($1), '")
        .replace(/<%=(.*?)%>/g, "', $1, '")
        .replace(/<%(<-)?/g, "');" + EOL + "      ")
        .replace(/->(\w+)%>/g, EOL + "      $1.push('")
        .split("%>").join(EOL + "      _$out_.push('") + "');",
      "      return _$out_.join('');",
      "    }",
      "    }"
    ].join(EOL).replace(/_\$out_\.push\(''\);/g, ''));

    return res.join('');
  }

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
        var compiled = compileTmpl(src);
        var filename = processName(filepath);
        return "  '" + filename + "' : " + compiled + ",";
      });

      output.unshift([
        "(function (root, factory) {",
        "  if (typeof define === 'function' && define.amd) {",
        "    define(factory);",
        "  } else {",
        "    root['" + name + "'] = factory();",
        "  }",
        "}(this, function (){",
        "var " + name + " = {"
      ].join(EOL));
      output.push('  };');
      output = output.join(grunt.util.normalizelf(grunt.util.linefeed));
      var lastDou = output.lastIndexOf(',');
      output = output.substr(0, lastDou) + output.substr(lastDou + 1);
      output += EOL + '  return ' + name + ';' + EOL + '}));';

      grunt.file.write(f.dest, output);
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
