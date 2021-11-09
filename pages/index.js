import { useRouter } from 'next/router'
import { apiCall } from '../api/api'
import FilmCardsCheck from '../components/auxiliary-elements/FilmCard/FilmCardsCheck'
import VideoLayout from '../components/auxiliary-elements/VideoLayout/VideoLayout'
import s from '../styles/TopVideosPage.module.css'
// import { useIntl } from '../hooks-utils/useIntl'
import MainLayout from '../components/Layout/MainLayout'

export default function TopVideos({ topVideos }) {
  // const { f } = useIntl()
  const router = useRouter()
  const { opened } = router.query
  const mainclasses =
    opened && topVideos.length ? `${s.main_two_columns} ${s.main}` : s.main
  return (
    <MainLayout>
      <main>
        <div className={mainclasses}>
          <FilmCardsCheck result={topVideos} />
          {opened && topVideos.length ? (
            <VideoLayout result={topVideos} opened={opened} />
          ) : null}
        </div>
      </main>
    </MainLayout>
  )
}

export const getServerSideProps = async ({ locale }) => {
  const res = await apiCall('videos/top', { call: 1, locale })
  return {
    props: {
      topVideos: res.result,
    },
  }
}
