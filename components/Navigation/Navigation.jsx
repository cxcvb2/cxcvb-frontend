import s from './Navigation.module.css'

import IsNavItemActive from './IsNavItemActive'

const navItems = ['dashboard', 'films', 'serials', 'onlinetv']

export default function Navigation() {
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
