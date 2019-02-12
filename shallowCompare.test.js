const obj = require('./obj');
shallowCompare = obj.shallowCompare;

// Only succeeds on identical iterables

describe('shallowCompare', () =>
{
	test('no arguements', () =>
	{
		expect(shallowCompare()).toBe(true);
	});

	test('one arguement, null/undefined', () =>
	{
		expect(shallowCompare(null)).toBe(true);
		expect(shallowCompare(undefined)).toBe(true);
	});

	test('two arguements, null/undefined', () =>
	{
		expect(shallowCompare(null, undefined)).toBe(true);
		expect(shallowCompare(undefined, null)).toBe(true);
		expect(shallowCompare(undefined, undefined)).toBe(true);
		expect(shallowCompare(null, null)).toBe(true);
	});

	test('three arguements, null/undefined', () =>
	{
		expect(shallowCompare(null, null, null)).toBe(true);
		expect(shallowCompare(null, null, undefined)).toBe(true);
		expect(shallowCompare(null, undefined, null)).toBe(true);
		expect(shallowCompare(null, undefined, undefined)).toBe(true);
		expect(shallowCompare(undefined, null, null)).toBe(true);
		expect(shallowCompare(undefined, null, undefined)).toBe(true);
		expect(shallowCompare(undefined, undefined, null)).toBe(true);
		expect(shallowCompare(undefined, undefined, undefined)).toBe(true);
	});

	test('four (too many) arguements, null/undefined', () =>
	{
		expect(shallowCompare(null, null, null, null)).toBe(true);
		expect(shallowCompare(null, null, null, undefined)).toBe(true);
		expect(shallowCompare(null, null, undefined, null)).toBe(true);
		expect(shallowCompare(null, null, undefined, undefined)).toBe(true);
		expect(shallowCompare(null, undefined, null, null)).toBe(true);
		expect(shallowCompare(null, undefined, null, undefined)).toBe(true);
		expect(shallowCompare(null, undefined, undefined, null)).toBe(true);
		expect(shallowCompare(null, undefined, undefined, undefined)).toBe(true);
		expect(shallowCompare(undefined, null, null, null)).toBe(true);
		expect(shallowCompare(undefined, null, null, undefined)).toBe(true);
		expect(shallowCompare(undefined, null, undefined, null)).toBe(true);
		expect(shallowCompare(undefined, null, undefined, undefined)).toBe(true);
		expect(shallowCompare(undefined, undefined, null, null)).toBe(true);
		expect(shallowCompare(undefined, undefined, null, undefined)).toBe(true);
		expect(shallowCompare(undefined, undefined, undefined, undefined)).toBe(true);
	});

	test('one arguement, primitives. Fails on string', () =>
	{
		expect(shallowCompare(true)).toBe(true);
		expect(shallowCompare(4)).toBe(true);
		expect(shallowCompare(2.7)).toBe(true);
		expect(shallowCompare('')).toBe(true);
		expect(shallowCompare('A string')).toBe(false);
	});

	test('two identical strings', () =>
	{
		expect(shallowCompare('A string', 'A string')).toBe(true);
	});

	test('two same length strings', () =>
	{
		expect(shallowCompare('the string', 'its string')).toBe(false);
	});

	test('two different length strings', () =>
	{
		expect(shallowCompare('the string', 'A string')).toBe(false);
	});

	test('one object, one undefined', () =>
	{
		var chair = {legs: 4, material: 'wood', comfy: true};
		expect(shallowCompare(chair, undefined)).toBe(false);
	});

	test('two objects, same keys same values', () =>
	{
		var obj1 = {p1: 1, p2: 'two', p3: true};
		var obj2 = {p1: 1, p2: 'two', p3: true};
		expect(shallowCompare(obj1, obj2)).toBe(true);
	});

	test('two objects, same keys different values', () =>
	{
		var obj1 = {p1: 1, p2: 'two', p3: true};
		var obj2 = {p1: false, p2: 2, p3: 'three'};
		expect(shallowCompare(obj1, obj2)).toBe(false);
	});

	test('two objects, different keys same values', () =>
	{
		var obj1 = {p11: 1, p12: 'two', p13: true};
		var obj2 = {p21: 1, p22: 'two', p23: true};
		expect(shallowCompare(obj1, obj2)).toBe(false);
	});

	test('two objects of different size', () =>
	{
		var obj1 = {p1: 1, p2: 'two', p3: true};
		var obj2 = {p1: 'one', p2: 2, p3: false, p4: 2.7, p5: 'another string'};
		expect(shallowCompare(obj1, obj2)).toBe(false);
	});

	test('two different objects with specified keys the same key and value', () =>
	{
		var obj1 = {a: 1, b: false, c: 'string', d: 3.4, e: true, f: 'more string'};
		var obj2 = {a1: 12, b1: 6, c: 'string', d: 3.4, e: true, f1: 16};
		expect(shallowCompare(obj1, obj2, ['c', 'd'])).toBe(true);
	});

	test('two different objects with specified keys the same key different value', () =>
	{
		var obj1 = {a: 1, b: false, c: 'string', d: 3.4, e: true, f: 'more string'};
		var obj2 = {a1: 12, b1: 6, c: 'string', d: 7.4, e: true, f1: 16};
		expect(shallowCompare(obj1, obj2, ['c', 'd'])).toBe(false);
	});

	test('two different objects with specified key not in one object', () =>
	{
		var obj1 = {a: 1, b: false, c: 'string', d: 3.4, e: true, f: 'more string'};
		var obj2 = {a1: 12, b1: 6, c1: 'string', d: 3.4, e: true, f1: 16};
		expect(shallowCompare(obj1, obj2, ['c', 'd'])).toBe(false);
	});

	test('two different objects with specified key not in either object', () =>
	{
		var obj1 = {a: 1, b: false, c: 'string', d: 3.4, e: true, f: 'more string'};
		var obj2 = {a1: 12, b1: 6, c1: 'string', d: 7.4, e: true, f1: 16};
		expect(shallowCompare(obj1, obj2, ['x', 'y'])).toBe(true);
	});
});