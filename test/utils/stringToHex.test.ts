import { describe, expect, test } from 'vitest'
import NexusCrypto from '@/index'

describe('stringToHex', () => {
	test('light', () => {
		const simpleTest = NexusCrypto.utils.stringToHex('Hello')

		expect(simpleTest).toBeDefined()
		expect(simpleTest.length).toBe(5 * 2)
		expect(simpleTest.slice(0, 2)).toBe('48')
	})
})
