import Router from 'next/router'
import { useState, useEffect, useRef } from 'react'
import Loader from '../auxiliary-elements/Loader/Loader'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import KeyCodeInput from '../auxiliary-elements/Inputs/KeyCodeInput/KeyCodeInput'
import s from './MainLayout.module.css'
export default function MainLayout({ children }) {
  const inputRef = useRef()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <div className={s.main_wrapper}>
      <Header inputRef={inputRef} />
      <KeyCodeInput inputRef={inputRef} />
      {loading && <Loader />}
      {children}
      <Footer />
    </div>
  )
}
