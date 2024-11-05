import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

const data = NexusCrypto.utils.stringToUint8Array('hello world')

describe('RSA.encrypt.fromUint8Array.toString', () => {
	it('should encrypt a Uint8Array to a string', () => {
		const publicKeyPEM = NexusCrypto.RSA.generateKeyPairPEM().publicKey
		const encrypted = NexusCrypto.RSA.encrypt.fromUint8Array.toString(
			publicKeyPEM,
			data,
		)
		expect(encrypted).toBeDefined()
		expect(encrypted).toBeTypeOf('string')
	})
})

describe('RSA.encrypt.fromUint8Array.toUint8Array', () => {
	it('should encrypt a Uint8Array to a Uint8Array', () => {
		const publicKeyPEM = NexusCrypto.RSA.generateKeyPairPEM().publicKey
		const encrypted = NexusCrypto.RSA.encrypt.fromUint8Array.toUint8Array(
			publicKeyPEM,
			data,
		)
		expect(encrypted).toBeDefined()
		expect(encrypted).toBeInstanceOf(Uint8Array)
	})
})

describe('RSA.encrypt.fromUint8Array.toHex', () => {
	it('should encrypt a Uint8Array to a hex string', () => {
		const publicKeyPEM = NexusCrypto.RSA.generateKeyPairPEM().publicKey
		const encrypted = NexusCrypto.RSA.encrypt.fromUint8Array.toHex(
			publicKeyPEM,
			data,
		)
		expect(encrypted).toBeDefined()
		expect(encrypted).toBeTypeOf('string')
	})
})
