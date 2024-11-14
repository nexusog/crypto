import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('getRandomHex', () => {
	it('should return a random hex string', () => {
		const simpleTest = NexusCrypto.utils.getRandomHex(5)

		expect(simpleTest).toBeDefined()
		expect(simpleTest.length).toBe(5 * 2)
		for (let c of simpleTest) {
			expect(c.charCodeAt(0)).toBeGreaterThanOrEqual(48)
			expect(c.charCodeAt(0)).toBeLessThanOrEqual(102)
		}
	})
})
