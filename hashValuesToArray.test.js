const obj = require('./obj');
hashValuesToArray = obj.hashValuesToArray;



describe('hashValuesToArray', () =>
{
	test('no arguements', () =>
	{
		expect(hashValuesToArray()).toEqual( [] );
	});

	test('one primitive arguement', () =>
	{
		expect(hashValuesToArray(true)).toEqual( [] );
		expect(hashValuesToArray(4)).toEqual( [] );
		expect(hashValuesToArray('')).toEqual( [] );
		expect(hashValuesToArray('str')).toEqual( ['s', 't', 'r'] );
	});

	test('one object arguement', () =>
	{
		var obj = {p1: true, p2: 2, p3: 'three'};
		expect(hashValuesToArray(obj)).toEqual( [true, 2, 'three'] );
		expect(hashValuesToArray({})).toEqual( [] );
	});

	test('one function arguement', () =>
	{
		var func = function(x) {return x;}
		expect(hashValuesToArray(func)).toEqual( [] );
	});

	// Testing with a second paramenter wil only sort/not sort the array
	// Second parameter is evaluated on basis of truthiness
	// Third + parameters will be ignored.
});