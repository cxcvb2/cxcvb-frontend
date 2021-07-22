import Image from 'next/image'
import s from './searchInput.module.css'
import { useIntl } from '../../../hooks/useIntl'

export default function SearchInput() {
  const { f } = useIntl()

  return (
    <div className={s.search_wrapper}>
      <label className={s.searchInput__wrapper} htmlFor="searchInput">
        <Image
          src="/searchIcon.svg"
          width={35}
          height={35}
          alt="cxcvb search"
        />
      </label>
      <input
        id="searchInput"
        className={s.search_wrapper__input}
        type="text"
        placeholder={f('search') + '(0)'}
      />
    </div>
  )
}
