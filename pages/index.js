import s from '../styles/DashboardPage.module.css'
// import { useIntl } from '../hooks/useIntl'
import { serialize, fork } from 'effector'
import root from '../store/root-domain'

export const getServerSideProps = async (context) => {
  const scope = fork(root)

  return {
    props: {
      store: serialize(scope, { onlyChanges: true }),
    },
  }
}

export default function index() {
  // const { f } = useIntl()
  return <main className={s.main}>nothing yet</main>
}
