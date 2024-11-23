import { expect, test } from 'vitest'
import NexusCrypto from '@/index'
import { NexusBuffer } from '@/core/buffer'

const data = 'hello world'
const dataBuffer = NexusCrypto.utils.createBuffer(data)
const key = NexusCrypto.SHA256.hash(dataBuffer)
	.asHex()
	.slice(0, 256 / 8)
const keyBuffer = NexusCrypto.utils.createBuffer(key)

test('AES.decrypt', () => {
	const encrypted = NexusCrypto.AES.encrypt(dataBuffer, keyBuffer)

	const decrypted = NexusCrypto.AES.decrypt(encrypted, keyBuffer)

	expect(decrypted).toBeDefined()
	expect(decrypted).toBeInstanceOf(NexusBuffer)
	expect(decrypted.asUtf8()).toStrictEqual(data)
	expect(decrypted.asBinary()).toStrictEqual(data)
})
