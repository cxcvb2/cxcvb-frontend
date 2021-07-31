import { ru } from './ru'
import { en } from './en'
import { tr } from './tr'
import { useRouter } from 'next/router'

const langs = {
  ru,
  en,
  tr,
}
export default function useLang() {
  const router = useRouter()
  const { locale, defaultLocale, pathname } = router
  const localeCopy = langs[locale]

  if (pathname in localeCopy) {
    return { messages: localeCopy[pathname], locale, defaultLocale }
  }
  //  CHANGE: 404 page lang content v-1
  return {
    messages: {
      search: 'Search',
      dashboard: 'Dashboard',
      films: 'Films',
      serials: 'Serials',
      onlinetv: 'Online TV',
      contacts: 'Contacts',
      phonenumber: 'Phone numbers',
      siterules: `Site's rules`,
      termsofuse: 'Terms of use',
    },
    locale,
    defaultLocale,
  }
}
