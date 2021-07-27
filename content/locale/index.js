<<<<<<< HEAD
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
  // console.log(locale, defaultLocale, pathname, localeCopy, langs[locale], langs)
  if (pathname in localeCopy) {
    return { messages: localeCopy[pathname], locale, defaultLocale }
  }
  //  CHANGE: 404 page lang content v-1
  return {
    messages: {
      search: 'Search',
      dashboard: 'dashboard',
      films: 'films',
      serials: 'serials',
      onlinetv: 'online TV',
      contacts: 'contacts',
      phonenumber: 'phone numbers',
      siterules: `site's rules`,
      termsofuse: 'terms of use',
    },
    locale,
    defaultLocale,
  }
}
=======
export * from './ru'
export * from './en'
export * from './tr'
>>>>>>> b6e5afb684f9c3601ed36340c2ec869f7ea470a5
