import { expect, test } from 'vitest'
import NexusCrypto from '@/index'

const data = 'hello world'
const dataBuffer = NexusCrypto.utils.createBuffer(data)

const { publicKey } = NexusCrypto.RSA.generateKeyPairPEM()

test('RSA.encrypt', () => {
	const encrypted = NexusCrypto.RSA.encrypt(dataBuffer, publicKey)

	expect(encrypted).toBeDefined()
	expect(encrypted).toBeInstanceOf(NexusCrypto.NexusBuffer)
})
