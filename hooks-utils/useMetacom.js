import { Metacom } from '../lib/metacom'
export let metacom = null
export function MetacomCreate() {
  metacom = Metacom.create('ws://176.124.99.109:8001/api')
}

export async function MetacomListenShareUrl() {
  await metacom.load('shareURL')
  await metacom.api.shareURL.listen({ deviceName: 'device' })
}

export async function MetacomGetDevices() {
  console.log(metacom)
  return await metacom.api.shareURL.getDevices()
}
