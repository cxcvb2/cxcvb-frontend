import DecoratedLink from '../auxiliary-elements/DecoratedLink/DecoratedLink'
import s from './Footer.module.css'
import { useIntl } from '../../hooks/useIntl'

export default function Footer() {
  const { f } = useIntl()
  return (
    <footer className={s.footer}>
      <div className={s.footer__wrapper}>
        <ul className={s.footer__info}>
          <li>{f('contacts')}</li>
          <li>email: abuse@cxcvb.com</li>
          <li>{f('phonenumber')}: +7 123123123, </li>
          <li>{f('phonenumber')}: +7 123123123, </li>
        </ul>
        <ul className={s.footer__info}>
          <li>
            <DecoratedLink href="/siterules">{f('siterules')}</DecoratedLink>
          </li>
          <li>
            <DecoratedLink href="/termsofuse">{f('termsofuse')}</DecoratedLink>
          </li>
        </ul>
      </div>
    </footer>
  )
}
