import forge from 'node-forge'

function stringToUint8Array(str: string): Uint8Array {
	const arr = new Uint8Array(str.length)
	for (let i = 0; i < str.length; i++) {
		arr[i] = str.charCodeAt(i)
	}
	return arr
}

function uint8ArrayToString(uint8Array: Uint8Array): string {
	return String.fromCharCode(...uint8Array)
}

function getRandomUint8Array(bytes: number): Uint8Array {
	return Uint8Array.from(forge.random.getBytesSync(bytes), (c) =>
		c.charCodeAt(0),
	)
}

function getRandomHex(bytes: number): string {
	return uint8ArrayToHex(getRandomUint8Array(bytes))
}

function uint8ArrayToHex(uint8Array: Uint8Array): string {
	let hex = ''
	for (const byte of uint8Array) {
		hex += byte.toString(16).padStart(2, '0')
	}
	return hex
}

function hexToUint8Array(hex: string): Uint8Array {
	if (hex.length % 2 !== 0) {
		throw new Error('Invalid hex string')
	}
	const array = new Uint8Array(hex.length / 2)
	for (let i = 0; i < hex.length; i += 2) {
		array[i / 2] = parseInt(hex.substr(i, 2), 16)
	}
	return array
}

export const utils = {
	stringToUint8Array,
	uint8ArrayToString,
	uint8ArrayToHex,
	getRandomUint8Array,
	getRandomHex,
	hexToUint8Array,
}
