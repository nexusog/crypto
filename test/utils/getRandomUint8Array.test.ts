import { describe, expect, test } from 'vitest'
import NexusCrypto from '@/index'

describe('getRandomUint8Array', () => {
	test('light', () => {
		const simpleTest = NexusCrypto.utils.getRandomUint8Array(5)

		expect(simpleTest).toBeDefined()
		expect(simpleTest.length).toBe(5)
		for (let c of simpleTest) {
			expect(c).toBeGreaterThanOrEqual(0)
			expect(c).toBeLessThanOrEqual(Math.pow(2, 8))
		}
	})
})
