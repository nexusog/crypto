import forge from 'node-forge'

function stringToUint8Array(str: string, max?: number): Uint8Array {
	return new TextEncoder().encode(str).slice(0, max)
}

function uint8ArrayToString(uint8Array: Uint8Array, max?: number): string {
	return new TextDecoder().decode(uint8Array).slice(0, max)
}

// returns a random string of the specified length in hex format
function getRandomString(bytes: number) {
	return stringToHex(forge.random.getBytesSync(bytes)).slice(0, bytes)
}

function getRandomUint8Array(bytes: number) {
	return stringToUint8Array(getRandomString(bytes), bytes)
}

function uint8ArrayToHex(uint8Array: Uint8Array): string {
	return stringToHex(uint8ArrayToString(uint8Array))
}

function stringToHex(str: string): string {
	return forge.util.bytesToHex(str)
}

function hexToString(hex: string): string {
	return forge.util.hexToBytes(hex)
}

function hexToUint8Array(hex: string): Uint8Array {
	return stringToUint8Array(hexToString(hex))
}

export const utils = {
	stringToUint8Array,
	getRandomString,
	getRandomUint8Array,
	uint8ArrayToString,
	uint8ArrayToHex,
	stringToHex,
	hexToString,
	hexToUint8Array,
}
