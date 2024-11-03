import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('SHA256.createInstance', () => {
	it('should return an instance of SHA256', () => {
		const sha256 = NexusCrypto.SHA256.createInstance()
		expect(sha256).toBeDefined()
		expect(sha256.update).toBeInstanceOf(Function)
		expect(sha256.digest).toBeInstanceOf(Function)
	})
})
