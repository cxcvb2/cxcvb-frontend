import s from '../styles/404.module.css'
// import { useIntl } from '../hooks-utils/useIntl'

export default function DashboardPage() {
  // const { f } = useIntl()
  return (
    <>
      <main className={s.main}>
        <h1 className={s.errmessage}>something goes wrong :(</h1>
      </main>
    </>
  )
}
