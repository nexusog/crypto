import { describe, expect, test } from 'vitest'
import NexusCrypto from '@/index'

describe('hexToString', () => {
	test('light', () => {
		const simpleTest = NexusCrypto.utils.hexToString(
			NexusCrypto.utils.stringToHex('Hello'),
		)

		expect(simpleTest).toBeDefined()
		expect(simpleTest.length).toBe(5)
		expect(simpleTest[0]).toBe('H')
		expect(simpleTest[4]).toBe('o')
	})
})
