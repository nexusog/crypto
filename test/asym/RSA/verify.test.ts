import { expect, test } from 'vitest'
import NexusCrypto from '@/index'

const data = 'hello world'
const dataBuffer = NexusCrypto.utils.createBuffer(data)
const { privateKey, publicKey } = NexusCrypto.RSA.generateKeyPairPEM()

test('RSA.verify', () => {
	const signature = NexusCrypto.RSA.sign(dataBuffer, privateKey)

	const verify = NexusCrypto.RSA.verify(signature, dataBuffer, publicKey)

	expect(verify).toBeDefined()
	expect(verify).toStrictEqual(true)
})
