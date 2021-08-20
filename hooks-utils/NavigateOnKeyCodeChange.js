import { navItems } from '../components/Navigation/Navigation'

export default function NavigateOnKeyCodeChange({ keyCode, router }) {
  if (navItems[keyCode - 1]) {
    router.push(`/${navItems[keyCode - 1]}`)
  }
}
