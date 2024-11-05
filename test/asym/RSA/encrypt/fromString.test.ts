import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

describe('RSA.encrypt.fromString.toString', () => {
	it('should encrypt a string to a string', () => {
		const publicKeyPEM = NexusCrypto.RSA.generateKeyPairPEM().publicKey
		const data = 'hello world'
		const encrypted = NexusCrypto.RSA.encrypt.fromString.toString(
			publicKeyPEM,
			data,
		)
		expect(encrypted).toBeDefined()
		expect(encrypted).toBeTypeOf('string')
	})
})

describe('RSA.encrypt.fromString.toUint8Array', () => {
	it('should encrypt a string to a Uint8Array', () => {
		const publicKeyPEM = NexusCrypto.RSA.generateKeyPairPEM().publicKey
		const data = 'hello world'
		const encrypted = NexusCrypto.RSA.encrypt.fromString.toUint8Array(
			publicKeyPEM,
			data,
		)
		expect(encrypted).toBeDefined()
		expect(encrypted).toBeInstanceOf(Uint8Array)
	})
})

describe('RSA.encrypt.fromString.toHex', () => {
	it('should encrypt a string to a hex string', () => {
		const publicKeyPEM = NexusCrypto.RSA.generateKeyPairPEM().publicKey
		const data = 'hello world'
		const encrypted = NexusCrypto.RSA.encrypt.fromString.toHex(
			publicKeyPEM,
			data,
		)
		expect(encrypted).toBeDefined()
		expect(encrypted).toBeTypeOf('string')
	})
})
