import { createBuffer, NexusBuffer } from '@/core/buffer'
import forge from 'node-forge'

function createInstance() {
	return forge.md.sha256.create()
}

function hashRaw(buffer: NexusBuffer) {
	return createInstance().update(buffer.asUtf8(), 'utf8')
}

function hash(data: NexusBuffer) {
	return createBuffer(hashRaw(data).digest().getBytes(), 'binary')
}

export const SHA256 = {
	createInstance,
	hash,
	hashRaw,
}
