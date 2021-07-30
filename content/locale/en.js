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
  },
  '/': {
    ...endefault,
  },
}
