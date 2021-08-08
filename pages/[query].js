import { useState, useRef, useEffect } from 'react'
import s from '../styles/SearchedPage.module.css'
import FilmCardsCheck from '../components/auxiliary-elements/filmCard/FilmCardsCheck'
import VideoLayout from '../components/auxiliary-elements/VideoLayout/VideoLayout'
import { useRouter } from 'next/router'
import { LoadVideos } from '../api/api'
import { useStore } from 'effector-react'
import { $filmCards, addFilmCards } from '../effector/SearchedPage'
import { withStart } from 'effector-next'
import MainLayout from '../components/Layout/MainLayout'

const enhance = withStart(addFilmCards)

function SaerchedPage() {
  const result = useStore($filmCards)

  console.log(result[0], 'result')
  const router = useRouter()
  const { opened } = router.query
  const observedEl = useRef(null)
  useEffect(() => {
    let options = {
      rootMargin: '0px',
      threshold: 0,
    }
    let callback = function (entry) {
      if (entry[0].isIntersecting && result.length) {
        console.log(router.query.p, 'page')
        let page = router.query.p || 1
        router.push(
          {
            pathname: '/[query]',
            query: {
              query: router.query.query,
              p: ++page,
              opened: router.query.opened,
            },
          },
          undefined,
          { scroll: false }
        )
        console.log('v')
      }
    }
    let observer = new IntersectionObserver(callback, options)
    observer.observe(observedEl.current)
    return () => {
      observer.disconnect()
    }
  }, [router.query.p, result])
  //if video player opened main will had two columns and margin in
  const mainclasses = opened ? `${s.main_two_columns} ${s.main}` : s.main
  return (
    <MainLayout>
      <main className={mainclasses}>
        {/* <FilmCardsCheck result={result} /> */}
        {/* {opened && <VideoLayout result={result} opened={opened} />} */}
        {/* {result.map((e) => e.title)} */}
        <div className={s.filmCards_Loader_observer} ref={observedEl} />
      </main>
    </MainLayout>
  )
}

export const getServerSideProps = async ({ query }) => {
  const page = query.p || 1
  console.log(page)
  const { result } = await LoadVideos({
    call: 1,
    query: query.query,
    page,
  })
  addFilmCards(result)
  //if result is null(error) make redirect
  const isRedirect = !result && {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  }
  return {
    ...isRedirect,
    props: {},
  }
}

export default SaerchedPage
