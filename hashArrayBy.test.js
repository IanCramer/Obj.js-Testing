const obj = require('./obj');
hashArrayBy = obj.hashArrayBy;

describe('hashArrayBy', () =>
{
	test('no arguements', () =>
	{
		expect(hashArrayBy()).toEqual( {} );
	});

	test('one primitive arguement', () =>
	{
		var caughtErr = false;
		try{ expect(hashArrayBy(true)).toEqual( {} ); }
		catch(err){ caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);

		caughtErr = false;
		try{ expect(hashArrayBy(6)).toEqual( {} ); }
		catch(err){ caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);

		expect(hashArrayBy('')).toEqual( {} ); // empty string seems to work?

		caughtErr = false;
		try { expect(hashArrayBy('str')).toEqual( {} ); }
		catch(err) { caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);
	});

	test('two primitive arguements', () =>
	{
		var caughtErr = false;
		try{ expect(hashArrayBy(true, true)).toEqual( {} ); }
		catch(err){ caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);

		caughtErr = false;
		try{ expect(hashArrayBy(true, 6)).toEqual( {} ); }
		catch(err){ caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);

		expect(hashArrayBy('', true)).toEqual( {} ); // empty string seems to work?

		caughtErr = false;
		try { expect(hashArrayBy(true, 'str')).toEqual( {} ); }
		catch(err) { caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);

		var caughtErr = false;
		try{ expect(hashArrayBy(true, 6)).toEqual( {} ); }
		catch(err){ caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);

		caughtErr = false;
		try{ expect(hashArrayBy(6, 4)).toEqual( {} ); }
		catch(err){ caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);

		expect(hashArrayBy('', 5)).toEqual( {} ); // empty string seems to work?

		caughtErr = false;
		try { expect(hashArrayBy('str', 3)).toEqual( {} ); }
		catch(err) { caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);

		var caughtErr = false;
		try{ expect(hashArrayBy(true, 'string')).toEqual( {} ); }
		catch(err){ caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);

		caughtErr = false;
		try{ expect(hashArrayBy(6, 'string')).toEqual( {} ); }
		catch(err){ caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);

		expect(hashArrayBy('', 'string')).toEqual( {} ); // empty string seems to work?

		caughtErr = false;
		try { expect(hashArrayBy('str', 'string')).toEqual( {} ); }
		catch(err) { caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);
	});

	test('one array arguement', () =>
	{
		// Good array but hash function is required. Fails without
		var arr = [true, 2, 'three'];
		var caughtErr = false;
		try
		{
			expect(hashArrayBy(arr)).toEqual( {1: true, 2: 2, 3: 'three'} );
		}
		catch (err)
		{ caughtErr = true; }
		if (!caughtErr)
			expect(true).toBe(false);

		//Empty array works without hash function because nothing to hash
		expect(hashArrayBy( [] )).toEqual( {} );
	});

	test('Simple array, good keyFunc', () =>
	{
		var arr = [1, 2, 3, 4]
		var keyFunc = function(x) { return x; }
		expect(hashArrayBy(arr, keyFunc)).toEqual( {1: 1, 2: 2, 3: 3, 4: 4} );
	});

	test('complex array, good keyFunc', () =>
	{
		var arr = [true, 2, 'three', undefined]
		var keyFunc = function(x) { var obj = {}; obj[x] = 'str'; return Object.keys(obj)[0]; }
		expect(hashArrayBy(arr, keyFunc)).toEqual( {true: true, 2: 2, 'three': 'three', undefined: undefined} );
	});

	test('array of objects, good key function', () =>
	{
		var obj1 = {p1: 'v1'};
		var obj2 = {p2: 'v2'};
		var obj3 = {p3: 'v3'};
		var arr = [obj1, obj2, obj3];
		var keyFunc = function(x) { return x.toString(); };
		// toString() on objects just seems to return '[object Object]'
		// All values are being hashed to the same key so it keeps getting overwritten and data from the array is lost.
		expect(hashArrayBy(arr, keyFunc)).toEqual({ '[object Object]': { p3: 'v3' } });
	});

	// Default aregument is undefined. Undefined and null result in empty object, regardless of other arguments.
	// Non arrays for the array parameter will throw an error (except empty string?)
	// Arrays require a hash function parameter (except empty array).
	// Non functions passed in for key func will throw a non function error
	// Bad hash functions will result in lost values from the original array.
	// Non objects passed in for hash will be replaced by the resultant object
	// Variables passed in for hash must be declared before hand.
	// Fourth + arguments will be ignored
});