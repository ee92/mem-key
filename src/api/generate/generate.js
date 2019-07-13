import pbkdf2 from 'pbkdf2';
import md5 from 'md5';
import wordList from '../../words.js';

export function createKey(site, email, secret, settings){
	const alfanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
						 "abcdefghijklmnopqrstuvwxyz" +
						 "0123456789";
	const {
		isMemorable,
		length,
		useSalt,
		salt,
		numWords, 
		symbols, 
		includeSymbol } = settings;
	
	const str = site + 
					email + 
					secret + 
					length + 
					numWords + 
					symbols + 
					includeSymbol;

	const saltUsed = useSalt ? salt : '';

	const hash = pbkdf2
		.pbkdf2Sync(str, saltUsed, 1, isMemorable ? 32 : length, 'sha512')
		.toString('hex')
		.split('')
		.filter((x) => !isNaN(Number(x)));
	const number = hash[0];
	const symbol = includeSymbol
		? symbols.split('')[hash[1] % symbols.length]
		: '';
	let password = '';
	if (isMemorable) {
		for (let i = 0; i < Number(numWords); i++) {
			const key = hash.slice(i * 7, i * 7 + 7).join('') % wordList.length;
			let word = wordList[key];
			word = word.charAt(0).toUpperCase() + word.slice(1);
			password += word;
		}
	} else {
		let offset = symbols ? 2 : 1;
		for (let i = 0; i < Number(length) - offset; i++) {
			const key = hash.slice(2 * i, 2 * i + 2).join('') % alfanum.length;
			const char = alfanum.split('')[key];
			password += char;
		}
	}

	password += number + symbol;
	return password;
}

export function visualAid(text) {
	if (!text) return [];
	let aid = [];
	let icons = ['anchor', 'bicycle', 'bomb', 'cloud', 'cube', 
						'fire', 'flask', 'gem', 'heart', 'leaf', 'lightbulb',
						'moon', 'phone', 'plane', 'plug', 'rocket', 'snowflake',
						'sun', 'utensils', 'truck', 'tree', 'star', 'paw'];
	let colors = ['#f172a1', '#8eff60', '#ff0000',
						'#ffd700', '#3399ff', '#8a2be2'];
	const hash = md5(text).split('').filter((x) => !isNaN(Number(x)));
	for (let i = 0; i < 3; i++) {
		const segment = hash.slice(i * 5, i * 5 + 5).join('') ;
		const icon = icons[segment % icons.length];
		const color = colors[segment % colors.length];
		icons = icons.filter(x => x !== icon);
		colors = colors.filter(x => x !== color);
		aid.push([icon, color]);
	}
	return aid;
}

export function randomWord() {
	let word = wordList[Math.floor(Math.random() * wordList.length)];
	return word;
}