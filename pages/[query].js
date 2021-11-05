import { useEffect, useState } from 'react'
import s from '../styles/SearchedPage.module.css'
import FilmCardsCheck from '../components/auxiliary-elements/FilmCard/FilmCardsCheck'
import VideoLayout from '../components/auxiliary-elements/VideoLayout/VideoLayout'
import { useRouter } from 'next/router'
import { apiCall } from '../api/api'
import FilmCardsObserver from '../hooks-utils/FilmCardsObserver'
import { useSelector } from 'react-redux'
import { initializeStore } from '../redux/store'
import { resetFilmCardsAction } from '../redux/filmCardsReducer'
import MainLayout from '../components/Layout/MainLayout'
import { decode } from 'url-encode-decode'

export default function SaerchedPage({ resLength }) {
  const result = useSelector((state) => state.filmCardsPage.filmCards)

  const [isLoaded, setIsLoaded] = useState(true)
  const [isFilmCardsObserved, setIsFilmCardsObserved] = useState(
    resLength || true
  )
  const router = useRouter()
  const { opened } = router.query

  const mainclasses =
    opened && result.length ? `${s.main_two_columns} ${s.main}` : s.main
  return (
    <MainLayout>
      <main className={mainclasses}>
        <FilmCardsCheck withquery result={result} />
        {opened && result.length ? (
          <VideoLayout withquery result={result} opened={opened} />
        ) : null}
        {isLoaded && resLength && isFilmCardsObserved ? (
          <FilmCardsObserver
            resLength={resLength}
            setIsLoaded={setIsLoaded}
            setIsFilmCardsObserved={setIsFilmCardsObserved}
          />
        ) : null}
      </main>
    </MainLayout>
  )
}

export const getServerSideProps = async ({ query }) => {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore
  const page = parseInt(query.p) || 1
  const res = await apiCall('videos.1/search', {
    query: decode(query.query),
    page,
    count: 6,
  })
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
      resLength: res.result?.length,
      initialReduxState: reduxStore.getState(),
    },
    ...isRedirect,
  }
}
