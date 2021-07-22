import s from './Transparentbtn.module.css'
export default function Transparentbtn({ children }) {
  return <button className={s.transparentbtn}>{children}</button>
}
