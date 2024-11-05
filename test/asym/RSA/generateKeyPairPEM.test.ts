import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('RSA.generateKeyPairPEM', () => {
	it('should return a key pair', () => {
		const keyPair = NexusCrypto.RSA.generateKeyPairPEM()

		expect(keyPair).toBeDefined()
		expect(keyPair).toBeTypeOf('object')
		expect(keyPair).toBeInstanceOf(Object)
		expect(keyPair.privateKey).toBeDefined()
		expect(keyPair.privateKey).toBeTypeOf('string')
		expect(
			keyPair.privateKey.startsWith('-----BEGIN RSA PRIVATE KEY-----'),
		).toBe(true)
		expect(keyPair.publicKey).toBeDefined()
		expect(keyPair.publicKey).toBeTypeOf('string')
		expect(keyPair.publicKey.startsWith('-----BEGIN PUBLIC KEY-----')).toBe(
			true,
		)
	})

	it('should return a key pair with custom bits', () => {
		const bits = 4096
		const keyPair = NexusCrypto.RSA.generateKeyPairPEM(bits)

		expect(keyPair).toBeDefined()
		expect(keyPair).toBeTypeOf('object')
		expect(keyPair).toBeInstanceOf(Object)
		expect(keyPair.privateKey).toBeDefined()
		expect(keyPair.privateKey).toBeTypeOf('string')
		expect(keyPair.publicKey).toBeDefined()
		expect(keyPair.publicKey).toBeTypeOf('string')
	})
})
