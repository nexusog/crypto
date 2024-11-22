import { describe, expect, it, test } from 'vitest'
import NexusCrypto from '@/index'

describe('RSA.generateKeyPair', () => {
	test('should return a key pair', () => {
		const keyPair = NexusCrypto.RSA.generateKeyPair()

		expect(keyPair).toBeDefined()
		expect(keyPair).toBeTypeOf('object')
		expect(keyPair).toBeInstanceOf(Object)
		expect(keyPair.privateKey).toBeDefined()
		expect(keyPair.privateKey).toBeTypeOf('object')
		expect(keyPair.publicKey).toBeDefined()
		expect(keyPair.publicKey).toBeTypeOf('object')
	})

	test('should return a key pair with custom bits', () => {
		const bits = 4096
		const keyPair = NexusCrypto.RSA.generateKeyPair(bits)

		expect(keyPair).toBeDefined()
		expect(keyPair).toBeTypeOf('object')
		expect(keyPair).toBeInstanceOf(Object)
		expect(keyPair.privateKey).toBeDefined()
		expect(keyPair.privateKey).toBeTypeOf('object')
		expect(keyPair.publicKey).toBeDefined()
		expect(keyPair.publicKey).toBeTypeOf('object')
	})
})
