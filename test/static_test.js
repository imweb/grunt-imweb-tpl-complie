var grunt = require('grunt')
  , fs = require('fs');

function readFile(file) {
  'use strict';
  var contents = grunt.file.read(file);

  if (process.platform === 'win32')
      contents = contents.replace(/\r\n/g, '\n');
}

function assertTplEquality(test, tpl, pathToRxpected, message) {
  var expected = readFile(pathToRxpected);
  test.equal(expected, tpl, message);
}

exports.tpl = function (test) {
  'use strict';

  test.expect(1);
  require('../tmp/1');
  console.log(global['JST_1']);

  assertTplEquality(test, '', 'test/expected/1.html')
};