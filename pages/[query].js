import { useEffect, useState } from 'react'
import s from '../styles/SearchedPage.module.css'
import FilmCardsCheck from '../components/auxiliary-elements/filmCard/FilmCardsCheck'
import VideoLayout from '../components/auxiliary-elements/VideoLayout/VideoLayout'
import { useRouter } from 'next/router'
import { LoadVideos } from '../api/api'
import FilmCardsObserver from '../hooks/FilmCardsObserver'

export default function SaerchedPage({ res }) {
  // const filmCards = useSelector((state) => state.filmCards)
  const router = useRouter()
  const { opened } = router.query
  const [result, setResult] = useState(res)
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
      />
    </main>
  )
}

export const getServerSideProps = async ({ query }) => {
  // const reduxStore = initializeStore()
  // console.log(reduxStore.getState(), 'cardd')
  // const { dispatch } = reduxStore
  const page = query.p || 1
  const res = await LoadVideos({ call: 1, query: query.query, page, count: 6 })
  // dispatch(addFilmCardsAction(res.result))
  return {
    props: {
      res: res.result,
      // initialReduxState: reduxStore.getState(),
    },
  }
}
