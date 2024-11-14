import { describe, expect, test } from 'vitest'
import NexusCrypto from '@/index'

describe('hexToUint8Array', () => {
	test('light', () => {
		const simpleTest = NexusCrypto.utils.uint8ArrayToHex(
			NexusCrypto.utils.stringToUint8Array('Hello'),
		)

		expect(simpleTest).toBeDefined()
		expect(simpleTest.length).toBe(5 * 2)
		expect(simpleTest).toStrictEqual('48656c6c6f')
	})
})
