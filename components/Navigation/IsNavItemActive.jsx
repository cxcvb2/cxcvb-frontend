import { useRouter } from 'next/router'

import React from 'react'
import s from './Navigation.module.css'
import Link from 'next/link'
import { useIntl } from '../../hooks-utils/useIntl'

export default function IsNavItemActive({ navItems }) {
  const { pathname } = useRouter()
  // remove "/" from pathname for example /dashboard -> dashboard
  const directory = pathname.slice(1)
  const { f } = useIntl()

  return (
    <>
      {navItems.map((item, i) => {
        let nav__item_class = s.nav__item
        if (item === directory)
          nav__item_class = `${nav__item_class} ${s.nav__item_active}
            `
        return (
          <Link href={`/${item}`} key={item}>
            <a className={nav__item_class}>
              {f(item)}({i + 1})
            </a>
          </Link>
        )
      })}
    </>
  )
}
