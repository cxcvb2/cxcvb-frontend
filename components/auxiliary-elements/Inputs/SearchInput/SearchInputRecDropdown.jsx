import s from './SearchInputRecDropdown.module.css'
export default function SearchInputRecDropdown({
  searchInputRec,
  isSearchInputRecOpened,
}) {
  return (
    <>
      {searchInputRec.length && isSearchInputRecOpened ? (
        <ul className={s.searchInputRec_wrapper}>
          {searchInputRec.map(({ title }) => (
            <li key={title} className={s.searchInputRec_el}>
              {title}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}
