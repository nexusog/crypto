import { expect, suite, test } from 'vitest'
import NexusCrypto from '@/index'

const data = 'HELLO WORLD'
const buffer = NexusCrypto.utils.createBuffer(data, 'ascii')

suite('SHA256.hashRaw', () => {
	test('should return an instance of SHA256 MessageDigest', () => {
		const hash = NexusCrypto.SHA256.hashRaw(buffer)

		expect(hash).toBeDefined()
		expect(hash.update).toBeInstanceOf(Function)
		expect(hash.digest).toBeInstanceOf(Function)
		expect(hash.digest().getBytes()).toBeTypeOf('string')
	})
})
