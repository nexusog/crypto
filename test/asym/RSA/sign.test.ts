import { describe, expect, suite, test } from 'vitest'
import NexusCrypto from '@/index'
import forge from 'node-forge'

const data = 'hello world'
const { privateKey } = NexusCrypto.RSA.generateKeyPairPEM()

suite('RSA.sign', () => {
	describe('utf8 -> ??', () => {
		test('base64', () => {
			const signed = NexusCrypto.RSA.sign('hello world', privateKey)

			expect(signed).toBeDefined()
		})

		test('hex', () => {
			const signed = NexusCrypto.RSA.sign('hello world', privateKey, {
				outputEncoding: 'hex',
			})

			expect(signed).toBeDefined()
		})
	})

	describe('base64 -> ??', () => {
		test('base64', () => {
			const signed = NexusCrypto.RSA.sign(
				forge.util.encode64(data),
				privateKey,
				{
					inputEncoding: 'base64',
					outputEncoding: 'base64',
				},
			)

			expect(signed).toBeDefined()
		})

		test('hex', () => {
			const signed = NexusCrypto.RSA.sign(
				forge.util.encode64(data),
				privateKey,
				{
					inputEncoding: 'base64',
					outputEncoding: 'hex',
				},
			)

			expect(signed).toBeDefined()
		})
	})

	describe('hex -> ??', () => {
		test('base64', () => {
			const signed = NexusCrypto.RSA.sign(
				forge.util.bytesToHex(data),
				privateKey,
				{
					inputEncoding: 'hex',
					outputEncoding: 'base64',
				},
			)

			expect(signed).toBeDefined()
		})

		test('hex', () => {
			const signed = NexusCrypto.RSA.sign(
				forge.util.bytesToHex(data),
				privateKey,
				{
					inputEncoding: 'hex',
					outputEncoding: 'hex',
				},
			)

			expect(signed).toBeDefined()
		})
	})
})
