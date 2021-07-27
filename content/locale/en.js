<<<<<<< HEAD
const endefault = {
  search: 'Search',
  dashboard: 'dashboard',
  films: 'films',
  serials: 'serials',
  onlinetv: 'online TV',
  contacts: 'contacts',
  phonenumber: 'phone numbers',
  siterules: `site's rules`,
  termsofuse: 'terms of use',
}

export const en = {
  '/dashboard': {
    signin: 'signin',
    speedtest: 'speedtest',
    ...endefault,
  },
  '/[query]': {
    ...endefault,
=======
export const en = {
  '/': {
    signin: 'signin',
    speedtest: 'speedtest',
    search: 'Search',
    dashboard: 'dashboard',
    films: 'films',
    serials: 'serials',
    onlinetv: 'online TV',
    contacts: 'contacts',
    phonenumber: 'phone numbers',
    siterules: `site's rules`,
    termsofuse: 'terms of use',
>>>>>>> b6e5afb684f9c3601ed36340c2ec869f7ea470a5
  },
}
