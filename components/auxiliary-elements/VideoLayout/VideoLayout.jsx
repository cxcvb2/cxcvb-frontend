import { useRouter } from 'next/router'
import CurrentVideoCheck from './CurrentVideoCheck'
import s from './VideoLayout.module.css'

export default function VideoLayout({ opened, result }) {
  const router = useRouter()
  // const [currentVideo, setCurrentVideo] = useState({})
  const closeVideoLayoutHandler = () => {
    router.replace(router.query.query, undefined, { shallow: true })
  }
  const currentVideo = result.find((video) => {
    if (opened === video.source) return video
  })
  console.log(currentVideo)

  return (
    <div className={s.videoLayout_wrapper}>
      <section className={s.videoLayout}>
        <div
          className={s.videoLayout__close}
          onClick={closeVideoLayoutHandler}
        />
        <CurrentVideoCheck currentVideo={currentVideo} />
      </section>
    </div>
  )
}
