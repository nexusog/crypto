import { expect, suite, test } from 'vitest'
import NexusCrypto from '@/index'

const data = 'HELLO WORLD'
const buffer = NexusCrypto.utils.createBuffer(data, 'ascii')
const expectedHex =
	'787ec76dcafd20c1908eb0936a12f91edd105ab5cd7ecc2b1ae2032648345dff'
const expectedBase64 = 'eH7Hbcr9IMGQjrCTahL5Ht0QWrXNfswrGuIDJkg0Xf8='

suite('SHA256.hash', () => {
	test('toHex', () => {
		const hash = NexusCrypto.SHA256.hash(buffer)

		expect(hash).toBeDefined()
		expect(hash.asHex()).toStrictEqual(expectedHex)
	})

	test('toBase64', () => {
		const hash = NexusCrypto.SHA256.hash(buffer)

		expect(hash).toBeDefined()
		expect(hash.asBase64()).toStrictEqual(expectedBase64)
	})

	test('toUtf8', () => {
		const hash = NexusCrypto.SHA256.hash(buffer)

		expect(hash).toBeDefined()
		expect(hash.asUtf8()).toBeTypeOf('string')
	})
})
