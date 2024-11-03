import { describe, expect, test } from 'vitest'
import NexusCrypto from '@/index'

describe('uint8ArrayToString', () => {
	test('light', () => {
		const simpleTest = NexusCrypto.utils.uint8ArrayToString(
			new Uint8Array([72, 101, 108, 108, 111]),
		)

		expect(simpleTest).toBeDefined()
		expect(simpleTest.length).toBe(5)
		expect(simpleTest[0]).toBe('H')
		expect(simpleTest[4]).toBe('o')
	})
})
