import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('AES.encrypt.fromUint8Array', () => {
	it('should return encrypted data', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromUint8Array.toString(
			NexusCrypto.utils.stringToUint8Array(data),
			key,
		)

		expect(encrypted).toBeDefined()
		expect(encrypted.length).toBeGreaterThanOrEqual(
			NexusCrypto.AES.DEFAULT_IV_BYTES + data.length,
		)
	})
})

describe('AES.encrypt.fromUint8Array.toUint8Array', () => {
	it('should return encrypted data', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromUint8Array.toUint8Array(
			NexusCrypto.utils.stringToUint8Array(data),
			key,
		)

		expect(encrypted).toBeDefined()
		expect(encrypted).toBeInstanceOf(Uint8Array)
		expect(encrypted.length).toBeGreaterThanOrEqual(
			NexusCrypto.AES.DEFAULT_IV_BYTES + data.length,
		)
	})
})

describe('AES.encrypt.fromUint8Array.toHex', () => {
	it('should return encrypted data', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const encrypted = NexusCrypto.AES.encrypt.fromUint8Array.toHex(
			NexusCrypto.utils.stringToUint8Array(data),
			key,
		)

		expect(encrypted).toBeDefined()
		expect(encrypted).toBeTypeOf('string')
		expect(encrypted.length).toBeGreaterThanOrEqual(
			(NexusCrypto.AES.DEFAULT_IV_BYTES + data.length) * 2,
		)
	})
})
