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
		expect(encrypted).toBeTypeOf('object')
		expect(encrypted.data).toBeDefined()
		expect(encrypted.iv).toBeDefined()
		expect(encrypted.tag).toBeDefined()
		expect(encrypted.data.length).toBeGreaterThanOrEqual(data.length)
	})

	it('should return encrypted data with default ivBytes', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(data, key)

		expect(encrypted).toBeDefined()
		expect(encrypted.data.length).toBeGreaterThanOrEqual(data.length)
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
		expect(encrypted.data.length).toBeGreaterThanOrEqual(data.length)
	})

	it('should handle large data', () => {
		const data = new Array(1024 * 1024).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(data, key)

		expect(encrypted).toBeDefined()
		expect(encrypted.data.length).toBeGreaterThanOrEqual(data.length)
	})
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
		expect(encrypted.iv).toBeInstanceOf(Uint8Array)
		expect(encrypted.tag).toBeInstanceOf(Uint8Array)
		expect(encrypted.data).toBeInstanceOf(Uint8Array)
		expect(encrypted.data.length).toBeGreaterThanOrEqual(data.length)
	})
})

describe('AES.encrypt.fromString.toHex', () => {
	it('should return encrypted data', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromString.toHex(data, key)

		expect(encrypted).toBeDefined()
		expect(encrypted.iv).toBeTypeOf('string')
		expect(encrypted.tag).toBeTypeOf('string')
		expect(encrypted.data).toBeTypeOf('string')
		expect(encrypted.data.length).toBeGreaterThanOrEqual(data.length * 2)
	})
})
