import { Base64Encoding, HexEncoding, Utf8Encoding } from '@/types'
import forge, { Base64, Hex, Utf8 } from 'node-forge'

function createInstance() {
	return forge.md.sha256.create()
}

type InputEncoding = Utf8Encoding | Base64Encoding | HexEncoding
type OutputEncoding = Base64Encoding | HexEncoding

type HashInput = Base64 | Hex | Utf8
type HashOutput = Base64 | Hex

type HashOptions<
	R extends boolean = false,
	IE extends InputEncoding = Utf8Encoding,
	OE extends OutputEncoding = HexEncoding,
> = R extends true
	? { raw: true; inputEncoding?: IE }
	: { raw?: false; inputEncoding?: IE; outputEncoding?: OE }

function hash<R extends true, IE extends InputEncoding>(
	data: HashInput,
	options: HashOptions<R, IE>,
): forge.md.MessageDigest

function hash<
	R extends false | undefined,
	IE extends InputEncoding,
	OE extends OutputEncoding,
>(
	data: HashInput,
	options?: HashOptions<R extends undefined ? false : R, IE, OE>,
): HashOutput

// Implementation
function hash<
	R extends boolean = false,
	IE extends InputEncoding = Utf8Encoding,
	OE extends OutputEncoding = HexEncoding,
>(
	data: HashInput,
	options?: HashOptions<R, IE, OE>,
): forge.md.MessageDigest | HashOutput {
	const { inputEncoding = 'utf8' } = options || {}
	const raw = options?.raw === true
	const outputEncoding = raw ? undefined : options?.outputEncoding || 'hex'

	const md = createInstance()

	if (typeof data !== 'string') {
		throw new Error('Invalid input: data should be a string')
	}

	switch (inputEncoding) {
		case 'utf8':
			md.update(forge.util.decodeUtf8(data), 'raw')
			break
		case 'hex':
			md.update(forge.util.hexToBytes(data))
			break
		case 'base64':
			md.update(forge.util.decode64(data))
			break
		default:
			throw new Error(`Unsupported input encoding: ${inputEncoding}`)
	}

	// if raw is true, return the MessageDigest instance
	if (raw) {
		return md
	}

	const output = md.digest().getBytes()

	switch (outputEncoding) {
		case 'hex':
			return forge.util.bytesToHex(output) as any
		case 'base64':
			return forge.util.encode64(output) as any
		default:
			throw new Error(`Unsupported output encoding: ${outputEncoding}`)
	}
}

export const SHA256 = {
	createInstance,
	hash,
}
