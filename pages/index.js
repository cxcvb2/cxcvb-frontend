import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LoadTopVideos } from '../api/api'
import FilmCardsCheck from '../components/auxiliary-elements/FilmCard/FilmCardsCheck'
import VideoLayout from '../components/auxiliary-elements/VideoLayout/VideoLayout'
import s from '../styles/Home.module.css'
// import { useIntl } from '../hooks-utils/useIntl'

export default function TopVideos({ topVideos }) {
  // const { f } = useIntl()
  const router = useRouter()
  const { opened } = router.query
  const mainclasses =
    opened && topVideos.length ? `${s.main_two_columns} ${s.main}` : s.main
  return (
    <main className={mainclasses}>
      <FilmCardsCheck result={topVideos} />
      {opened && topVideos.length ? (
        <VideoLayout result={topVideos} opened={opened} />
      ) : null}
    </main>
  )
}

export const getServerSideProps = async () => {
  const res = await LoadTopVideos({ call: 1 })
  return {
    props: {
      topVideos: res.result,
    },
  }
}
