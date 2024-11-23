import { Buffer } from 'buffer'

const SUPPORTED_ENCODINGS = [
	'ascii',
	'utf8',
	'utf-8',
	'utf16le',
	'utf-16le',
	'ucs2',
	'ucs-2',
	'base64',
	'base64url',
	'latin1',
	'binary',
	'hex',
] as const

type Encoding = (typeof SUPPORTED_ENCODINGS)[number]

export class NexusBuffer {
	private readonly buff: Buffer

	constructor(data: string, inputEncoding: Encoding = 'ascii') {
		if (!SUPPORTED_ENCODINGS.includes(inputEncoding)) {
			throw new Error(`Unsupported input encoding: ${inputEncoding}`)
		}
		this.buff = Buffer.from(data, inputEncoding)
	}

	asHex(): string {
		return this.buff.toString('hex')
	}

	asBase64(): string {
		return this.buff.toString('base64')
	}

	asUtf8(): string {
		return this.buff.toString('utf8')
	}

	asBinary(): string {
		return this.buff.toString('binary')
	}

	get toString() {
		return this.buff.toString
	}
}

export function createBuffer(
	data: string,
	inputEncoding: Encoding = 'ascii',
): NexusBuffer {
	return new NexusBuffer(data, inputEncoding)
}
