import { useRef, useEffect } from 'react'

export default function filmCardObserver({ router, resultLength, resLength }) {
  const observedEl = useRef(null)

  useEffect(() => {
    let options = {
      rootMargin: '0px',
      threshold: 0,
    }
    let callback = function (entry) {
      if (entry[0].isIntersecting && resultLength) {
        let page = router.query.p || 1
        let paramsquery = {
          query: router.query.query,
          p: ++page,
        }
        let opened = router.query.opened
        opened && (paramsquery = { ...paramsquery, opened })

        router.push(
          {
            pathname: '/[query]',
            query: {
              ...paramsquery,
            },
          },
          undefined,
          { scroll: false }
        )
      }
    }
    let observer = new IntersectionObserver(callback, options)
    observer.observe(observedEl.current)
    return () => {
      observer.disconnect()
    }
  }, [router.query])
  console.log(resLength)
  return <div style={{ display: !resLength && 'none' }} ref={observedEl} />
}
