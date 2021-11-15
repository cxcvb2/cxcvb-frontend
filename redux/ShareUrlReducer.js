export const shareUrlInitialState = {
  isShareUrlVisible: false,
  isAcceptUrlVisible: false,
  devices: [],
}
//remove unused events
const IS_SHAREURL_VISIBLE = 'IS_SHAREURL_VISIBLE'
const IS_ACCEPT_VISIBLE = 'IS_ACCEPT_VISIBLE'
const SET_DEVICES = 'SET_DEVICES'
const DELETE_DEVICES = 'DELETE_DEVICES'

export const ShareUrlReducer = (state = shareUrlInitialState, action) => {
  console.log(action.type, 'actionn  ')
  switch (action.type) {
    case IS_SHAREURL_VISIBLE: {
      return {
        ...state,
        isShareUrlVisible: action.isVisible,
      }
    }
    case IS_ACCEPT_VISIBLE: {
      return {
        ...state,
        isAcceptUrlVisible: action.isVisible,
      }
    }
    case SET_DEVICES: {
      if (action.devices) {
        return state
      }
      return {
        ...state,
        devices: [...state.devices, action.devices],
      }
    }
    case DELETE_DEVICES: {
      return {
        ...state,
        devices: state.devices.filter((d) => d.id !== action.id),
      }
    }
    default: {
      return state
    }
  }
}

export const changeShareUrlVisibility = (isVisible) => ({
  type: IS_SHAREURL_VISIBLE,
  isVisible,
})
export const changeAcceptUrlVisibility = (isVisible) => ({
  type: IS_ACCEPT_VISIBLE,
  isVisible,
})
export const setDevices = (devices) => ({
  type: SET_DEVICES,
  devices,
})

export const removeDevices = (id) => ({
  type: SET_DEVICES,
  id,
})
