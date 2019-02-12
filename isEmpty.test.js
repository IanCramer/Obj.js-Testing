const obj = require('./obj');
isEmpty = obj.isEmpty;
// True on primitives, false on defined objects
// True on iterables?

describe('isEmpty', () =>
{
	test('no arguements', () =>
	{
		expect(isEmpty()).toBe(true);
	});

	test('one undefined/null arguement', () =>
	{
		expect(isEmpty(undefined)).toBe(true);
		expect(isEmpty(null)).toBe(true);	
	});

	test('multiple undefined/null arguement', () =>
	{
		expect(isEmpty(undefined, null)).toBe(true);
		expect(isEmpty(null, undefined, null)).toBe(true);	
	});

	test('one boolean arguement', () =>
	{
		expect(isEmpty(true)).toBe(true);
		expect(isEmpty(false)).toBe(true);	
	});

	test('multiple boolean arguement', () =>
	{
		expect(isEmpty(true, false)).toBe(true);
		expect(isEmpty(false, true, true)).toBe(true);	
	});

	test('one number arguement', () =>
	{
		expect(isEmpty(5)).toBe(true);
		expect(isEmpty(3.75)).toBe(true);
		expect(isEmpty(0)).toBe(true);
		expect(isEmpty(-4)).toBe(true);	
	});

	test('multiple number arguement', () =>
	{
		expect(isEmpty(5, 3.75, 0, -4)).toBe(true);
		expect(isEmpty(3.75, 0, -4, 5)).toBe(true);
		expect(isEmpty(0, -4, 5, 3.75)).toBe(true);
		expect(isEmpty(-4, 5, 3.75, 0)).toBe(true);	
	});

	test('one string arguement. True on empty string.', () =>
	{
		expect(isEmpty('true')).toBe(false);
		expect(isEmpty('')).toBe(true);	
	});

	test('multiple string arguement. True on first string empty.', () =>
	{
		expect(isEmpty('true', '', 'another string')).toBe(false);
		expect(isEmpty('', 'more strings')).toBe(true);	
	});

	test('one object arguement. True on empty object.', () =>
	{
		var chair = {numLegs: 4, material: 'wood', comfy: true};
		var emptyObject = {};
		expect(isEmpty(chair)).toBe(false);
		expect(isEmpty(emptyObject)).toBe(true);
	});
});
