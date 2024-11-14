import { describe, expect, it, suite } from 'vitest'
import NexusCrypto from '@/index'
import forge from 'node-forge'

const data = 'hello world'
const expectedHex =
	'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
const expectedBase64 = 'uU0nuZNNPgilLlLX2n2r+sSE7+N6U4DukIj3rOLvzek='

suite('SHA256.hash', () => {
	describe('utf8 -> ??', () => {
		it('hex', () => {
			const hash = NexusCrypto.SHA256.hash(data)

			expect(hash).toBeDefined()
			expect(hash).toStrictEqual(expectedHex)
		})

		it('base64', () => {
			const hash = NexusCrypto.SHA256.hash(data, {
				outputEncoding: 'base64',
			})

			expect(hash).toBeDefined()
			expect(hash).toStrictEqual(expectedBase64)
		})
	})

	describe('hex -> ??', () => {
		it('hex', () => {
			const hash = NexusCrypto.SHA256.hash(forge.util.bytesToHex(data), {
				inputEncoding: 'hex',
			})

			expect(hash).toBeDefined()
			expect(hash).toStrictEqual(expectedHex)
		})

		it('base64', () => {
			const hash = NexusCrypto.SHA256.hash(forge.util.bytesToHex(data), {
				inputEncoding: 'hex',
				outputEncoding: 'base64',
			})

			expect(hash).toBeDefined()
			expect(hash).toStrictEqual(expectedBase64)
		})
	})

	describe('base64 -> ??', () => {
		it('hex', () => {
			const hash = NexusCrypto.SHA256.hash(forge.util.encode64(data), {
				inputEncoding: 'base64',
			})

			expect(hash).toBeDefined()
			expect(hash).toStrictEqual(expectedHex)
		})

		it('base64', () => {
			const hash = NexusCrypto.SHA256.hash(forge.util.encode64(data), {
				inputEncoding: 'base64',
				outputEncoding: 'base64',
			})

			expect(hash).toBeDefined()
			expect(hash).toStrictEqual(expectedBase64)
		})
	})
})
