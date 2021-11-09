import { useRouter } from 'next/router'
import { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { decode } from 'url-encode-decode'
import { apiCall } from '../api/api'
import { addFilmCardsAction } from '../redux/filmCardsReducer'

export default function FilmCardObserver({
  resLength,
  setIsLoaded,
  setIsFilmCardsObserved,
}) {
  const router = useRouter()
  const observedEl = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    let options = {
      rootMargin: '0px',
      threshold: 0,
    }
    let callback = async (entry) => {
      if (entry[0].isIntersecting) {
        let page = parseInt(router.query.p) || 1
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
          { scroll: false, shallow: true }
        )

        setIsLoaded(false)

        const res = await apiCall('videos.1/search', {
          query: decode(router.query.query),
          page,
          count: 6,
          locale: router.locale,
        })
        if (!res?.result?.length) {
          setIsFilmCardsObserved(false)
          router.push(
            {
              pathname: '/[query]',
              query: {
                ...paramsquery,
                p: page - 1,
              },
            },
            undefined,
            { scroll: false, shallow: true }
          )
        }
        dispatch(addFilmCardsAction(res.result || []))
        setIsLoaded(true)
      }
    }
    let observer = new IntersectionObserver(callback, options)
    observer.observe(observedEl.current)
    return () => {
      observer.disconnect()
    }
  }, [dispatch, router, router.query, setIsFilmCardsObserved, setIsLoaded])

  return <div style={{ display: resLength < 6 && 'none' }} ref={observedEl} />
}
