import s from './VideoLayout.module.css'
import { useState } from 'react'
import skl from '../../../hooks-utils/SkeletonWrapper/SkeletonWrapper.module.css'

export default function CurrentVideoCheck({ currentVideo }) {
  const [iframeIsLoaded, setIframeIsLoaded] = useState(true)
  const isSkeleton = iframeIsLoaded
    ? `${s.videoLayout__video_wrapper} ${skl.skeleton}`
    : s.videoLayout__video_wrapper
  return (
    <>
      {currentVideo ? (
        <>
          <div className={isSkeleton}>
            <iframe
              src={`${currentVideo.source}`}
              title={`${currentVideo.host}'s video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => {
                setIframeIsLoaded(false)
              }}
              className={s.videoLayout__video}
            ></iframe>
          </div>
          <div className={s.videoLayout__content}>
            <h1 className={s.videoLayout__title}>{currentVideo.title}</h1>

            <p className={s.videoLayout__desc}>{currentVideo.description}</p>
            <div className={s.videoLayout__host__wrapper}>
              <p className={s.videoLayout__host}>{currentVideo.host}</p>
            </div>
          </div>
        </>
      ) : (
        <div className={s.videoLayout__content}>
          <h1 className={s.videoLayout__errormessage}>
            Sorry, there is not video but you can see other videos!
          </h1>
        </div>
      )}
    </>
  )
}
