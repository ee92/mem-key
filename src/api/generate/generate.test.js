import {createKey, visualAid} from './generate';

test('create 42 letter password', () => {
   let key = createKey('test.com', 'test@test.com', 'test', {
      isMemorable: false,
		length: 42,
		numWords: 3,
		includeSymbol: true,
		symbols: "@#$%^&*?!",
		useSalt: false,
		salt: ""
   });
	expect(key).toHaveLength(42);
	// expect(key).toEqual(expect.not.stringContaining('AAAAAAAAAA'));
});

test('create 5 word password', () => {
   let key = createKey('test.com', 'test@test.com', 'test', {
      isMemorable: true,
		length: 10,
		numWords: 5,
		includeSymbol: false,
		symbols: "@#$%^&*?!",
		useSalt: false,
		salt: ""
   });
	expect(key.split(/(?=[A-Z])/)).toHaveLength(5);
});