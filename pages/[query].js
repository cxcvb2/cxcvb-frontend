import { useEffect, useState } from 'react'
import s from '../styles/SearchedPage.module.css'
import FilmCardsCheck from '../components/auxiliary-elements/filmCard/FilmCardsCheck'
import VideoLayout from '../components/auxiliary-elements/VideoLayout/VideoLayout'
import { useRouter } from 'next/router'
// import { useStore } from 'effector-react/ssr'
// import { allSettled, fork, serialize } from 'effector'
// import { addFilmCards, app } from '../store/model'
// import { $filmCards } from '../store/model'
import { LoadVideos } from '../api/api'
import FilmCardsObserver from '../hooks/FilmCardsObserver'
export default function SaerchedPage({ res }) {
  const [result, setResult] = useState(res)
  const router = useRouter()
  const { opened } = router.query

  useEffect(() => {
    console.log(res.length)
    if (result.length) {
      setResult([])
    }
  }, [router.query.query])

  useEffect(() => {
    setResult((result) => [...result, ...res])
  }, [res])

  const mainclasses = opened ? `${s.main_two_columns} ${s.main}` : s.main
  return (
    <main className={mainclasses}>
      <FilmCardsCheck result={result} />
      {opened && <VideoLayout result={result} opened={opened} />}
      <FilmCardsObserver
        router={router}
        result={result}
        resLength={res.length}
        resultLength={result.length}
      />
    </main>
  )
}

export const getServerSideProps = async ({ query }) => {
  const page = query.p || 1
  const res = await LoadVideos({ call: 1, query: query.query, page, count: 6 })

  return {
    props: {
      res: res.result,
    },
  }
  // const scope = fork(app)
  // await allSettled(addFilmCards, {
  //   scope,
  //   params: {
  //     call: 1,
  //     query,
  //     count: 6,
  //   },
  // })

  // return {
  //   props: { initialState: serialize(scope, { onlyChanges: true }) },
  // }
}
