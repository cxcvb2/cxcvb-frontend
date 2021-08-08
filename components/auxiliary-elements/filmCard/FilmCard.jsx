import { useRouter } from 'next/router'
import s from './FilmCard.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function FilmCard({
  title,
  description,
  source,
  thumbnail,
  host,
  ind,
}) {
  const { query } = useRouter()
  const filmcardIsActive =
    query.opened === source ? `${s.filmcard} ${s.filmcard__active}` : s.filmcard

  const filmCardImg =
    thumbnail !== '/images/not-thumbnail.png'
      ? `/api/imageproxy?url=${encodeURIComponent(thumbnail)}`
      : thumbnail
  const page = query.p || 1
  return (
    <section className={filmcardIsActive}>
      <Link
        href={`/${query.query}?p=${page}&opened=${source}`}
        scroll={false}
        shallow
      >
        <a className={s.filmcard__img}>
          <Image
            src={filmCardImg}
            layout="fill"
            alt={host}
            className={s.image}
          />
        </a>
      </Link>
      <div className={s.filmcard__content}>
        <h1 className={s.filmcard__title}>{title}</h1>
        <p className={s.filmcard__description}>{description}</p>
        <div className={s.filmcard__host_ind}>
          <p className={s.filmcard__host}>{host}</p>
          <div className={s.filmcard__remotecontroller_ind}>
            <Image src="/images/remote-controller.svg" width={25} height={32} />
            <p className={s.filmcard_ind}>{ind}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
