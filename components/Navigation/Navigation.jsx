import { useEffect } from 'react'
import s from './Navigation.module.css'
import IsNavItemActive from './IsNavItemActive'
import { useRouter } from 'next/router'

const navItems = ['dashboard', 'films', 'serials', 'onlinetv']

export default function Navigation({ keyCode }) {
  const { push } = useRouter()

  useEffect(() => {
    switch (keyCode) {
      case 1: {
        push('/dashboard')
        break
      }
      case 2: {
        push('/films')
        break
      }
      case 3: {
        push('/serials')
        break
      }
      case 4: {
        push('/onlinetv')
        break
      }
    }
  }, [keyCode, push])

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
