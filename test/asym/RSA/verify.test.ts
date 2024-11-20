import { describe, expect, suite, test } from 'vitest'
import NexusCrypto from '@/index'
import forge from 'node-forge'

const data = 'hello world'
const { publicKey, privateKey } = NexusCrypto.RSA.generateKeyPairPEM()
const signedBase64 = NexusCrypto.RSA.sign('hello world', privateKey)
const signedHex = NexusCrypto.RSA.sign('hello world', privateKey, {
	outputEncoding: 'hex',
})

suite('RSA.verify', () => {
	describe('signed base64', () => {
		test('utf8', () => {
			const verified = NexusCrypto.RSA.verify(
				signedBase64,
				data,
				publicKey,
				{
					signatureEncoding: 'base64',
					dataEncoding: 'utf8',
				},
			)

			expect(verified).toBe(true)
		})

		test('base64', () => {
			const verified = NexusCrypto.RSA.verify(
				signedBase64,
				forge.util.encode64(data),
				publicKey,
				{
					signatureEncoding: 'base64',
					dataEncoding: 'base64',
				},
			)

			expect(verified).toBe(true)
		})

		test('hex', () => {
			const verified = NexusCrypto.RSA.verify(
				signedBase64,
				forge.util.bytesToHex(data),
				publicKey,
				{
					signatureEncoding: 'base64',
					dataEncoding: 'hex',
				},
			)

			expect(verified).toBe(true)
		})
	})

	describe('signed hex', () => {
		test('utf8', () => {
			const verified = NexusCrypto.RSA.verify(
				signedHex,
				data,
				publicKey,
				{
					signatureEncoding: 'hex',
					dataEncoding: 'utf8',
				},
			)

			expect(verified).toBe(true)
		})

		test('base64', () => {
			const verified = NexusCrypto.RSA.verify(
				signedHex,
				forge.util.encode64(data),
				publicKey,
				{
					signatureEncoding: 'hex',
					dataEncoding: 'base64',
				},
			)

			expect(verified).toBe(true)
		})

		test('hex', () => {
			const verified = NexusCrypto.RSA.verify(
				signedHex,
				forge.util.bytesToHex(data),
				publicKey,
				{
					signatureEncoding: 'hex',
					dataEncoding: 'hex',
				},
			)

			expect(verified).toBe(true)
		})
	})
})
