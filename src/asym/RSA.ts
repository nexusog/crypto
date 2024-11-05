import { SHA256 } from '@/hashing/sha256'
import { utils } from '@/utils'
import forge from 'node-forge'

const DEFAULT_KEY_PAIR_BITS: number = 2048
const DEFAULT_ENCRYPTION_SCHEME: forge.pki.rsa.EncryptionScheme = 'RSA-OAEP'

type EncryptionOptions = {
	scheme: forge.pki.rsa.EncryptionScheme
}

function generateKeyPair(bits = DEFAULT_KEY_PAIR_BITS) {
	return forge.pki.rsa.generateKeyPair(bits)
}

function generateKeyPairPEM(bits = DEFAULT_KEY_PAIR_BITS) {
	const keyPair = generateKeyPair(bits)
	return {
		privateKey: forge.pki.privateKeyToPem(keyPair.privateKey),
		publicKey: forge.pki.publicKeyToPem(keyPair.publicKey),
	}
}

function encryptFromStringToString(
	publicKeyPEM: string,
	data: string,
	options?: Partial<EncryptionOptions>,
) {
	const { scheme = DEFAULT_ENCRYPTION_SCHEME } = options || {}

	const rsaPublicKey = forge.pki.publicKeyFromPem(publicKeyPEM)

	return rsaPublicKey.encrypt(data, scheme, {
		md: SHA256.createInstance(),
		mgf1: forge.mgf.mgf1.create(SHA256.createInstance()),
	})
}

function encryptFromStringToUint8Array(
	publicKeyPEM: string,
	data: string,
	options?: Partial<EncryptionOptions>,
) {
	return utils.stringToUint8Array(
		encryptFromStringToString(publicKeyPEM, data, options),
	)
}

function encryptFromStringToHex(
	publicKeyPEM: string,
	data: string,
	options?: Partial<EncryptionOptions>,
) {
	return utils.stringToHex(
		encryptFromStringToString(publicKeyPEM, data, options),
	)
}

function encryptFromUint8ArrayToString(
	publicKeyPEM: string,
	data: Uint8Array,
	options?: Partial<EncryptionOptions>,
): string {
	return encryptFromStringToString(
		publicKeyPEM,
		utils.uint8ArrayToString(data),
		options,
	)
}

function encryptFromUint8ArrayToUint8Array(
	publicKeyPEM: string,
	data: Uint8Array,
	options?: Partial<EncryptionOptions>,
) {
	return encryptFromStringToUint8Array(
		publicKeyPEM,
		utils.uint8ArrayToString(data),
		options,
	)
}

function encryptFromUint8ArrayToHex(
	publicKeyPEM: string,
	data: Uint8Array,
	options?: Partial<EncryptionOptions>,
) {
	return encryptFromStringToHex(
		publicKeyPEM,
		utils.uint8ArrayToString(data),
		options,
	)
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

export const RSA = {
	generateKeyPair,
	generateKeyPairPEM,
	encrypt,
}
