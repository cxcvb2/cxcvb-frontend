import s from './VideoLayout.module.css'

export default function CurrentVideoCheck({ currentVideo }) {
  return (
    <>
      {currentVideo ? (
        <>
          <iframe
            src={`${currentVideo.source}`}
            title={`${currentVideo.host}'s video`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={s.videoLayout__video}
          ></iframe>
          <div className={s.videoLayout__content}>
            <h1 className={s.videoLayout__title}>{currentVideo.title}</h1>
            <p className={s.videoLayout__desc}>{currentVideo.description}</p>
            <p className={s.videoLayout__host}>{currentVideo.host}</p>
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
