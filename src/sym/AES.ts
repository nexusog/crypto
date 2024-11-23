import { createBuffer, NexusBuffer } from '@/core/buffer'
import { Base64Encoding, HexEncoding, Utf8Encoding } from '@/types'
import forge, { Base64, Hex, Utf8 } from 'node-forge'

const DEFAULT_IV_SIZE = 16
const DEFAULT_TAG_SIZE = 16
const DEFAULT_ENCRYPTION_ALGORITHM: forge.cipher.Algorithm = 'AES-GCM'

// Encrypt function
function encrypt(data: NexusBuffer, key: NexusBuffer): NexusBuffer {
	const cipher = forge.cipher.createCipher(
		DEFAULT_ENCRYPTION_ALGORITHM,
		key.asBinary(),
	)

	const iv = forge.random.getBytesSync(DEFAULT_IV_SIZE)
	cipher.start({ iv, tagLength: DEFAULT_TAG_SIZE * 8 /* TAG_SIZE_IN_BITS */ })

	cipher.update(forge.util.createBuffer(data.asBinary()))

	if (!cipher.finish()) throw new Error('Encryption failed')

	const authTag = cipher.mode.tag.getBytes()

	return createBuffer(iv + authTag + cipher.output.getBytes(), 'binary')
}

function decrypt(data: NexusBuffer, key: NexusBuffer): NexusBuffer {
	const decipher = forge.cipher.createDecipher(
		DEFAULT_ENCRYPTION_ALGORITHM,
		key.asBinary(),
	)

	const dataBinary = data.asBinary()

	decipher.start({
		iv: dataBinary.slice(0, DEFAULT_IV_SIZE),
		tagLength: DEFAULT_TAG_SIZE * 8 /* TAG_SIZE_IN_BITS */,
		tag: forge.util.createBuffer(
			dataBinary.slice(
				DEFAULT_IV_SIZE,
				DEFAULT_IV_SIZE + DEFAULT_TAG_SIZE,
			),
		),
	})

	decipher.update(
		forge.util.createBuffer(
			dataBinary.slice(DEFAULT_IV_SIZE + DEFAULT_TAG_SIZE),
		),
	)

	if (!decipher.finish()) throw new Error('Decryption failed')

	return createBuffer(decipher.output.getBytes(), 'binary')
}

export const AES = {
	encrypt,
	decrypt,
	DEFAULT_IV_SIZE,
	DEFAULT_TAG_SIZE,
	DEFAULT_ENCRYPTION_ALGORITHM,
}
