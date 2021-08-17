import { useEffect, useState } from 'react'
import s from '../styles/SearchedPage.module.css'
import FilmCardsCheck from '../components/auxiliary-elements/FilmCard/FilmCardsCheck'
import VideoLayout from '../components/auxiliary-elements/VideoLayout/VideoLayout'
import { useRouter } from 'next/router'
import { LoadVideos } from '../api/api'
import FilmCardsObserver from '../hooks-utils/FilmCardsObserver'
import { useSelector } from 'react-redux'
import { resetFilmCardsAction, initializeStore } from '../redux/store'

export default function SaerchedPage({ res }) {
  const result = useSelector((state) => state.filmCards)
  const [isLoaded, setIsLoaded] = useState(true)
  const router = useRouter()
  const { opened } = router.query

  const mainclasses = opened ? `${s.main_two_columns} ${s.main}` : s.main
  return (
    <main className={mainclasses}>
      <FilmCardsCheck result={result} />
      {opened && <VideoLayout result={result} opened={opened} />}
      {isLoaded && result?.length ? (
        <FilmCardsObserver resLength={res?.length} setIsLoaded={setIsLoaded} />
      ) : null}
    </main>
  )
}

export const getServerSideProps = async ({ query }) => {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore
  const page = parseInt(query.p) || 1
  const res = await LoadVideos({ call: 1, query: query.query, page, count: 6 })
  dispatch(resetFilmCardsAction(res.result))
  //if result is null(error) make redirect
  const isRedirect = !res.result && {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  }
  return {
    props: {
      ...isRedirect,
      initialReduxState: reduxStore.getState(),
      res: res.result,
    },
  }
}
