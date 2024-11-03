import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('AES.encrypt.fromString.toString', () => {
	it('should return encrypted data with custom iv bytes', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const ivBytes = 32
		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(
			data,
			key,
			{
				ivBytes,
			},
		)

		expect(encrypted).toBeDefined()
		expect(encrypted).toBeTypeOf('string')
		expect(encrypted.length).toBeGreaterThanOrEqual(ivBytes + data.length)
	})

	it('should return encrypted data with default ivBytes', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(data, key)

		expect(encrypted).toBeDefined()
		expect(encrypted.length).toBeGreaterThanOrEqual(
			NexusCrypto.AES.DEFAULT_IV_BYTES + data.length,
		)
	})

	it('should return encrypted data with custom algorithm', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const ivBytes = 16
		const algorithm = 'AES-GCM'
		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(
			data,
			key,
			{
				ivBytes,
				algorithm,
			},
		)

		expect(encrypted).toBeDefined()
		expect(encrypted.length).toBeGreaterThanOrEqual(ivBytes + data.length)
	})

	it('should handle large data', () => {
		const data = new Array(1024 * 1024).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(data, key)

		expect(encrypted).toBeDefined()
		expect(encrypted.length).toBeGreaterThanOrEqual(
			NexusCrypto.AES.DEFAULT_IV_BYTES + data.length,
		)
	})

	it('should ')
})

describe('AES.encrypt.fromString.toUint8Array', () => {
	it('should return encrypted data', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromString.toUint8Array(
			data,
			key,
		)

		expect(encrypted).toBeDefined()
		expect(encrypted).toBeInstanceOf(Uint8Array)
		expect(encrypted.length).toBeGreaterThanOrEqual(
			NexusCrypto.AES.DEFAULT_IV_BYTES + data.length,
		)
	})
})

describe('AES.encrypt.fromString.toHex', () => {
	it('should return encrypted data', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromString.toHex(data, key)

		expect(encrypted).toBeDefined()
		expect(encrypted).toBeTypeOf('string')
		expect(encrypted.length).toBeGreaterThanOrEqual(
			(NexusCrypto.AES.DEFAULT_IV_BYTES + data.length) * 2,
		)
	})
})
