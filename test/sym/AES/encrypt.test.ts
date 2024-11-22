import { describe, expect, suite, test } from 'vitest'
import NexusCrypto from '@/index'
import forge from 'node-forge'

const data = 'hello world'
const key = NexusCrypto.SHA256.hash(data).slice(0, 256 / 8)

suite('AES.encrypt', () => {
	describe('utf8 -> ??', () => {
		test('base64', () => {
			const encrypted = NexusCrypto.AES.encrypt(data, key, {
				inputEncoding: 'utf8',
				outputEncoding: 'base64',
			})

			expect(encrypted).toBeDefined()
			expect(encrypted).toContain('==')
		})

		test('hex', () => {
			const encrypted = NexusCrypto.AES.encrypt(data, key, {
				inputEncoding: 'utf8',
				outputEncoding: 'hex',
			})

			expect(encrypted).toBeDefined()
		})
	})

	describe('hex -> ??', () => {
		test('base64', () => {
			const encrypted = NexusCrypto.AES.encrypt(
				forge.util.bytesToHex(data),
				key,
				{
					inputEncoding: 'hex',
					outputEncoding: 'base64',
				},
			)

			expect(encrypted).toBeDefined()
			expect(encrypted).toContain('==')
		})

		test('hex', () => {
			const encrypted = NexusCrypto.AES.encrypt(
				forge.util.bytesToHex(data),
				key,
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
			const encrypted = NexusCrypto.AES.encrypt(
				forge.util.encode64(data),
				key,
				{
					inputEncoding: 'base64',
					outputEncoding: 'base64',
				},
			)

			expect(encrypted).toBeDefined()
			expect(encrypted).toContain('==')
		})

		test('hex', () => {
			const encrypted = NexusCrypto.AES.encrypt(
				forge.util.encode64(data),
				key,
				{
					inputEncoding: 'base64',
					outputEncoding: 'hex',
				},
			)

			expect(encrypted).toBeDefined()
		})
	})
})
