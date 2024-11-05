import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

const data = NexusCrypto.utils.stringToUint8Array('hello world')

describe('RSA.sign.fromUint8Array.toString', () => {
	it('should sign a Uint8Array to a string', () => {
		const { privateKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const signature = NexusCrypto.RSA.sign.fromUint8Array.toString(
			privateKey,
			data,
		)

		expect(signature).toBeDefined()
		expect(signature.length).toBe(256)
		expect(signature).toBeTypeOf('string')
	})
})

describe('RSA.sign.fromUint8Array.toUint8Array', () => {
	it('should sign a Uint8Array to a Uint8Array', () => {
		const { privateKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const signature = NexusCrypto.RSA.sign.fromUint8Array.toUint8Array(
			privateKey,
			data,
		)

		expect(signature).toBeDefined()
		expect(signature).toBeInstanceOf(Uint8Array)
	})
})

describe('RSA.sign.fromUint8Array.toHex', () => {
	it('should sign a Uint8Array to a hex string', () => {
		const { privateKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const signature = NexusCrypto.RSA.sign.fromUint8Array.toHex(
			privateKey,
			data,
		)

		expect(signature).toBeDefined()
		expect(signature).toBeTypeOf('string')
	})
})
