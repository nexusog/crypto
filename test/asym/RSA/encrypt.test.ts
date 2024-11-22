import { describe, expect, suite, test } from 'vitest'
import NexusCrypto from '@/index'
import forge from 'node-forge'

const data = 'hello world'
const key = NexusCrypto.SHA256.hash(data).slice(0, 256 / 8)

const { publicKey } = NexusCrypto.RSA.generateKeyPairPEM()

suite('RSA.encrypt', () => {
	describe('utf8 -> ??', () => {
		test('base64', () => {
			const encrypted = NexusCrypto.RSA.encrypt(data, publicKey, {
				inputEncoding: 'utf8',
				outputEncoding: 'base64',
			})

			expect(encrypted).toBeDefined()
			expect(encrypted).toContain('==')
		})

		test('hex', () => {
			const encrypted = NexusCrypto.RSA.encrypt(data, publicKey, {
				inputEncoding: 'utf8',
				outputEncoding: 'hex',
			})

			expect(encrypted).toBeDefined()
		})
	})

	describe('hex -> ??', () => {
		test('base64', () => {
			const encrypted = NexusCrypto.RSA.encrypt(
				forge.util.bytesToHex(data),
				publicKey,
				{
					inputEncoding: 'hex',
					outputEncoding: 'base64',
				},
			)

			expect(encrypted).toBeDefined()
			expect(encrypted).toContain('==')
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

			expect(encrypted).toBeDefined()
		})
	})

	describe('base64 -> ??', () => {
		test('base64', () => {
			const encrypted = NexusCrypto.RSA.encrypt(
				forge.util.encode64(data),
				publicKey,
				{
					inputEncoding: 'base64',
					outputEncoding: 'base64',
				},
			)

			expect(encrypted).toBeDefined()
			expect(encrypted).toContain('==')
		})

		test('hex', () => {
			const encrypted = NexusCrypto.RSA.encrypt(
				forge.util.encode64(data),
				publicKey,
				{
					inputEncoding: 'base64',
					outputEncoding: 'hex',
				},
			)

			expect(encrypted).toBeDefined()
		})
	})
})
