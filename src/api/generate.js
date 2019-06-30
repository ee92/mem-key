import pbkdf2 from 'pbkdf2';
import md5 from 'md5';
import wordList from '../word-list.js';

export function createKey(site, email, secret, settings){
	const alfanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const { isMemorable, length, useSalt, salt, numWords, symbols, includeSymbol } = settings;
	const str = site + email + secret + length + numWords + symbols + includeSymbol;

	const saltUsed = useSalt ? salt : '';
	const hash = pbkdf2.pbkdf2Sync(str, saltUsed, 1, 32, 'sha512').toString('hex')
		.split('').filter((x) => !isNaN(Number(x)));
	const number = hash[0];
	const symbol = includeSymbol
		? symbols.split('')[hash[1] % symbols.length]
		: '';

	let password = '';
	if (isMemorable) {
		for (let i = 0; i < Number(numWords); i++) {
			let word = wordList[hash.slice(i * 7, i * 7 + 7).join('') % wordList.length];
			word = word.charAt(0).toUpperCase() + word.slice(1);
			password += word;
		}
	} else {
		let offset = symbols ? 2 : 1;
		for (let i = 0; i < Number(length) - offset; i++) {
			const char = alfanum.split('')[hash.slice(2 * i, 2 * i + 2).join('') % alfanum.length];
			password += char;
		}
	}

	password += number + symbol;
	return password;
}

export function visualAid(text) {
	let aid = []
	if (text) {
		let icons = ['anchor', 'bicycle', 'bomb', 'cloud', 'cube', 'fire', 'flask', 'gem', 'heart', 'leaf', 'lightbulb', 'moon', 'phone', 'plane', 'plug', 'rocket', 'snowflake', 'sun', 'utensils', 'truck', 'tree', 'star', 'paw']
		let colors = ['#f172a1', '#8eff60', '#ff0000', '#ffd700', '#3399ff', '#8a2be2']
		const hash = md5(text).split('').filter((x) => !isNaN(Number(x)))

		for (var i = 0; i < 3; i++) {
			const icon = icons[hash.slice(i * 5, i * 5 + 5).join('') % icons.length]
			icons = icons.filter(x => x !== icon)
			const color = colors[hash.slice(i * 5, i * 5 + 5).join('') % colors.length]
			colors = colors.filter(x => x !== color)
			aid.push([icon, color, i])
		}
	}
	return aid
}