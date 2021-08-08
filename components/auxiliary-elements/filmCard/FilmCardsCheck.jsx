import s from './FilmCardsCheck.module.css'
import FilmCard from './FilmCard.jsx'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useStore } from 'effector-react'
import { $keyCode } from '../../../effector/SearchedPage'

export default function FilmCardsCheck({ result }) {
  const keyCode = useStore($keyCode)
  console.log(result, 'ehhhhhhhhh')
  const router = useRouter()
  const { opened } = router.query

  useEffect(() => {
    // if (!router.query.opened && result.length) {
    //   router.push(`${router.asPath}?opened=${result[0]?.source}`)
    // }
    if (keyCode - 10 <= result.length - 1 && keyCode && keyCode >= 10) {
      console.log(keyCode - 10, result.length)
      router.push(
        {
          pathname: '/[query]',
          query: {
            query: router.query.query,
            p: router.query.p || 1,
            opened: encodeURI(result[keyCode - 10]?.source),
          },
        },
        undefined,
        { scroll: false, shallow: true }
      )
    }
  }, [keyCode])

  const filmCards_wrapperClasses = opened
    ? `${s.filmCards_wrapper_mb} ${s.filmCards_wrapper} `
    : s.filmCards_wrapper

  return (
    <>
      {result.length ? (
        <h1>There are no video in this query - {router.query.query}</h1>
      ) : (
        <div className={filmCards_wrapperClasses}>
          {result.map((el, ind) => (
            <FilmCard {...el} ind={ind + 10} key={el?.source} />
          ))}
        </div>
      )}
    </>
  )
}
