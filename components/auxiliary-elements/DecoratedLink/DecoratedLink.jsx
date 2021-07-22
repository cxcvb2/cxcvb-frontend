import Link from 'next/link'
import s from './DecoratedLink.module.css'
export default function DecoratedLink({ href, children }) {
  return (
    <Link href={href}>
      <a className={s.decorated_link}>{children}</a>
    </Link>
  )
}
