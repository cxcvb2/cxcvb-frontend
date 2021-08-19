import s from './FilmCardsCheck.module.css'
import FilmCard from './FilmCard.jsx'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { decode } from 'url-encode-decode'

export default function FilmCardsCheck({ withquery = false, result }) {
  const keyCode = useSelector((state) => state.keyCode)
  const router = useRouter()
  const { opened } = router.query

  useEffect(() => {
    // if (!router.query.opened && result?.length) {
    //   router.push(`${router.asPath}?opened=${result[0]?.source}`)
    // }
    if (keyCode - 10 <= result?.length - 1 && keyCode && keyCode >= 10) {
      let paramsquery = {
        pathname: '/',
        query: {
          p: router.query.p || 1,
          opened: result[keyCode - 10]?.videoId,
        },
      }
      withquery &&
        (paramsquery = {
          pathname: '/[query]',
          query: {
            query: router.query.query,
            p: router.query.p || 1,
            opened: result[keyCode - 10]?.videoId,
          },
        })

      router.push(
        {
          ...paramsquery,
        },
        undefined,
        { scroll: false, shallow: true }
      )
    }
  }, [keyCode, result])

  const filmCards_wrapperClasses = opened
    ? `${s.filmCards_wrapper_mb} ${s.filmCards_wrapper} `
    : s.filmCards_wrapper
  console.log({ withquery })
  return (
    <>
      {!result?.length ? (
        <h1>There are no video in this query - {decode(router.query.query)}</h1>
      ) : (
        <div className={filmCards_wrapperClasses}>
          {result.map((el, ind) => (
            <FilmCard
              {...el}
              ind={ind + 10}
              key={el.videoId}
              opened={opened}
              withquery={withquery}
            />
          ))}
        </div>
      )}
    </>
  )
}
