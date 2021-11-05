import React from 'react'
import useComponentVisible from '../../hooks-utils/useComponentVisible'
import { useIntl } from '../../hooks-utils/useIntl'
import Transparentbtn from '../auxiliary-elements/Buttons/Transparentbtn/Transparentbtn'
import ShareUrlModal from './ShareUrlModal'

export default function ShareUrl({ isSmall, withoutInput }) {
  const { f } = useIntl()
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false)
  const handleOnClick = () => {
    setIsComponentVisible(true)
  }

  return (
    <>
      <Transparentbtn handleOnClick={handleOnClick} isSmall={isSmall}>
        {f('share')}
      </Transparentbtn>
      <ShareUrlModal
        ref={ref}
        isComponentVisible={isComponentVisible}
        setIsComponentVisible={setIsComponentVisible}
        withoutInput={withoutInput}
      />
    </>
  )
}
