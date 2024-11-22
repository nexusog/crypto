import { SHA256 } from '@/hashing/sha256'
import { Base64Encoding, HexEncoding, Utf8Encoding } from '@/types'
import forge from 'node-forge'

const DEFAULT_KEY_PAIR_BITS: number = 2048
const DEFAULT_ENCRYPTION_SCHEME: forge.pki.rsa.EncryptionScheme = 'RSA-OAEP'
const DEFAULT_SIGNATURE_SCHEME: forge.pki.rsa.SignatureScheme =
	'RSASSA-PKCS1-V1_5'
const DEFAULT_ENCODING: forge.Encoding = 'raw'

type EncryptionInputEncoding = Utf8Encoding | Base64Encoding | HexEncoding
type EncryptionOutputEncoding = Base64Encoding | HexEncoding

type EncryptionOptions = {
	inputEncoding?: EncryptionInputEncoding
	outputEncoding?: EncryptionOutputEncoding
}

type DecryptionInputEncoding = EncryptionOutputEncoding
type DecryptionOutputEncoding = EncryptionInputEncoding

type DecryptionOptions = {
	inputEncoding?: DecryptionInputEncoding
	outputEncoding?: DecryptionOutputEncoding
}

type SigningInputEncoding = Utf8Encoding | Base64Encoding | HexEncoding
type SigningOutputEncoding = Base64Encoding | HexEncoding

type SigningOptions = {
	inputEncoding?: SigningInputEncoding
	outputEncoding?: SigningOutputEncoding
}

type VerifyingSignatureEncoding = Base64Encoding | HexEncoding
type VerifyingDataEncoding = Utf8Encoding | Base64Encoding | HexEncoding

type VerifyingOptions = {
	signatureEncoding?: VerifyingSignatureEncoding
	dataEncoding?: VerifyingDataEncoding
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

function encrypt(
	data: string,
	publicKeyPem: string,
	options: EncryptionOptions = {},
): string {
	const { inputEncoding = 'utf8', outputEncoding = 'base64' } = options

	const rsaPublicKey = forge.pki.publicKeyFromPem(publicKeyPem)

	let output: string

	switch (inputEncoding) {
		case 'utf8':
			output = rsaPublicKey.encrypt(data, DEFAULT_ENCRYPTION_SCHEME)
			break
		case 'base64':
			output = rsaPublicKey.encrypt(
				forge.util.decode64(data),
				DEFAULT_ENCRYPTION_SCHEME,
			)
			break
		case 'hex':
			output = rsaPublicKey.encrypt(
				forge.util.hexToBytes(data),
				DEFAULT_ENCRYPTION_SCHEME,
			)
			break
		default:
			throw new Error(`Unsupported input encoding: ${inputEncoding}`)
	}

	switch (outputEncoding) {
		case 'base64':
			return forge.util.encode64(output)
		case 'hex':
			return forge.util.bytesToHex(output)
		default:
			throw new Error(`Unsupported output encoding: ${outputEncoding}`)
	}
}

function decrypt(
	data: string,
	privateKeyPem: string,
	options: DecryptionOptions,
) {
	const { inputEncoding = 'base64', outputEncoding = 'utf8' } = options

	const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKeyPem)

	let output: string

	switch (inputEncoding) {
		case 'base64':
			output = rsaPrivateKey.decrypt(
				forge.util.decode64(data),
				DEFAULT_ENCRYPTION_SCHEME,
			)
			break
		case 'hex':
			output = rsaPrivateKey.decrypt(
				forge.util.hexToBytes(data),
				DEFAULT_ENCRYPTION_SCHEME,
			)
			break
		default:
			throw new Error(`Unsupported input encoding: ${inputEncoding}`)
	}

	switch (outputEncoding) {
		case 'base64':
			return forge.util.encode64(output)
		case 'hex':
			return forge.util.bytesToHex(output)
		case 'utf8':
			return forge.util.decodeUtf8(output)
		default:
			throw new Error(`Unsupported output encoding: ${outputEncoding}`)
	}
}

function sign(
	data: string,
	privateKeyPem: string,
	options: SigningOptions = {},
) {
	const { inputEncoding = 'utf8', outputEncoding = 'base64' } = options

	const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKeyPem)

	const md = SHA256.hash(data, {
		inputEncoding,
		raw: true,
	})

	const signature = rsaPrivateKey.sign(md, DEFAULT_SIGNATURE_SCHEME)

	switch (outputEncoding) {
		case 'base64':
			return forge.util.encode64(signature)
		case 'hex':
			return forge.util.bytesToHex(signature)
		default:
			throw new Error(`Unsupported output encoding: ${outputEncoding}`)
	}
}

function verify(
	signature: string,
	data: string,
	publicKeyPem: string,
	options: VerifyingOptions = {},
) {
	const { signatureEncoding = 'base64', dataEncoding = 'utf8' } = options

	const rsaPublicKey = forge.pki.publicKeyFromPem(publicKeyPem)

	let normalizedSignature: string

	switch (signatureEncoding) {
		case 'base64':
			normalizedSignature = forge.util.decode64(signature)
			break
		case 'hex':
			normalizedSignature = forge.util.hexToBytes(signature)
			break
		default:
			throw new Error(
				`Unsupported signature encoding: ${signatureEncoding}`,
			)
	}

	return rsaPublicKey.verify(
		SHA256.hash(data, {
			inputEncoding: dataEncoding,
			raw: true,
		})
			.digest()
			.bytes(),
		normalizedSignature,
	)
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
	verify,
}
