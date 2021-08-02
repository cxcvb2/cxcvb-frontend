import s from './FilmCardsCheck.module.css'
import FilmCard from './FilmCard.jsx'
import { useRouter } from 'next/router'

export default function FilmCardsCheck({ result }) {
  const { query } = useRouter()

  return (
    <>
      {!result.length ? (
        <h1>There are no videos in this query - {query.query}</h1>
      ) : (
        <div className={s.filmCards_wrapper}>
          {result.map((el) => (
            <FilmCard {...el} key={el?.source} />
          ))}
        </div>
      )}
    </>
  )
}
