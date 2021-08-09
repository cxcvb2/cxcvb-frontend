import { useRef, useEffect } from 'react'
import s from '../styles/SearchedPage.module.css'
import FilmCardsCheck from '../components/auxiliary-elements/filmCard/FilmCardsCheck'
import VideoLayout from '../components/auxiliary-elements/VideoLayout/VideoLayout'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react/ssr'
import { $filmCards, FetchFilmCards } from '../store/searchedPage'
import root from '../store/root-domain'
import { serialize, fork, allSettled } from 'effector'

export default function SaerchedPage() {
  const result = useStore($filmCards)
  const router = useRouter()
  const { opened } = router.query
  const observedEl = useRef(null)
  console.log(result, 'result')
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

  const mainclasses = opened ? `${s.main_two_columns} ${s.main}` : s.main
  return (
    <main className={mainclasses}>
      <FilmCardsCheck result={result} />
      {opened && <VideoLayout result={result} opened={opened} />}
      <div className={s.filmCards_Loader_observer} ref={observedEl} />
    </main>
  )
}

export const getServerSideProps = async ({ query }) => {
  const page = query.p || 1
  const scope = fork(root)
  await allSettled(FetchFilmCards, {
    scope,
    params: {
      call: 1,
      query,
      page,
    },
  })

  return {
    props: {
      store: serialize(scope, { onlyChanges: true }),
    },
  }
}
