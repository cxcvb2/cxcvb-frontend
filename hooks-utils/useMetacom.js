import { Metacom } from '../lib/metacom'
export let metacom = null
export async function MetacomCreate() {
  metacom = await Metacom.create('ws://92.63.106.41:8001/api')
}

export async function MetacomListenShareUrl(name) {
  await metacom.load('shareURL')
  await metacom.api.shareURL.listen({ name })
}

export async function MetacomGetDevices() {
  console.log(metacom.api.shareURL, 'shareURL')
  console.log(metacom.api, 'api')

  return await metacom.api.shareURL.getDevices()
}
