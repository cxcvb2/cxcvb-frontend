import { Metacom } from '../lib/metacom'
let metacom = null
export async function MetacomCreate(name) {
  metacom = await Metacom.create('ws://92.63.106.41:8001/api')
  await metacom.load('shareURL')
  await metacom.api.shareURL.listen({ name })
}

export function getMetacom() {
  return metacom
}
// return await metacom.api.shareURL.getDevices()
