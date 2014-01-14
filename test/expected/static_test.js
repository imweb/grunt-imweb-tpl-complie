describe('static', function () {
	it('should able to render static html', function () {
		window['JST_1']['test/1.html']().should.equal('<p>Hello, world</p>');
	});

	it('should able to render with data', function () {
		window['JST_1']['test/2.html']({
			say: 'Hello, world'
		}).should.equal('<p>Hello, world</p>');
	})
})