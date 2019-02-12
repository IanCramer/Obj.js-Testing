const obj = require('./obj');
walk = obj.walk;

// Function parses a string into an array of string property names.
// Default Argement is undefined and returned.
// Non strings are interpreted as defined but cannot be parsed.
// Empty strings, or strings that result in an empty array after parsing -> all object properties are walked through
// Bad path strings that do not refer to a property result in undefined

describe('walk', () =>
{
	test('no arguements', () =>
	{
		expect(walk()).toBe(undefined);
	});

	test('one argument, all types', () =>
	{
		expect(walk(true)).toBe(undefined);
		expect(walk(4)).toBe(undefined);
		expect(walk('')).toBe(undefined);
		expect(walk('A string')).toBe(undefined);
		var obj = {p1: true, p2: 4, p3: 'A string'};
		expect(walk(obj)).toBe(undefined);
	});

	test('Bad path type (not a string)', () =>
	{
		var obj = {p1: true, p2: 4, p3: 'A string'};
		var anotherObj = {k1: 'v1', k2: 2, k3: false};
		expect(walk(obj, undefined)).toBe(undefined);

		expect(walk(obj, null)).toBe(null); // Interesting note case

		expect(walk(obj, true)).toBe(undefined);
		expect(walk(obj, 6)).toBe(undefined);
		expect(walk(obj, anotherObj)).toBe(undefined);

	});

	test('Bad path structure', () =>
	{
		var obj = {p1: true, p2: 4, p3: 'A string'};
		expect(walk(obj, 'A string with spaces and no dot')).toBe(undefined);
		expect(walk(obj, '')).toBe(obj); // No specified property -> all object's properties
		expect(walk(obj, '.....')).toBe(obj); // No specified property -> all object's properties
	});

	test('Good object, good path', () =>
	{
		var obj = {p1: {k1: {v1: 'A string'} } };
		path = 'p1.k1.v1'; // Path starts at original's property not original object
		expect(walk(obj, path)).toBe('A string');
	});

	test('Good path, bad object', () =>
	{
		var emptyObj = {};
		var badObj = {p1: true, p2: 2, p3: 'some string', p4: {k1: 1}}
		path = 'p1.k1.v1'; // Path starts at original's property not original object
		expect(walk(true, path)).toBe(undefined);
		expect(walk(12, path)).toBe(undefined);
		expect(walk('', path)).toBe(undefined);
		expect(walk('My String', path)).toBe(undefined);
		expect(walk(emptyObj, path)).toBe(undefined);
		expect(walk(badObj, path)).toBe(undefined);
	});

	test('Good object, bad path', () =>
	{
		var obj = {p1: {k1: {v1: 'A string'} } };
		path = 'property.key.valueReference';
		path1 = 'p1,k1,v1';
		expect(walk(obj, path)).toBe(undefined);
		expect(walk(obj, path1)).toBe(undefined);
	});

	test('Good object, good path, with delim', () =>
	{
		var obj = {p1: {k1: {v1: 'A string'} } };
		path = 'p1|k1|v1';
		delim = '|'
		expect(walk(obj, path, delim)).toBe('A string');
	});

	test('Good object, good path, with bad delim', () =>
	{
		var obj = {p1: {k1: {v1: 'A string'} } };
		path = 'p1|k1|v1';
		d1 = true;
		d2 = 5;
		d3 = '';
		d4 = {};
		d5 = {p1: false, p2: 2, p3: 'string'};
		expect(walk(obj, path, d1)).toBe(undefined);
		expect(walk(obj, path, d2)).toBe(undefined);
		expect(walk(obj, path, d3)).toBe(undefined);
		expect(walk(obj, path, d4)).toBe(undefined);
		expect(walk(obj, path, d5)).toBe(undefined);
	});	
});