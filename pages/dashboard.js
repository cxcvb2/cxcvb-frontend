import s from '../styles/DashboardPage.module.css'
import Link from 'next/link'
import Transparentbtn from '../components/auxiliary-elements/Buttons/Transparentbtn/Transparentbtn'
import { useIntl } from '../hooks-utils/useIntl'
import MainLayout from '../components/Layout/MainLayout'
import { useDispatch } from 'react-redux'
import { changeShareUrlVisibility } from '../redux/ShareUrlReducer'

export default function DashboardPage() {
  const { f } = useIntl()
  const dispatch = useDispatch()
  const handleOnClick = () => {
    dispatch(changeShareUrlVisibility(true))
  }
  return (
    <MainLayout>
      <main className={s.main}>
        <div className={s.btns_wrapper}>
          <Link href="/signin">
            <a className={s.speedtestbtn}>
              <Transparentbtn>{f('signin')}</Transparentbtn>
            </a>
          </Link>
          <a
            href="https://www.speedtest.net/ru"
            target="_blank"
            className={s.speedtestbtn}
            rel="noreferrer"
          >
            <Transparentbtn>{f('speedtest')}</Transparentbtn>
          </a>

          <div className={s.speedtestbtn}>
            <Transparentbtn handleOnClick={handleOnClick}>
              {f('share')}
            </Transparentbtn>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}
