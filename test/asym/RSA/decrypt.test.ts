import { describe, expect, suite, test } from 'vitest'
import forge from 'node-forge'
import NexusCrypto from '@/index'

const { publicKey, privateKey } = NexusCrypto.RSA.generateKeyPairPEM()

const data = 'hello world'

suite('RSA.decrypt', () => {
	describe('base64 -> ??', () => {
		test('utf8', () => {
			const encrypted = NexusCrypto.RSA.encrypt(data, publicKey, {
				inputEncoding: 'utf8',
				outputEncoding: 'base64',
			})

			const decrypted = NexusCrypto.RSA.decrypt(encrypted, privateKey, {
				inputEncoding: 'base64',
				outputEncoding: 'utf8',
			})

			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(data)
		})

		test('base64', () => {
			const encrypted = NexusCrypto.RSA.encrypt(data, publicKey, {
				inputEncoding: 'utf8',
				outputEncoding: 'hex',
			})

			const decrypted = NexusCrypto.RSA.decrypt(encrypted, privateKey, {
				inputEncoding: 'hex',
				outputEncoding: 'base64',
			})

			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(forge.util.encode64(data))
		})

		test('hex', () => {
			const encrypted = NexusCrypto.RSA.encrypt(data, publicKey, {
				inputEncoding: 'utf8',
				outputEncoding: 'hex',
			})

			const decrypted = NexusCrypto.RSA.decrypt(encrypted, privateKey, {
				inputEncoding: 'hex',
				outputEncoding: 'hex',
			})
			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(forge.util.bytesToHex(data))
		})
	})

	describe('hex -> ??', () => {
		test('utf8', () => {
			const encrypted = NexusCrypto.RSA.encrypt(
				forge.util.bytesToHex(data),
				publicKey,
				{
					inputEncoding: 'hex',
					outputEncoding: 'hex',
				},
			)

			const decrypted = NexusCrypto.RSA.decrypt(encrypted, privateKey, {
				inputEncoding: 'hex',
				outputEncoding: 'utf8',
			})

			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(data)
		})

		test('base64', () => {
			const encrypted = NexusCrypto.RSA.encrypt(
				forge.util.bytesToHex(data),
				publicKey,
				{
					inputEncoding: 'hex',
					outputEncoding: 'hex',
				},
			)

			const decrypted = NexusCrypto.RSA.decrypt(encrypted, privateKey, {
				inputEncoding: 'hex',
				outputEncoding: 'base64',
			})

			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(forge.util.encode64(data))
		})

		test('hex', () => {
			const encrypted = NexusCrypto.RSA.encrypt(
				forge.util.bytesToHex(data),
				publicKey,
				{
					inputEncoding: 'hex',
					outputEncoding: 'hex',
				},
			)

			const decrypted = NexusCrypto.RSA.decrypt(encrypted, privateKey, {
				inputEncoding: 'hex',
				outputEncoding: 'hex',
			})

			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(forge.util.bytesToHex(data))
		})
	})
})
