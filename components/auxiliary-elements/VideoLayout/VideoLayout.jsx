import { useRouter } from 'next/router'
import CurrentVideoCheck from './CurrentVideoCheck'
import s from './VideoLayout.module.css'

export default function VideoLayout({ opened, result }) {
  const router = useRouter()
  // const [currentVideo, setCurrentVideo] = useState({})
  const closeVideoLayoutHandler = () => {
    let p = router.query.p
    router.push(`/${router.query.query}?p=${p}`, undefined, {
      shallow: true,
      scroll: false,
    })
  }
  const currentVideo = result.find((video) => {
    if (opened === video?.source) return video
  })

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
