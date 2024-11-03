import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('SHA256.fromUint8Array', () => {
	it('toHex', () => {
		const data = NexusCrypto.utils.stringToUint8Array('hello world')
		const hash = NexusCrypto.SHA256.fromUint8Array.toHex(data)

		expect(hash).toBeDefined()
		expect(hash.length).toBe(32 * 2)
		expect(hash.slice(0, 2)).toBe('b9')
		expect(hash.slice(-2)).toBe('e9')
		expect(hash).toBeTypeOf('string')
	})

	it('toString', () => {
		const data = NexusCrypto.utils.stringToUint8Array('hello world')
		const hash = NexusCrypto.SHA256.fromUint8Array.toString(data)

		expect(hash).toBeDefined()
		expect(hash.length).toBe(32)
		expect(hash).toBeTypeOf('string')
	})

	it('toUint8Array', () => {
		const data = NexusCrypto.utils.stringToUint8Array('hello world')
		const hash = NexusCrypto.SHA256.fromUint8Array.toUint8Array(data)

		expect(hash).toBeDefined()
		expect(hash.length).toBe(54)
		expect(hash[0]).toBe(194)
		expect(hash.at(-1)).toBe(169)
		expect(hash).toBeTypeOf('object')
		expect(hash).toBeInstanceOf(Uint8Array)
	})
})
