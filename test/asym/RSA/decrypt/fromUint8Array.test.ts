import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

const data = NexusCrypto.utils.stringToUint8Array('hello world')

describe('RSA.decrypt.fromUint8Array.toString', () => {
	it('should decrypt a Uint8Array to a string', () => {
		const { privateKey, publicKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const encrypted = NexusCrypto.RSA.encrypt.fromUint8Array.toUint8Array(
			publicKey,
			data,
		)

		const decrypted = NexusCrypto.RSA.decrypt.fromUint8Array.toString(
			privateKey,
			encrypted,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeTypeOf('string')
		expect(decrypted).toBe(NexusCrypto.utils.uint8ArrayToString(data))
	})
})

describe('RSA.decrypt.fromUint8Array.toUint8Array', () => {
	it('should decrypt a Uint8Array to a Uint8Array', () => {
		const { privateKey, publicKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const encrypted = NexusCrypto.RSA.encrypt.fromUint8Array.toUint8Array(
			publicKey,
			data,
		)

		const decrypted = NexusCrypto.RSA.decrypt.fromUint8Array.toUint8Array(
			privateKey,
			encrypted,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeInstanceOf(Uint8Array)
		expect(decrypted).toStrictEqual(data)
	})
})

describe('RSA.decrypt.fromUint8Array.toHex', () => {
	it('should decrypt a Uint8Array to a hex string', () => {
		const { privateKey, publicKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const encrypted = NexusCrypto.RSA.encrypt.fromUint8Array.toUint8Array(
			publicKey,
			data,
		)

		const decrypted = NexusCrypto.RSA.decrypt.fromUint8Array.toHex(
			privateKey,
			encrypted,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeTypeOf('string')
		expect(decrypted).toBe(NexusCrypto.utils.uint8ArrayToHex(data))
	})
})
