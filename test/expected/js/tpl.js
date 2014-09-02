(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root['JST_tpl'] = factory();
    }
}(this, function () {
    return {
        'encode': function (it, opt) {
            it = it || {};
            with(it) {
                var _$out_ = [];
                _$out_.push('', opt.encodeHtml(say), '');
                return _$out_.join('');
            }
        },
        'it': function (it, opt) {
            it = it || {};
            with(it) {
                var _$out_ = [];
                _$out_.push('<p>', it.say, '</p>');
                return _$out_.join('');
            }
        },
        'render': function (it, opt) {
            it = it || {};
            with(it) {
                var _$out_ = [];
                _$out_.push('<p>', say, '</p>');
                return _$out_.join('');
            }
        },
        'static': function (it, opt) {
            it = it || {};
            with(it) {
                var _$out_ = [];
                _$out_.push('<p>Hello, world</p>');
                return _$out_.join('');
            }
        }
    };
}));