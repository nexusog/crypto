import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('AES.encrypt.fromString', () => {
	it('should return encrypted data', () => {
		const data = new Array(16).fill('A').join('')
		const key = NexusCrypto.utils.getRandomString(32)
		const ivBytes = 16
		const encrypted = NexusCrypto.AES.encrypt.fromString.toString(
			data,
			key,
			{
				ivBytes,
			},
		)

		expect(encrypted).toBeDefined()
		expect(encrypted.length).toBeGreaterThanOrEqual(ivBytes + data.length)
	})
})
