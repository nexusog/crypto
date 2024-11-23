import * as NexusCrypto from '@/index'
import { expect, test } from 'vitest'

test('ascii', () => {
	const buf = NexusCrypto.utils.createBuffer('HelloWorld')

	expect(buf).toBeDefined()
	expect(buf).toBeInstanceOf(NexusCrypto.NexusBuffer)
	expect(buf.asHex()).toStrictEqual('48656c6c6f576f726c64')
	expect(buf.asBase64()).toStrictEqual('SGVsbG9Xb3JsZA==')
	expect(buf.asUtf8()).toStrictEqual('HelloWorld')
	expect(buf.asBinary()).toStrictEqual('HelloWorld')
})

test('hex', () => {
	const buf = NexusCrypto.utils.createBuffer('48656c6c6f576f726c64', 'hex')

	expect(buf).toBeDefined()
	expect(buf).toBeInstanceOf(NexusCrypto.NexusBuffer)
	expect(buf.asHex()).toStrictEqual('48656c6c6f576f726c64')
	expect(buf.asBase64()).toStrictEqual('SGVsbG9Xb3JsZA==')
	expect(buf.asUtf8()).toStrictEqual('HelloWorld')
	expect(buf.asBinary()).toStrictEqual('HelloWorld')
})
