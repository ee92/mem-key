import pbkdf2 from 'pbkdf2'
import md5 from 'md5'

let wordList = [];

window.onload = () => {
	fetch('/assets/words.json')
	.then(data => data.json())
	.then(json => {
		wordList = json
	})
}

export function randomWord() {
	const word = wordList[Math.floor(Math.random() * wordList.length)]
	return word
}

export function visualAid(text) {
	if (!text) return []
	let aid = []
	let icons = ['anchor', 'bicycle', 'bomb', 'cloud', 'cube', 
						'fire', 'flask', 'gem', 'heart', 'leaf', 'lightbulb',
						'moon', 'phone', 'plane', 'plug', 'rocket', 'snowflake',
						'sun', 'utensils', 'truck', 'tree', 'star', 'paw']
	let colors = ['#f172a1', '#8eff60', '#ff0000',
						'#ffd700', '#3399ff', '#8a2be2']
	const hash = md5(text).split('').filter((x) => !isNaN(Number(x)))
	for (let i = 0; i < 3; i++) {
		const segment = hash.slice(i * 5, i * 5 + 5).join('') 
		const icon = icons[segment % icons.length]
		const color = colors[segment % colors.length]
		icons = icons.filter(x => x !== icon)
		colors = colors.filter(x => x !== color)
		aid.push([icon, color])
	}
	return aid
}

export function generatePassword(inputs, settings) {	
	const hash = createHash(inputs, settings);
	if (settings.isMemorable) {
		return createMemorablePassword(hash, settings);
	} else {
		return createScrambledPassword(hash, settings);
	}
}

function createHash(inputs, settings) {
	const str = inputs.site + inputs.email + inputs.secret + settings.useSymbols + settings.symbols + settings.numWords + settings.numLetters;
	const salt = settings.useSalt ? settings.salt : '';
	const length = getHashLength(settings);
	return pbkdf2
		.pbkdf2Sync(str, salt, 1, length, 'sha512')
		.toString('hex');
}

function getHashLength({isMemorable, numWords, numLetters, useSymbols}) {
	if (isMemorable) {
		if (useSymbols) {
			return numWords * 2 + 2
		}
		return numWords * 2 + 1
	}
	return numLetters + 1
}

function createMemorablePassword(hash, settings) {
	let password = '';
	let usedHash = 0;
	for (let i=0; i<settings.numWords; i++) {
		usedHash = (i * 4) + 4
		const hashSlice = hash.slice(i * 4, usedHash);
		const wordIndex = Math.floor(parseInt(hashSlice, 16) / 65535 * wordList.length);
		let word = wordList[wordIndex];
		word = word.charAt(0).toUpperCase() + word.slice(1);
		password += word;
	}
	const hashSlice = hash.slice(usedHash, usedHash += 2);
	const number = Math.floor(parseInt(hashSlice, 16) / 255 * 10);
	password += number;
	if (settings.useSymbols) {
		const hashSlice = hash.slice(usedHash, usedHash += 2);
		const symbolIndex = Math.floor(parseInt(hashSlice, 16) / 255 * settings.symbols.length);
		const symbol = settings.symbols.charAt(symbolIndex);
		password += symbol;
	}
	return password;
}

function createScrambledPassword(hash, settings) {
	const alfanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
						 "abcdefghijklmnopqrstuvwxyz" +
						 "0123456789" + 
						 settings.symbols || '';
	let password = '';
	for (let i=2; i<hash.length; i+=2) {
		const hashSlice = hash.slice(i, i + 2);
		const index = Math.floor(parseInt(hashSlice, 16) / 255 * alfanum.length);
		const char = alfanum[index];
		password += char;
	}
	return password;
}
