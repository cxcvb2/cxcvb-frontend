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

  return (
    <section className={filmcardIsActive}>
      <Link href={`/${query.query}?opened=${source}`} scroll={false} shallow>
        <a className={s.filmcard__img}>
          <Image src={thumbnail} layout="fill" alt={host} className={s.image} />
        </a>
      </Link>
      <div className={s.filmcard__content}>
        <h1 className={s.filmcard__title}>{title}</h1>
        <p className={s.filmcard__description}>{description}</p>
        <p className={s.filmcard__host}>
          {host} {ind}
        </p>
      </div>
    </section>
  )
}
