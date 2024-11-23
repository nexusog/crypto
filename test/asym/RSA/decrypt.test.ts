import { expect, test } from 'vitest'
import NexusCrypto from '@/index'

const data = 'hello world'
const dataBuffer = NexusCrypto.utils.createBuffer(data)

const { publicKey, privateKey } = NexusCrypto.RSA.generateKeyPairPEM()

test('RSA.encrypt', () => {
	const encrypted = NexusCrypto.RSA.encrypt(dataBuffer, publicKey)

	const decrypted = NexusCrypto.RSA.decrypt(encrypted, privateKey)

	expect(decrypted).toBeDefined()
	expect(decrypted).toBeInstanceOf(NexusCrypto.NexusBuffer)
	expect(decrypted.asUtf8()).toStrictEqual(data)
})
