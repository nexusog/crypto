import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('AES.generateIv', () => {
	it('should return a random iv', () => {
		const iv = NexusCrypto.AES.generateIv()

		expect(iv).toBeDefined()
		expect(iv.length).toBe(NexusCrypto.AES.DEFAULT_IV_BYTES)
		expect(iv).toBeTypeOf('object')
		expect(iv).toBeInstanceOf(Uint8Array)
	})

	it('should return a random iv with custom length', () => {
		const length = 128
		const iv = NexusCrypto.AES.generateIv(length)

		expect(iv).toBeDefined()
		expect(iv.length).toBe(length)
		expect(iv).toBeTypeOf('object')
		expect(iv).toBeInstanceOf(Uint8Array)
	})
})

describe('AES.generateIvString', () => {
	it('should return a random iv string', () => {
		const iv = NexusCrypto.AES.generateIvString()

		expect(iv).toBeDefined()
		expect(iv.length).toBe(NexusCrypto.AES.DEFAULT_IV_BYTES)
		expect(iv).toBeTypeOf('string')
	})

	it('should return a random iv string with custom length', () => {
		const length = 256
		const iv = NexusCrypto.AES.generateIvString(length)

		expect(iv).toBeDefined()
		expect(iv.length).toBe(length)
		expect(iv).toBeTypeOf('string')
	})
})
