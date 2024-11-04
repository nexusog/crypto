import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('AES.encrypt.fromUint8Array', () => {
	it('should return encrypted data', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomUint8Array(32)
		const encrypted = NexusCrypto.AES.encrypt.fromUint8Array.toString(
			NexusCrypto.utils.stringToUint8Array(data),
			key,
		)

		expect(encrypted).toBeDefined()
		expect(encrypted.data.length).toBeGreaterThanOrEqual(data.length)
	})
})

describe('AES.encrypt.fromUint8Array.toUint8Array', () => {
	it('should return encrypted data', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomUint8Array(32)
		const encrypted = NexusCrypto.AES.encrypt.fromUint8Array.toUint8Array(
			NexusCrypto.utils.stringToUint8Array(data),
			key,
		)

		expect(encrypted).toBeDefined()
		expect(encrypted.data).toBeInstanceOf(Uint8Array)
		expect(encrypted.data.length).toBeGreaterThanOrEqual(data.length)
	})
})

describe('AES.encrypt.fromUint8Array.toHex', () => {
	it('should return encrypted data', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomUint8Array(32)
		const encrypted = NexusCrypto.AES.encrypt.fromUint8Array.toHex(
			NexusCrypto.utils.stringToUint8Array(data),
			key,
		)

		expect(encrypted).toBeDefined()
		expect(encrypted.data).toBeTypeOf('string')
		expect(encrypted.data.length).toBeGreaterThanOrEqual(data.length * 2)
	})
})
