describe('static', function () {
    it('should able to render static html', function () {
        window['JST_tpl']['static']().should.equal('<p>Hello, world</p>');
    });

    it('should able to render with data', function () {
        window['JST_tpl']['render']({
            say: 'Hello, world'
        }).should.equal('<p>Hello, world</p>');
    });

    it('should able to render use it', function () {
        window['JST_tpl']['it']({
            say: 'Hello, world'
        }).should.equal('<p>Hello, world</p>');
    });

    it('should able to encode', function () {
        window['JST_tpl']['encode']({
            say: '<p>Hello, world</p>'
        }, {
            encodeHtml: function (str) {
                return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/`/g, '&#96;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
            }
        }).should.equal('&lt;p&gt;Hello, world&lt;/p&gt;');
    });

    it('should able to include template', function () {
        window['JST_tpl']['include']({ 
            items: [{ say: 'hello' }, { say: 'tencent' }, { say: 'qqedu' }] 
        }, {
            encodeHtml: function (str) {
                return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/`/g, '&#96;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
            }
        }).should.equal('<p>hello</p><p>tencent</p><p>qqedu</p>');
    });
});