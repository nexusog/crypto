import { utils } from '@/utils'
import forge from 'node-forge'

const DEFAULT_IV_BYTES: number = 16
const DEFAULT_TAG_BYTES: number = 16
const DEFAULT_ALGORITHM: forge.cipher.Algorithm = 'AES-GCM'

type Options = {
	ivBytes?: number
	tagBytes?: number
	algorithm?: forge.cipher.Algorithm
}

export type EncryptOptions = Options

export type DecryptOptions = Omit<Options, 'ivBytes' | 'tagBytes'>

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
	const {
		algorithm = DEFAULT_ALGORITHM,
		ivBytes = DEFAULT_IV_BYTES,
		tagBytes = DEFAULT_TAG_BYTES,
	} = options || {}

	const iv = generateIvString(ivBytes)

	const cipher = createCipher(key, algorithm)

	cipher.start({ iv, tagLength: tagBytes })

	cipher.update(forge.util.createBuffer(data, 'utf8'))

	const success = cipher.finish()

	if (!success) {
		throw new Error('Encryption failed or data is corrupted.')
	}

	const tag = cipher.mode.tag.bytes()

	return {
		iv,
		tag,
		data: cipher.output.getBytes(),
	}
}

function encryptFromStringToUint8Array(
	data: string,
	key: string,
	options?: Partial<EncryptOptions>,
) {
	const encrypted = encryptFromStringToString(data, key, options)

	return {
		iv: utils.stringToUint8Array(encrypted.iv),
		tag: utils.stringToUint8Array(encrypted.tag),
		data: utils.stringToUint8Array(encrypted.data),
	}
}

function encryptFromStringToHex(
	data: string,
	key: string,
	options?: Partial<EncryptOptions>,
) {
	const encrypted = encryptFromStringToString(data, key, options)

	return {
		iv: utils.stringToHex(encrypted.iv),
		tag: utils.stringToHex(encrypted.tag),
		data: utils.stringToHex(encrypted.data),
	}
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

function decryptFromStringToString(
	data: string,
	key: string,
	iv: string,
	tag: string,
	options?: Partial<DecryptOptions>,
) {
	const { algorithm = DEFAULT_ALGORITHM } = options || {}

	const decipher = createDecipher(key, algorithm)

	decipher.start({
		iv: forge.util.createBuffer(iv),
		tag: forge.util.createBuffer(tag),
	})

	decipher.update(forge.util.createBuffer(data))

	const success = decipher.finish()

	const output = decipher.output.getBytes()

	if (!success || output.length === 0) {
		throw new Error('Decryption failed or data is corrupted.')
	}

	return output
}

function decryptFromStringToUint8Array(
	data: string,
	key: string,
	iv: string,
	tag: string,
	options?: Partial<DecryptOptions>,
) {
	return utils.stringToUint8Array(
		decryptFromStringToString(data, key, iv, tag, options),
	)
}

function decryptFromStringToHex(
	data: string,
	key: string,
	iv: string,
	tag: string,
	options?: Partial<DecryptOptions>,
) {
	return utils.stringToHex(
		decryptFromStringToString(data, key, iv, tag, options),
	)
}

function decryptFromUint8ArrayToString(
	data: Uint8Array,
	key: string,
	iv: string,
	tag: string,
	options?: Partial<DecryptOptions>,
) {
	return decryptFromStringToString(
		utils.uint8ArrayToString(data),
		key,
		iv,
		tag,
		options,
	)
}

function decryptFromUint8ArrayToUint8Array(
	data: Uint8Array,
	key: string,
	iv: string,
	tag: string,
	options?: Partial<DecryptOptions>,
) {
	return decryptFromStringToUint8Array(
		utils.uint8ArrayToString(data),
		key,
		iv,
		tag,
		options,
	)
}

function decryptFromUint8ArrayToHex(
	data: Uint8Array,
	key: string,
	iv: string,
	tag: string,
	options?: Partial<DecryptOptions>,
) {
	return decryptFromStringToHex(
		utils.uint8ArrayToString(data),
		key,
		iv,
		tag,
		options,
	)
}

const decrypt = {
	fromString: {
		toString: decryptFromStringToString,
		toUint8Array: decryptFromStringToUint8Array,
		toHex: decryptFromStringToHex,
	},
	fromUint8Array: {
		toString: decryptFromUint8ArrayToString,
		toUint8Array: decryptFromUint8ArrayToUint8Array,
		toHex: decryptFromUint8ArrayToHex,
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
	decrypt,
}
