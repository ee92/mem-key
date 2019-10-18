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

export function createKey(site, email, secret, settings) {
	const {
		isMemorable,
		numLetters,
		useSalt,
		salt,
		numWords, 
		symbols, 
		useSymbols } = settings
	
	const str = site + email + secret + numLetters + numWords + symbols
	const saltUsed = useSalt ? salt : ''
	const hashLength = getHashLength(isMemorable, numWords, numLetters, useSymbols)
	const hash = pbkdf2
		.pbkdf2Sync(str, saltUsed, 1, hashLength, 'sha512')
		.toString('hex')
	
	let key
	if (isMemorable) {
		key = hashToWords(hash)
		key = appendNumber(key, hash)
		key = appendSymbol(key, hash, symbols)
	} else {
		key = hashToChars(hash, useSymbols && symbols)
		key = appendNumber(key, hash)
	}
	return key
}

function getHashLength(isMemorable, numWords, numLetters, useSymbols) {
	if (isMemorable) {
		/*	if (useSymbols) {
			return numWords * 2 + 2
		} */
		return numWords * 2
	} else {
		return numLetters - 1
	}
}

function hashToWords(hash) {
	let key = ''
	for (let i=0; i<hash.length; i+=4) {
		const hex = hash.slice(i, i + 4)
		const index = Math.floor(parseInt(hex, 16) / 65535 * wordList.length)
		let word = wordList[index]
		word = word.charAt(0).toUpperCase() + word.slice(1)
		key += word
	}
	return key
}

function hashToChars(hash, symbols) {
	const alfanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
						 "abcdefghijklmnopqrstuvwxyz" +
						 "0123456789" + 
						 symbols || ""   // add symbols if supplied
	let key = ''
	for (let i=2; i<hash.length; i+=2) {
		const hex = hash.slice(i, i + 2)
		const index = Math.floor(parseInt(hex, 16) / 255 * alfanum.length)
		const char = alfanum[index]
		key += char
	}
	return key
}

function appendNumber(str, hash) {
	const hex = hash.slice(0, 2)
	const number = Math.floor(parseInt(hex, 16) / 255 * 10)
   return str + number
}

function appendSymbol(str, hash, symbols) {
	const hex = hash.slice(0, 2)
	const index = Math.floor(parseInt(hex, 16) / 255 * symbols.length)
	const symbol = symbols.charAt(index)
	return str + symbol
}
