import { utils } from '@/utils'
import forge from 'node-forge'

const DEFAULT_IV_BYTES: number = 16
const DEFAULT_ALGORITHM: forge.cipher.Algorithm = 'AES-CBC'

export type EncryptOptions = {
	ivBytes?: number
	algorithm?: forge.cipher.Algorithm
}

function generateIv(bytes = DEFAULT_IV_BYTES): Uint8Array {
	return utils.getRandomUint8Array(bytes)
}
function generateIvString(bytes = DEFAULT_IV_BYTES): string {
	return utils.getRandomString(bytes)
}

function createCipher(key: string, algorithm = DEFAULT_ALGORITHM) {
	return forge.cipher.createCipher(algorithm, key)
}

function createDecipher(key: string, algorithm = DEFAULT_ALGORITHM) {
	return forge.cipher.createDecipher(algorithm, key)
}

function encryptFromStringToString(
	data: string,
	key: string,
	options?: Partial<EncryptOptions>,
) {
	const { algorithm = DEFAULT_ALGORITHM, ivBytes = DEFAULT_IV_BYTES } =
		options || {}

	const iv = generateIvString(ivBytes)

	const cipher = createCipher(key, algorithm)

	cipher.start({ iv })

	cipher.update(forge.util.createBuffer(data, 'utf8'))

	cipher.finish()

	return iv + cipher.output.bytes()
}

function encryptFromStringToUint8Array(
	data: string,
	key: string,
	options?: Partial<EncryptOptions>,
) {
	return utils.stringToUint8Array(
		encryptFromStringToString(data, key, options),
	)
}

function encryptFromStringToHex(
	data: string,
	key: string,
	options?: Partial<EncryptOptions>,
) {
	return utils.stringToHex(encryptFromStringToString(data, key, options))
}

function encryptFromUint8ArrayToString(
	data: Uint8Array,
	key: string,
	options?: Partial<EncryptOptions>,
) {
	return encryptFromStringToString(
		utils.uint8ArrayToString(data),
		key,
		options,
	)
}

function encryptFromUint8ArrayToUint8Array(
	data: Uint8Array,
	key: string,
	options?: Partial<EncryptOptions>,
) {
	return encryptFromStringToUint8Array(
		utils.uint8ArrayToString(data),
		key,
		options,
	)
}

function encryptFromUint8ArrayToHex(
	data: Uint8Array,
	key: string,
	options?: Partial<EncryptOptions>,
) {
	return encryptFromStringToHex(utils.uint8ArrayToString(data), key, options)
}

const encrypt = {
	fromString: {
		toString: encryptFromStringToString,
		toUint8Array: encryptFromStringToUint8Array,
		toHex: encryptFromStringToHex,
	},
	fromUint8Array: {
		toString: encryptFromUint8ArrayToString,
		toUint8Array: encryptFromUint8ArrayToUint8Array,
		toHex: encryptFromUint8ArrayToHex,
	},
}

export const AES = {
	DEFAULT_IV_BYTES,
	DEFAULT_ALGORITHM,
	createCipher,
	createDecipher,
	generateIv,
	generateIvString,
	encrypt,
}
