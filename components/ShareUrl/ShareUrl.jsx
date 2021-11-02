import React from 'react'
import useComponentVisible from '../../hooks-utils/useComponentVisible'
import Transparentbtn from '../auxiliary-elements/Buttons/Transparentbtn/Transparentbtn'
import ShareUrlModal from './ShareUrlModal'

export default function ShareUrl({ isSmall, withoutInput }) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false)
  const handleOnClick = () => {
    setIsComponentVisible(true)
  }

  return (
    <>
      <Transparentbtn handleOnClick={handleOnClick} isSmall={isSmall}>
        Share
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
