import { useState } from 'react'
import s from '../styles/SearchedPage.module.css'
import FilmCardsCheck from '../components/auxiliary-elements/filmCard/FilmCardsCheck'
import VideoLayout from '../components/auxiliary-elements/VideoLayout/VideoLayout'
import { useRouter } from 'next/router'
import { LoadVideos } from '../api/api'

export default function SaerchedPage({ result }) {
  const { opened } = useRouter().query

  //if video player opened main will had two columns and margin in
  const mainclasses = opened ? `${s.main_two_columns} ${s.main}` : s.main
  return (
    <main className={mainclasses}>
      <FilmCardsCheck result={result} />
      {opened && <VideoLayout result={result} opened={opened} />}
    </main>
  )
}

export const getServerSideProps = async ({ query }) => {
  console.log('dont shallow')
  const { result } = await LoadVideos({ call: 1, query: query.query })

  //if result is null(error) make redirect
  const isRedirect = !result && {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  }
  return {
    ...isRedirect,
    props: { result },
  }
}
