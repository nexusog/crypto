import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

const data = 'hello world'

describe('RSA.decrypt.fromString.toString', () => {
	it('should decrypt a string to a string', () => {
		const { privateKey, publicKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const encrypted = NexusCrypto.RSA.encrypt.fromString.toString(
			publicKey,
			data,
		)

		const decrypted = NexusCrypto.RSA.decrypt.fromString.toString(
			privateKey,
			encrypted,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeTypeOf('string')
		expect(decrypted).toBe(data)
	})
})

describe('RSA.decrypt.fromString.toUint8Array', () => {
	it('should decrypt a string to a Uint8Array', () => {
		const { privateKey, publicKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const encrypted = NexusCrypto.RSA.encrypt.fromString.toString(
			publicKey,
			data,
		)

		const decrypted = NexusCrypto.RSA.decrypt.fromString.toUint8Array(
			privateKey,
			encrypted,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeInstanceOf(Uint8Array)
		expect(decrypted).toStrictEqual(
			NexusCrypto.utils.stringToUint8Array(data),
		)
	})
})

describe('RSA.decrypt.fromString.toHex', () => {
	it('should decrypt a string to a hex string', () => {
		const { privateKey, publicKey } = NexusCrypto.RSA.generateKeyPairPEM()
		const encrypted = NexusCrypto.RSA.encrypt.fromString.toString(
			publicKey,
			data,
		)

		const decrypted = NexusCrypto.RSA.decrypt.fromString.toHex(
			privateKey,
			encrypted,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeTypeOf('string')
		expect(decrypted).toBe(NexusCrypto.utils.stringToHex(data))
	})
})
