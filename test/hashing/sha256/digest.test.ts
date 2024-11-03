import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('SHA256.digest', () => {
	it('should return a digest', () => {
		const data = 'hello world'
		const digest = NexusCrypto.SHA256.digest(data)

		expect(digest).toBeDefined()
		expect(digest.toHex).toBeInstanceOf(Function)
		expect(digest.toString).toBeInstanceOf(Function)
		expect(digest.bytes).toBeInstanceOf(Function)
	})
})
