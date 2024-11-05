import { SHA256 } from '@/hashing/sha256'
import { utils } from '@/utils'
import forge from 'node-forge'

const DEFAULT_KEY_PAIR_BITS: number = 2048
const DEFAULT_ENCRYPTION_SCHEME: forge.pki.rsa.EncryptionScheme = 'RSA-OAEP'
const DEFAULT_ENCODING: forge.Encoding = 'raw'

type EncryptionOptions = {
	scheme: forge.pki.rsa.EncryptionScheme
}

type DecryptionOptions = {
	scheme: forge.pki.rsa.EncryptionScheme
}

type SigningOptions = {
	encoding: forge.Encoding
}

type VerifySigningOptions = {
	encoding: forge.Encoding
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

function decryptFromStringToString(
	privateKeyPEM: string,
	encrypted: string,
	options?: Partial<DecryptionOptions>,
) {
	const { scheme = DEFAULT_ENCRYPTION_SCHEME } = options || {}

	const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKeyPEM)

	return rsaPrivateKey.decrypt(encrypted, scheme, {
		md: SHA256.createInstance(),
		mgf1: forge.mgf.mgf1.create(SHA256.createInstance()),
	})
}

function decryptFromStringToUint8Array(
	privateKeyPEM: string,
	encrypted: string,
	options?: Partial<DecryptionOptions>,
) {
	return utils.stringToUint8Array(
		decryptFromStringToString(privateKeyPEM, encrypted, options),
	)
}

function decryptFromStringToHex(
	privateKeyPEM: string,
	encrypted: string,
	options?: Partial<DecryptionOptions>,
) {
	return utils.stringToHex(
		decryptFromStringToString(privateKeyPEM, encrypted, options),
	)
}

function decryptFromUint8ArrayToString(
	privateKeyPEM: string,
	encrypted: Uint8Array,
	options?: Partial<DecryptionOptions>,
) {
	return decryptFromStringToString(
		privateKeyPEM,
		utils.uint8ArrayToString(encrypted),
		options,
	)
}

function decryptFromUint8ArrayToUint8Array(
	privateKeyPEM: string,
	encrypted: Uint8Array,
	options?: Partial<DecryptionOptions>,
) {
	return decryptFromStringToUint8Array(
		privateKeyPEM,
		utils.uint8ArrayToString(encrypted),
		options,
	)
}

function decryptFromUint8ArrayToHex(
	privateKeyPEM: string,
	encrypted: Uint8Array,
	options?: Partial<DecryptionOptions>,
) {
	return decryptFromStringToHex(
		privateKeyPEM,
		utils.uint8ArrayToString(encrypted),
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

function signFromStringToString(
	privateKeyPEM: string,
	data: string,
	options?: Partial<SigningOptions>,
) {
	const { encoding = DEFAULT_ENCODING } = options || {}
	const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKeyPEM)
	const md = SHA256.createInstance()
	md.update(data, encoding)
	return rsaPrivateKey.sign(md)
}

function signFromStringToUint8Array(
	privateKeyPEM: string,
	data: string,
	options?: Partial<SigningOptions>,
) {
	return utils.stringToUint8Array(
		signFromStringToString(privateKeyPEM, data, options),
	)
}

function signFromStringToHex(
	privateKeyPEM: string,
	data: string,
	options?: Partial<SigningOptions>,
) {
	return utils.stringToHex(
		signFromStringToString(privateKeyPEM, data, options),
	)
}

function signFromUint8ArrayToString(
	privateKeyPEM: string,
	data: Uint8Array,
	options?: Partial<SigningOptions>,
) {
	return signFromStringToString(
		privateKeyPEM,
		utils.uint8ArrayToString(data),
		options,
	)
}

function signFromUint8ArrayToUint8Array(
	privateKeyPEM: string,
	data: Uint8Array,
	options?: Partial<SigningOptions>,
) {
	return signFromStringToUint8Array(
		privateKeyPEM,
		utils.uint8ArrayToString(data),
		options,
	)
}

function signFromUint8ArrayToHex(
	privateKeyPEM: string,
	data: Uint8Array,
	options?: Partial<SigningOptions>,
) {
	return signFromStringToHex(
		privateKeyPEM,
		utils.uint8ArrayToString(data),
		options,
	)
}

const sign = {
	fromString: {
		toString: signFromStringToString,
		toUint8Array: signFromStringToUint8Array,
		toHex: signFromStringToHex,
	},
	fromUint8Array: {
		toString: signFromUint8ArrayToString,
		toUint8Array: signFromUint8ArrayToUint8Array,
		toHex: signFromUint8ArrayToHex,
	},
}

function verifySignFromString(
	publicKeyPEM: string,
	data: string,
	signature: string,
	options?: Partial<VerifySigningOptions>,
) {
	const { encoding = DEFAULT_ENCODING } = options || {}

	const rsaPublicKey = forge.pki.publicKeyFromPem(publicKeyPEM)
	const md = SHA256.createInstance()
	md.update(data, encoding)
	return rsaPublicKey.verify(md.digest().bytes(), signature)
}

function verifySignFromUint8Array(
	publicKeyPEM: string,
	data: Uint8Array,
	signature: Uint8Array,
	options?: Partial<VerifySigningOptions>,
) {
	return verifySignFromString(
		publicKeyPEM,
		utils.uint8ArrayToString(data),
		utils.uint8ArrayToString(signature),
		options,
	)
}

const verifySign = {
	fromString: verifySignFromString,
	fromUint8Array: verifySignFromUint8Array,
}

export const RSA = {
	DEFAULT_KEY_PAIR_BITS,
	DEFAULT_ENCRYPTION_SCHEME,
	DEFAULT_ENCODING,
	generateKeyPair,
	generateKeyPairPEM,
	encrypt,
	decrypt,
	sign,
	verifySign,
}
