import { useRef, useEffect } from 'react'

export default function FilmCardObserver({ router, resLength }) {
  const observedEl = useRef(null)

  useEffect(() => {
    let options = {
      rootMargin: '0px',
      threshold: 0,
    }
    let callback = function (entry) {
      if (entry[0].isIntersecting) {
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
 
  return <div style={{ display: resLength < 6 && 'none' }} ref={observedEl} />
}
