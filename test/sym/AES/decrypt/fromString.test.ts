import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'
import { utils } from '@/utils'

const data = 'Hello'

describe('AES.decrypt.fromString.toString', () => {
	it('should correctly decrypted the encrypted data', () => {
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(data, key)
		const decrypted = NexusCrypto.AES.decrypt.fromString.toString(
			encrypted.data,
			key,
			encrypted.iv,
			encrypted.tag,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeTypeOf('string')
		expect(decrypted).toBe(data)
	})

	it('should throw an error if the encrypted data is corrupted', () => {
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(data, key)
		const corrupted = encrypted.data.slice(0, -1)

		expect(() =>
			NexusCrypto.AES.decrypt.fromString.toString(
				corrupted,
				key,
				encrypted.iv,
				encrypted.tag,
			),
		).toThrowError(/corrupted/)
	})

	it('should throw an error if the key is invalid', () => {
		const key = NexusCrypto.utils.getRandomString(32)
		const key2 = key.split('').reverse().join('')

		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(data, key)

		expect(() =>
			NexusCrypto.AES.decrypt.fromString.toString(
				encrypted.data,
				key2,
				encrypted.iv,
				encrypted.tag,
			),
		).toThrowError(/corrupted/)
	})
})

describe('AES.decrypt.fromString.toUint8Array', () => {
	it('should return decrypted data', () => {
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(data, key)
		const decrypted = NexusCrypto.AES.decrypt.fromString.toUint8Array(
			encrypted.data,
			key,
			encrypted.iv,
			encrypted.tag,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeInstanceOf(Uint8Array)
		expect(decrypted).toStrictEqual(
			NexusCrypto.utils.stringToUint8Array(data),
		)
	})
})

describe('AES.decrypt.fromString.toHex', () => {
	it('should return decrypted data', () => {
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(data, key)
		const decrypted = NexusCrypto.AES.decrypt.fromString.toHex(
			encrypted.data,
			key,
			encrypted.iv,
			encrypted.tag,
		)

		expect(decrypted).toBeDefined()
		expect(decrypted).toBeTypeOf('string')
		expect(decrypted).toStrictEqual(NexusCrypto.utils.stringToHex(data))
	})
})
