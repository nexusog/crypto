import forge, { Base64, Hex, Utf8 } from 'node-forge'

function createInstance() {
	return forge.md.sha256.create()
}

type InputEncoding = 'utf8' | 'base64' | 'hex'
type OutputEncoding = 'base64' | 'hex'

type HashInput = Base64 | Hex | Utf8
type HashOutput = Base64 | Hex

interface HashOptions<
	IE extends InputEncoding = InputEncoding,
	OE extends OutputEncoding = OutputEncoding,
> {
	inputEncoding: IE
	outputEncoding: OE
}

// Overloads for the `hash` function to provide type-safe return values based on output encoding
function hash(data: HashInput): string
function hash(
	data: string,
	options: Partial<HashOptions<InputEncoding, 'base64'>>,
): Base64
function hash(data: HashInput, options: HashOptions<InputEncoding, 'hex'>): Hex

function hash(data: HashInput, options?: Partial<HashOptions>): HashOutput

function hash(data: HashInput, options: Partial<HashOptions> = {}): HashOutput {
	const { inputEncoding = 'utf8', outputEncoding = 'hex' } = options

	const md = createInstance()

	if (typeof data !== 'string') {
		throw new Error('Invalid input: data should be a string')
	}

	// Update the hash instance with data based on input encoding
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

	// Generate the hash and convert it to the desired output encoding
	const output = md.digest().getBytes()

	switch (outputEncoding) {
		case 'hex':
			return forge.util.bytesToHex(output)
		case 'base64':
			return forge.util.encode64(output)
		default:
			throw new Error(`Unsupported output encoding: ${outputEncoding}`)
	}
}

export const SHA256 = {
	createInstance,
	hash,
}
