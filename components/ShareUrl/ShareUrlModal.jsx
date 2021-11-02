import s from './ShareUrlModal.module.css'
import { forwardRef, useEffect, useState } from 'react'
import Transparentbtn from '../auxiliary-elements/Buttons/Transparentbtn/Transparentbtn'
import { useRouter } from 'next/router'

const ShareUrlModal = forwardRef(function Modal(
  { isComponentVisible, setIsComponentVisible, withoutInput },
  ref
) {
  const { asPath, basePath } = useRouter()
  const [devices, setDevices] = useState([])
  const handleOnClick = () => {
    setIsComponentVisible(false)
  }
  useEffect(() => {
    ;(async () => {
      const { MetacomListenShareUrl, MetacomGetDevices, metacom } =
        await import('../../hooks-utils/useMetacom')
      console.log(metacom, 'meta')
      if (metacom) {
        await MetacomListenShareUrl()
        setDevices(await MetacomGetDevices())
      }
    })()
  }, [])
  console.log(devices)
  return (
    <>
      {isComponentVisible && (
        <div className={s.modal_wrapper}>
          <div className={s.modal} ref={ref}>
            <h1 className={s.modal__title}>Devices in your wifi</h1>
            <h3 className={s.modal__url}>URL Now - {basePath + asPath}</h3>
            <div className={s.closeModal_icon} onClick={handleOnClick} />
            {withoutInput || (
              <input
                type="text"
                placeholder="sended url"
                className={s.modal_input}
              />
            )}
            <ul className={s.devices_wrapper}>
              {devices.map((device) => (
                <li className={s.device} key={device.id}>
                  {device.deviceName}
                </li>
              ))}
            </ul>
            <div className={s.modal_sendBtn}>
              <Transparentbtn isSmall>Send</Transparentbtn>
            </div>
          </div>
        </div>
      )}
    </>
  )
})
export default ShareUrlModal
