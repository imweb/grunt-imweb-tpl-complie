(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root['JST_1'] = factory();
  }
}(this, function (){
var JST_1 = {
  'test/1.html' : function (it, opt) {
      it = it || {};
      with (it) {
      var _$out_= [];
      _$out_.push('<p>Hello, world</p>');
      return _$out_.join('');
    }
    },
  'test/2.html' : function (it, opt) {
      it = it || {};
      with (it) {
      var _$out_= [];
      _$out_.push('<p>', say, '</p>');
      return _$out_.join('');
    }
    }
  };
  return JST_1;
}));