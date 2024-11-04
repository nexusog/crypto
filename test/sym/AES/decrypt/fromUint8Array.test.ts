import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

const data = NexusCrypto.utils.stringToUint8Array('Hello')

describe('AES.decrypt.fromUint8Array.toString', () => {
	it('should correctly decrypted the encrypted data', () => {
		const key = NexusCrypto.utils.getRandomUint8Array(32)
		const encrypted = NexusCrypto.AES.encrypt.fromUint8Array.toUint8Array(
			data,
			key,
		)
		const decrypted = NexusCrypto.AES.decrypt.fromUint8Array.toString(
			encrypted.data,
			key,
			encrypted.iv,
			encrypted.tag,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeTypeOf('string')
		expect(decrypted).toBe(NexusCrypto.utils.uint8ArrayToString(data))
	})

	it('should throw an error if the encrypted data is corrupted', () => {
		const key = NexusCrypto.utils.getRandomUint8Array(32)
		const encrypted = NexusCrypto.AES.encrypt.fromUint8Array.toUint8Array(
			data,
			key,
		)
		const corrupted = encrypted.data.slice(0, -1)

		expect(() =>
			NexusCrypto.AES.decrypt.fromUint8Array.toString(
				corrupted,
				key,
				encrypted.iv,
				encrypted.tag,
			),
		).toThrowError(/corrupted/)
	})

	it('should throw an error if the key is invalid', () => {
		const key = NexusCrypto.utils.getRandomUint8Array(32)
		const key2 = new Uint8Array([...key]).reverse()

		const encrypted = NexusCrypto.AES.encrypt.fromUint8Array.toUint8Array(
			data,
			key,
		)

		expect(() =>
			NexusCrypto.AES.decrypt.fromUint8Array.toString(
				encrypted.data,
				key2,
				encrypted.iv,
				encrypted.tag,
			),
		).toThrowError(/corrupted/)
	})
})

describe('AES.decrypt.fromUint8Array.toUint8Array', () => {
	it('should correctly decrypted the encrypted data', () => {
		const key = NexusCrypto.utils.getRandomUint8Array(32)
		const encrypted = NexusCrypto.AES.encrypt.fromUint8Array.toUint8Array(
			data,
			key,
		)
		const decrypted = NexusCrypto.AES.decrypt.fromUint8Array.toUint8Array(
			encrypted.data,
			key,
			encrypted.iv,
			encrypted.tag,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeTypeOf('object')
		expect(decrypted).toBeInstanceOf(Uint8Array)
		expect(decrypted).toStrictEqual(data)
	})
})

describe('AES.decrypt.fromUint8Array.toHex', () => {
	it('should correctly decrypted the encrypted data', () => {
		const key = NexusCrypto.utils.getRandomUint8Array(32)
		const encrypted = NexusCrypto.AES.encrypt.fromUint8Array.toUint8Array(
			data,
			key,
		)
		const decrypted = NexusCrypto.AES.decrypt.fromUint8Array.toHex(
			encrypted.data,
			key,
			encrypted.iv,
			encrypted.tag,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeTypeOf('string')
		expect(decrypted).toStrictEqual(NexusCrypto.utils.uint8ArrayToHex(data))
	})
})
