import { utils } from '@/utils'
import forge, { Base64, Hex, Utf8 } from 'node-forge'

// Default configurations for encryption
const DEFAULT_IV_SIZE = 16
const DEFAULT_TAG_SIZE = 16
const DEFAULT_ENCRYPTION_ALGORITHM: forge.cipher.Algorithm = 'AES-GCM'

// Encoding Types
type Utf8Encoding = 'utf8'
type Base64Encoding = 'base64'
type HexEncoding = 'hex'

// Consolidated Encoding Type Aliases
type InputEncoding = Utf8Encoding | Base64Encoding | HexEncoding
type OutputEncoding = Base64Encoding | HexEncoding
type DecryptionInputEncoding = OutputEncoding
type DecryptionOutputEncoding = Utf8Encoding | Base64Encoding | HexEncoding

// Encryption Key Type
type EncryptionKey = Utf8

// Separate options for Encryption and Decryption
type EncryptionOptions = {
	inputEncoding?: InputEncoding
	outputEncoding?: OutputEncoding
}

type DecryptionOptions = {
	inputEncoding?: DecryptionInputEncoding
	outputEncoding?: DecryptionOutputEncoding
}

// Initialize AES cipher for encryption
function initializeCipher(key: Utf8, algorithm = DEFAULT_ENCRYPTION_ALGORITHM) {
	return forge.cipher.createCipher(algorithm, key)
}

// Initialize AES decipher for decryption
function initializeDecipher(
	key: Utf8,
	algorithm = DEFAULT_ENCRYPTION_ALGORITHM,
) {
	return forge.cipher.createDecipher(algorithm, key)
}

// Encode encrypted data output
function encodeData(
	iv: string,
	authTag: string,
	data: string,
	format: OutputEncoding,
) {
	const combined = iv + authTag + data
	switch (format) {
		case 'hex':
			return forge.util.bytesToHex(combined)
		case 'base64':
			return forge.util.encode64(combined)
		default:
			throw new Error(`Unsupported output format: ${format}`)
	}
}

// Decode encrypted data for decryption
function decodeData(
	encodedData: string,
	format: Exclude<InputEncoding, Utf8Encoding>,
) {
	let decodedBytes: string
	switch (format) {
		case 'hex':
			decodedBytes = forge.util.hexToBytes(encodedData)
			break
		case 'base64':
			decodedBytes = forge.util.decode64(encodedData)
			break
		default:
			throw new Error(`Unsupported input format: ${format}`)
	}

	return {
		iv: decodedBytes.slice(0, DEFAULT_IV_SIZE),
		authTag: decodedBytes.slice(
			DEFAULT_IV_SIZE,
			DEFAULT_IV_SIZE + DEFAULT_TAG_SIZE,
		),
		cipherText: decodedBytes.slice(DEFAULT_IV_SIZE + DEFAULT_TAG_SIZE),
	}
}

// Update cipher with data during encryption based on encoding type
function updateCipher(
	data: string,
	encoding: InputEncoding,
	cipher: forge.cipher.BlockCipher,
) {
	const buffer = (() => {
		switch (encoding) {
			case 'utf8':
				return forge.util.createBuffer(data, 'raw')
			case 'hex':
				return forge.util.createBuffer(forge.util.hexToBytes(data))
			case 'base64':
				return forge.util.createBuffer(forge.util.decode64(data))
			default:
				throw new Error(`Unsupported encoding: ${encoding}`)
		}
	})()
	cipher.update(buffer)
}

// Encrypt function
function encrypt<OE extends OutputEncoding = OutputEncoding>(
	data: string,
	key: EncryptionKey,
	options: EncryptionOptions = {},
): string {
	const { inputEncoding = 'utf8', outputEncoding = 'base64' as OE } = options
	const cipher = initializeCipher(key)

	const iv = forge.random.getBytesSync(DEFAULT_IV_SIZE)
	cipher.start({ iv, tagLength: DEFAULT_TAG_SIZE * 8 })

	updateCipher(data, inputEncoding, cipher)

	if (!cipher.finish()) throw new Error('Encryption failed')

	return encodeData(
		iv,
		cipher.mode.tag.getBytes(),
		cipher.output.getBytes(),
		outputEncoding,
	)
}

// Update decipher with data during decryption
function updateDecipher(data: forge.Bytes, decipher: forge.cipher.BlockCipher) {
	const buffer = forge.util.createBuffer(data)
	decipher.update(buffer)
}

// Decrypt function
function decrypt<
	OE extends DecryptionOutputEncoding = DecryptionOutputEncoding,
>(
	data: Base64 | Hex,
	key: EncryptionKey,
	options: DecryptionOptions = {},
): string {
	const { inputEncoding = 'base64', outputEncoding = 'utf8' as OE } = options
	const { iv, authTag, cipherText } = decodeData(data, inputEncoding)

	const decipher = initializeDecipher(key)
	decipher.start({
		iv,
		tagLength: DEFAULT_TAG_SIZE * 8,
		tag: forge.util.createBuffer(authTag),
	})

	updateDecipher(cipherText, decipher)

	if (!decipher.finish()) throw new Error('Decryption failed')

	const decryptedData = decipher.output.getBytes()

	switch (outputEncoding) {
		case 'utf8':
			return forge.util.decodeUtf8(decryptedData)
		case 'hex':
			return forge.util.bytesToHex(decryptedData)
		case 'base64':
			return forge.util.encode64(decryptedData)
		default:
			throw new Error(`Unsupported output encoding: ${outputEncoding}`)
	}
}

// AES library export object
export const AES = {
	encrypt,
	decrypt,
	DEFAULT_IV_SIZE,
	DEFAULT_TAG_SIZE,
	DEFAULT_ENCRYPTION_ALGORITHM,
}
