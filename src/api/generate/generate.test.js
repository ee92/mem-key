import {createKey, visualAid} from './generate'


describe('CREATE PASSWORDS', () => {
	test('create 2 word password', () => {
		let key = createKey('test.com', 'test@test.com', 'test', {
			isMemorable: true,
			length: 10,
			numWords: 2,
			includeSymbol: true,
			symbols: "@#$%^&*?!",
			useSalt: true,
			salt: "voc"
		})
		expect(key.split(/(?=[A-Z])/)).toHaveLength(2)
		expect(key).toEqual(expect.not.stringContaining('undefined'))
	})
	
	test('create 6 letter password', () => {
		let key = createKey('test.com', 'test@test.com', 'test', {
			isMemorable: false,
			length: 6,
			numWords: 3,
			includeSymbol: false,
			symbols: "@#$%^&*?!",
			useSalt: false,
			salt: ""
		})
		expect(key).toHaveLength(6)
	})
	
	test('create long non-memorable password', () => {
		let key = createKey('test.com', 'test@test.com', 'test', {
			isMemorable: false,
			length: 42,
			numWords: 3,
			includeSymbol: true,
			symbols: "@#$%^&*?!",
			useSalt: false,
			salt: ""
		})
		expect(key).toHaveLength(42)
		expect(key).toEqual(expect.not.stringContaining('AAAAAAAAAA'))
	})
	
	test('create long memorable password', () => {
		let key = createKey('test.com', 'test@test.com', 'test', {
			isMemorable: true,
			length: 12,
			numWords: 25,
			includeSymbol: false,
			symbols: "@#$%^&*?!",
			useSalt: false,
			salt: ""
		})
		expect(key.split(/(?=[A-Z])/)).toHaveLength(25)
		expect(key).toEqual(
			expect.not.stringContaining(
				'AardvarkAardvarkAardvarkAardvarkAardvark'
			)
		)
	})
})


describe('SHOW VISUAL HINT', () => {
	const fakeInput = Math.random().toString(32)
	const icons = visualAid(fakeInput)
	test('returns array of 3 icons', () => {
		expect(icons).toHaveLength(3)
	})
	test('has no empty values', () => {
		icons.forEach(icon => {
			expect(icon[0]).toBeTruthy()
			expect(icon[1]).toBeTruthy()
		})
	})
})


