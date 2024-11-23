import { expect, test } from 'vitest'
import NexusCrypto from '@/index'

const data = 'hello world'
const dataBuffer = NexusCrypto.utils.createBuffer(data)
const { privateKey } = NexusCrypto.RSA.generateKeyPairPEM()

test('RSA.sign', () => {
	const signature = NexusCrypto.RSA.sign(dataBuffer, privateKey)

	expect(signature).toBeDefined()
	expect(signature).toBeInstanceOf(NexusCrypto.NexusBuffer)
})
