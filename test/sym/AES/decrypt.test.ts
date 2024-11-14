import { describe, expect, suite, test } from 'vitest'
import NexusCrypto from '@/index'
import forge from 'node-forge'

const data = 'hello world'
const key = NexusCrypto.SHA256.hash(data).slice(0, 256 / 8)

suite('AES.decrypt', () => {
	describe('base64 -> ??', () => {
		const encryptedData = NexusCrypto.AES.encrypt(data, key, {
			outputEncoding: 'base64',
		})

		test('base64', () => {
			const decrypted = NexusCrypto.AES.decrypt(encryptedData, key, {
				outputEncoding: 'base64',
			})

			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(forge.util.encode64(data))
		})

		test('hex', () => {
			const decrypted = NexusCrypto.AES.decrypt(encryptedData, key, {
				outputEncoding: 'hex',
			})

			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(forge.util.bytesToHex(data))
		})

		test('utf8', () => {
			const decrypted = NexusCrypto.AES.decrypt(encryptedData, key, {
				outputEncoding: 'utf8',
			})

			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(data)
		})
	})

	describe('hex -> ??', () => {
		const encryptedData = NexusCrypto.AES.encrypt(data, key, {
			outputEncoding: 'hex',
		})

		test('base64', () => {
			const decrypted = NexusCrypto.AES.decrypt(encryptedData, key, {
				inputEncoding: 'hex',
				outputEncoding: 'base64',
			})

			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(forge.util.encode64(data))
		})

		test('hex', () => {
			const decrypted = NexusCrypto.AES.decrypt(encryptedData, key, {
				inputEncoding: 'hex',
				outputEncoding: 'hex',
			})

			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(forge.util.bytesToHex(data))
		})

		test('utf8', () => {
			const decrypted = NexusCrypto.AES.decrypt(encryptedData, key, {
				inputEncoding: 'hex',
				outputEncoding: 'utf8',
			})

			expect(decrypted).toBeDefined()
			expect(decrypted).toStrictEqual(data)
		})
	})
})
