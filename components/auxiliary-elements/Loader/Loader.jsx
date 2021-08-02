import React from 'react'
import s from './Loader.module.css'
export default function Loader() {
  return (
    <div className={s.lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
