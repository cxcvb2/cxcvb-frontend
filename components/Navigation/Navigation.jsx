import { useEffect } from 'react'
import s from './Navigation.module.css'
import IsNavItemActive from './IsNavItemActive'
import { useRouter } from 'next/router'

const navItems = ['dashboard', 'films', 'serials', 'onlinetv']

export default function Navigation({ keycode }) {
  const { push } = useRouter()

  useEffect(() => {
    switch (Number(keycode)) {
      case 49: {
        push('/dashboard')
        break
      }
      case 50: {
        push('/films')
        break
      }
      case 51: {
        push('/serials')
        break
      }
      case 52: {
        push('/onlinetv')
        break
      }
    }
  }, [keycode])

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
