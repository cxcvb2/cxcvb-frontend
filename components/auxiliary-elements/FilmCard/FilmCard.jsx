import { useRouter } from 'next/router'
import s from './FilmCard.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import skl from '../../../hooks-utils/SkeletonWrapper/SkeletonWrapper.module.css'

export default function FilmCard({
  title,
  description,
  withquery,
  thumbnail,
  host,
  ind,
  videoId,
}) {
  const { query } = useRouter()
  const [imageIsLoaded, setImageIsLoaded] = useState(true)
  const [isThumbnailLoad, setisThumbnailLoad] = useState(thumbnail)
  const filmCardRef = useRef()
  const ImageWrapperRef = useRef()

  useEffect(() => {
    if (query.opened === videoId) {
      filmCardRef.current.scrollIntoView()
    }
  }, [query.opened, videoId])

  useEffect(() => {
    if (!ImageWrapperRef.current?.firstChild?.firstChild?.complete) {
      setImageIsLoaded(true)
    }
  }, [imageIsLoaded])

  const filmcardIsActive =
    query.opened === videoId
      ? `${s.filmcard} ${s.filmcard__active}`
      : s.filmcard

  const filmCardImg = isThumbnailLoad
    ? `/api/imageproxy?url=${isThumbnailLoad}`
    : '/images/not-thumbnail.png'

  const page = query.p || 1
  const isSkeleton = imageIsLoaded
    ? `${s.filmcard__img} ${skl.skeleton}`
    : s.filmcard__img

  const hrefQuery = withquery
    ? `/${query.query}?p=${page}&opened=${videoId}`
    : `/?p=${page}&opened=${videoId}`

  return (
    <section ref={filmCardRef}>
      <Link href={hrefQuery} scroll={false} shallow>
        <a className={filmcardIsActive}>
          <div className={isSkeleton} ref={ImageWrapperRef}>
            <Image
              draggable="false"
              style={{ display: imageIsLoaded && 'none' }}
              src={filmCardImg}
              layout="fill"
              alt={host}
              className={s.image}
              onError={() => {
                setisThumbnailLoad('/images/not-thumbnail.png')
              }}
              unoptimized="true"
              onLoad={() => {
                setImageIsLoaded(false)
              }}
              key={videoId}
            />
          </div>
          <div className={s.filmcard__content}>
            <h1 className={s.filmcard__title}>{title}</h1>
            <p className={s.filmcard__description}>{description}</p>
            <div className={s.filmcard__host_ind}>
              <p className={s.filmcard__host}>{host}</p>
              <div className={s.filmcard__remotecontroller_ind}>
                <Image
                  draggable="false"
                  src="/images/remote-controller.svg"
                  width={25}
                  height={32}
                  alt=""
                />
                <p className={s.filmcard_ind}>{ind}</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </section>
  )
}
