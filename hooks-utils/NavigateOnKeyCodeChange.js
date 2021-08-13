export default function NavigateOnKeyCodeChange({ keyCode, router }) {

  switch (keyCode) {
    case 1: {
      router.push('/dashboard')
      return
    }
    case 2: {
      router.push('/films')
      return
    }
    case 3: {
      router.push('/serials')
      return
    }
    case 4: {
      router.push('/onlinetv')
      return
    }
  }
}
