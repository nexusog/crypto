import { createBuffer, NexusBuffer } from '@/core/buffer'
import { SHA256 } from '@/hashing/sha256'
import forge from 'node-forge'

const DEFAULT_KEY_PAIR_BITS: number = 2048
const DEFAULT_ENCRYPTION_SCHEME: forge.pki.rsa.EncryptionScheme = 'RSA-OAEP'
const DEFAULT_SIGNATURE_SCHEME: forge.pki.rsa.SignatureScheme =
	'RSASSA-PKCS1-V1_5'

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

function encrypt(data: NexusBuffer, publicKeyPem: string) {
	const rsaPublicKey = forge.pki.publicKeyFromPem(publicKeyPem)

	return createBuffer(
		rsaPublicKey.encrypt(data.asBinary(), DEFAULT_ENCRYPTION_SCHEME),
		'binary',
	)
}

function decrypt(data: NexusBuffer, privateKeyPem: string) {
	const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKeyPem)

	return createBuffer(
		rsaPrivateKey.decrypt(data.asBinary(), DEFAULT_ENCRYPTION_SCHEME),
		'binary',
	)
}

function sign(data: NexusBuffer, privateKeyPem: string) {
	const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKeyPem)

	const md = SHA256.hashRaw(data)

	const signature = rsaPrivateKey.sign(md, DEFAULT_SIGNATURE_SCHEME)

	return createBuffer(signature, 'binary')
}

function verify(
	signature: NexusBuffer,
	data: NexusBuffer,
	publicKeyPem: string,
) {
	const rsaPublicKey = forge.pki.publicKeyFromPem(publicKeyPem)

	return rsaPublicKey.verify(
		SHA256.hash(data).asBinary(),
		signature.asBinary(),
	)
}

export const RSA = {
	DEFAULT_KEY_PAIR_BITS,
	DEFAULT_ENCRYPTION_SCHEME,
	DEFAULT_SIGNATURE_SCHEME,
	generateKeyPair,
	generateKeyPairPEM,
	encrypt,
	decrypt,
	sign,
	verify,
}
