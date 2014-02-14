# grunt-imweb-tpl-complie[![build status](https://secure.travis-ci.org/miniflycn/grunt-imweb-tpl-complie.png)](http://travis-ci.org/miniflycn/grunt-imweb-tpl-complie)
> Just a Template Complier

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-imweb-tpl-complie --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-imweb-tpl-complie');
```

## The "tplComplie" task

### Overview
In your project's Gruntfile, add a section named `tplComplie` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tplComplie: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.namespace
Type: `String`
Default value: `'JST'`

The namespace in which the precompiled templates will be assigned.

#### options.processName
Type: `Function`
Default value: `null`

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object.

#### options.processContent
Type: `Function`
Default value: `null`

This option accepts a function which takes one argument (the file content) and returns a string which will be used as template string.


### Usage Examples

#### Default Options

```js
grunt.initConfig({
  tplComplie: {
    options: {},
    files: {
      'dest/template.js': ['src/testing.html', 'src/123.html'],
    },
  },
})
```

#### Custom Options

```js
grunt.initConfig({
  tplComplie: {
    options: {
      namespace: 'custom',
      processName: function (filename) {
        return filename.split(/src\//)[1];
      },
      processContent: function (source) {
        return 'test - ' + source;
      }
    },
    files: {
      'dest/template.js': ['src/testing.html', 'src/123.html'],
    },
  },
})
```

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.