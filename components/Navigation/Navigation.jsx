import { useEffect } from 'react'
import s from './Navigation.module.css'
import IsNavItemActive from './IsNavItemActive'
import { useRouter } from 'next/router'

const navItems = ['dashboard', 'films', 'serials', 'onlinetv']

export default function Navigation({ keyCode }) {
  const router = useRouter()

  useEffect(() => {
    switch (keyCode) {
      case 1: {
        router.push('/dashboard')
        break
      }
      case 2: {
        router.push('/films')
        break
      }
      case 3: {
        router.push('/serials')
        break
      }
      case 4: {
        router.push('/onlinetv')
        break
      }
    }
  }, [keyCode])

  return (
    <>
      <nav className={s.nav}>
        <div className={s.nav__wrapper}>
          <IsNavItemActive navItems={navItems} />
        </div>
      </nav>
    </>
  )
}
