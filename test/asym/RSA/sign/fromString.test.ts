import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('RSA.sign.fromString.toString', () => {
	it('should sign a string to a string', () => {
		const { privateKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const data = 'hello world'
		const signature = NexusCrypto.RSA.sign.fromString.toString(
			privateKey,
			data,
		)

		expect(signature).toBeDefined()
		expect(signature.length).toBe(256)
		expect(signature).toBeTypeOf('string')
	})
})

describe('RSA.sign.fromString.toUint8Array', () => {
	it('should sign a string to a Uint8Array', () => {
		const { privateKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const data = 'hello world'
		const signature = NexusCrypto.RSA.sign.fromString.toUint8Array(
			privateKey,
			data,
		)

		expect(signature).toBeDefined()
		expect(signature).toBeInstanceOf(Uint8Array)
	})
})

describe('RSA.sign.fromString.toHex', () => {
	it('should sign a string to a hex string', () => {
		const { privateKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const data = 'hello world'
		const signature = NexusCrypto.RSA.sign.fromString.toHex(
			privateKey,
			data,
		)

		expect(signature).toBeDefined()
		expect(signature).toBeTypeOf('string')
	})
})
