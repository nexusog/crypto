import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('AES.createCipher', () => {
	it('should return a cipher', () => {
		const key = NexusCrypto.utils.getRandomString(32)
		const cipher = NexusCrypto.AES.createCipher(key, 'AES-CBC')

		expect(cipher).toBeDefined()
		expect(cipher.start).toBeInstanceOf(Function)
		expect(cipher.update).toBeInstanceOf(Function)
		expect(cipher.finish).toBeInstanceOf(Function)
	})

	it('should throw error when key is not appropriate length', () => {
		const key = NexusCrypto.utils.getRandomString(31)

		expect(() => NexusCrypto.AES.createCipher(key, 'AES-CBC')).toThrowError(
			/length/,
		)
	})
})

describe('AES.createDecipher', () => {
	it('should return a decipher', () => {
		const key = NexusCrypto.utils.getRandomString(32)
		const decipher = NexusCrypto.AES.createDecipher(key, 'AES-CBC')

		expect(decipher).toBeDefined()
		expect(decipher.start).toBeInstanceOf(Function)
		expect(decipher.update).toBeInstanceOf(Function)
		expect(decipher.finish).toBeInstanceOf(Function)
	})

	it('should throw error when key is not appropriate length', () => {
		const key = NexusCrypto.utils.getRandomString(31)

		expect(() =>
			NexusCrypto.AES.createDecipher(key, 'AES-CBC'),
		).toThrowError(/length/)
	})
})
