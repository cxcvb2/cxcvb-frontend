import { isBrowser } from '../utils/common'
import { useEffect } from 'react'
import { fork, hydrate } from 'effector'
import { clientScope } from '../utils/clientScope'
import rootDomain from '../store/root-domain'

let isFirstHydration = true

export const useMergeState = (pageProps) => {
  console.log(isBrowser(), 'browser')

  if (isBrowser()) {
    const syncHydration = isFirstHydration
    isFirstHydration = false

    useEffect(() => {
      if (syncHydration) return
      hydrate(clientScope, {
        values: pageProps.store,
      })
    }, [pageProps, syncHydration])

    if (syncHydration) {
      hydrate(clientScope, {
        values: pageProps.store,
      })
    }
    console.log(clientScope)
    return clientScope
  }
  return fork(rootDomain, {
    values: pageProps.store,
  })
}
