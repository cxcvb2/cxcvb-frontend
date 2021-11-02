import s from './Transparentbtn.module.css'

export default function Transparentbtn({ children, handleOnClick, isSmall }) {
  const btnClass = isSmall ? s.transparentbtn_small : s.transparentbtn
  return (
    <button onClick={handleOnClick} className={btnClass}>
      {children}
    </button>
  )
}
