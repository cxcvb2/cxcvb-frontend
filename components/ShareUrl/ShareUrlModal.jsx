import s from './ShareUrlModal.module.css'
import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useComponentVisible from '../../hooks-utils/useComponentVisible'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeAcceptUrlVisibility,
  changeShareUrlVisibility,
} from '../../redux/ShareUrlReducer'
// import Transparentbtn from '../auxiliary-elements/Buttons/Transparentbtn/Transparentbtn'

const ShareUrlModal = memo(function ShareUrlModal({ deviceName }) {
  const [devices, setDevices] = useState([])
  // const devices = useSelector((state) => state.shareUrl.devices)
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const isShareUrlModalVisible = useSelector(
    (state) => state.shareUrl.isShareUrlVisible
  )
  // const isAcceptUrlVisible = useSelector(
  //   (state) => state.shareUrl.isAcceptUrlVisible
  // )
  const [acceptURL, setAcceptURL] = useState('')
  const { ref } = useComponentVisible(false)
  const { asPath, basePath } = useRouter()
  const [metacom, setMetacom] = useState(null)

  // const handleOnAccept = () => {
  //   console.log('accept', acceptURL)
  //   dispatch(changeAcceptUrlVisibility(false))
  //   setAcceptURL('')
  //   router.push(acceptURL)
  // }
  const handleOnClose = () => {
    dispatch(changeShareUrlVisibility(false))
  }
  const handleOnClick = async (id) => {
    const url = inputValue ? `/${inputValue}` : router.asPath
    console.log('onclick share', url)
    // try {
    await metacom.api.shareURL.share({ id, url })
    // } catch (e) {
    // console.log(e)
    // }
    dispatch(changeShareUrlVisibility(false))
  }

  const handleOnChange = (e) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    ;(async () => {
      console.log('create connection', metacom)
      const { Metacom } = await import('../../lib/metacom')
      const metacom = await Metacom.create('ws://92.63.106.41:8001/api')
      setMetacom(metacom)
      await metacom.load('shareURL')
      await metacom.api.shareURL.listen({ name: deviceName || 'without name' })
      const devices = await metacom.api.shareURL.getDevices()
      // dispatch(setDevices(devices))
      setDevices(devices)
      metacom.api.shareURL.on('share', ({ url }) => {
        console.log('share')
        router.push(url)
        dispatch(changeShareUrlVisibility(false))
        // dispatch(changeAcceptUrlVisibility(true))
        setAcceptURL(url)
      })
      metacom.api.shareURL.on('disconnected', ({ id }) => {
        console.log('dis')
        setDevices((prev) => prev.filter((d) => d.id !== id))
        // dispatch(removeDevices(id))
      })

      metacom.api.shareURL.on('connected', ({ id, name }) => {
        console.log('con', id, name)
        console.log(devices, [...devices, { id, name }])
        setDevices((prev) => [...prev, { id, name }])
        // dispatch(setDevices([{ id, name }]))
      })
    })()
  }, [])

  return (
    <>
      {/* {isAcceptUrlVisible && (
        <div className={s.modal_wrapper}>
          <div className={s.accepturl_model} ref={ref}>
            <p>
              accept sharing with this url <b>{`'${acceptURL}'`}</b> ?
            </p>
            <div className={s.accept_btn_wrapper}>
              <Transparentbtn handleOnClick={handleOnAccept} isSmall>
                Accept
              </Transparentbtn>
            </div>
          </div>
        </div>
      )} */}
      {isShareUrlModalVisible && (
        <div className={s.modal_wrapper}>
          <div className={s.modal} ref={ref}>
            <h1 className={s.modal__title}>Share with url in your network!</h1>
            <h3 className={s.modal__url}>
              URL Now - {`'${basePath + asPath}'`}
            </h3>
            <div className={s.closeModal_icon} onClick={handleOnClose} />

            <input
              value={inputValue}
              onChange={handleOnChange}
              type="text"
              placeholder="another url you want to send"
              className={s.modal_input}
            />

            <ul className={s.devices_wrapper}>
              {devices.length ? (
                devices.map((device, i) => (
                  <li
                    className={s.device}
                    onClick={() => handleOnClick(device.id)}
                    key={device.id}
                  >
                    {device.name || `user ${i + 1}`}
                  </li>
                ))
              ) : (
                <h2>there is no devices</h2>
              )}
            </ul>
          </div>
        </div>
      )}
      {}
    </>
  )
})
export default ShareUrlModal
