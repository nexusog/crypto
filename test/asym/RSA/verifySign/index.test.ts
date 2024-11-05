import { describe, expect, it } from 'vitest'
import NexusCrypto from '@/index'

const data = 'hello world'

describe('RSA.verifySign.fromString', () => {
	it('should verify a string signature', () => {
		const { publicKey, privateKey } = NexusCrypto.RSA.generateKeyPairPEM()

		const signature = NexusCrypto.RSA.sign.fromString.toString(
			privateKey,
			data,
		)

		const verified = NexusCrypto.RSA.verifySign.fromString(
			publicKey,
			data,
			signature,
		)

		expect(verified).toBeDefined()
		expect(verified).toBe(true)
	})
})

describe('RSA.verifySign.fromUint8Array', () => {
	it('should verify a Uint8Array signature', () => {
		const { publicKey, privateKey } = NexusCrypto.RSA.generateKeyPairPEM()

		const signature = NexusCrypto.RSA.sign.fromUint8Array.toUint8Array(
			privateKey,
			NexusCrypto.utils.stringToUint8Array(data),
		)

		const verified = NexusCrypto.RSA.verifySign.fromUint8Array(
			publicKey,
			NexusCrypto.utils.stringToUint8Array(data),
			signature,
		)

		expect(verified).toBeDefined()
		expect(verified).toBe(true)
	})
})
