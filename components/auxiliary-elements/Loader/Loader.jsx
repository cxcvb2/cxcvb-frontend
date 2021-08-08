import s from './Loader.module.css'
export default function Loader({ small }) {
  return (
    <div className={s.lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
