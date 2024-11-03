import { utils } from '@/utils'
import forge from 'node-forge'

function createInstance() {
	return forge.md.sha256.create()
}

function digest(data: string) {
	return createInstance().update(data, 'utf8').digest()
}

function fromStringToHex(data: string): string {
	return digest(data).toHex()
}

function fromStringToString(data: string): string {
	return digest(data).bytes()
}

function fromStringToUint8Array(data: string): Uint8Array {
	return utils.stringToUint8Array(fromStringToString(data))
}

const fromString = {
	toHex: fromStringToHex,
	toString: fromStringToString,
	toUint8Array: fromStringToUint8Array,
}

function fromUint8ArrayToHex(data: Uint8Array): string {
	return fromStringToHex(utils.uint8ArrayToString(data))
}

function fromUint8ArrayToString(data: Uint8Array): string {
	return fromStringToString(utils.uint8ArrayToString(data))
}

function fromUint8ArrayToUint8Array(data: Uint8Array): Uint8Array {
	return fromStringToUint8Array(utils.uint8ArrayToString(data))
}

const fromUint8Array = {
	toHex: fromUint8ArrayToHex,
	toString: fromUint8ArrayToString,
	toUint8Array: fromUint8ArrayToUint8Array,
}

export const SHA256 = {
	createInstance,
	digest,
	fromString,
	fromUint8Array,
}
