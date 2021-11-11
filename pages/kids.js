import React, { useRef, useState } from 'react'
import { apiCall } from '../api/api'
import s from '../styles/kids.module.css'
import skl from '../hooks-utils/SkeletonWrapper/SkeletonWrapper.module.css'
import SearchInput from '../components/auxiliary-elements/Inputs/SearchInput/SearchInput'
import KeyCodeInput from '../components/auxiliary-elements/Inputs/KeyCodeInput/KeyCodeInput'
import DecoratedLink from '../components/auxiliary-elements/DecoratedLink/DecoratedLink'

export default function Kids({ video }) {
  const [iframeIsLoaded, setIframeIsLoaded] = useState(true)
  const inputRef = useRef()
  const isSkeleton = iframeIsLoaded
    ? `${s.video_wrapper} ${skl.skeleton}`
    : s.video_wrapper

  return (
    <main className={s.main}>
      <div className={s.searchInput_wrapper}>
        <KeyCodeInput inputRef={inputRef} />
        <SearchInput inputRef={inputRef} />
      </div>
      {video.source ? (
        <div className={isSkeleton}>
          <iframe
            src={`${video.source}`}
            title={`${video.host}'s video`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              setIframeIsLoaded(false)
            }}
            className={s.video}
          ></iframe>
        </div>
      ) : (
        <h1>There is no video</h1>
      )}
      <div className={s.openFullVersion}>
        <DecoratedLink href="/">открыть полную версию</DecoratedLink>
      </div>
    </main>
  )
}
export const getServerSideProps = async ({ locale }) => {
  const { result } = await apiCall('videos.1/getRandom', {
    type: 'ForKids',
    locale,
  })
  console.log({ result })
  return {
    props: {
      video: result || {},
    },
  }
}
