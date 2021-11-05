const endefault = {
  //header
  search: 'Search',
  dashboard: 'dashboard',
  films: 'films',
  serials: 'serials',
  onlinetv: 'online TV',
  kids: 'kids',
  //footer
  contacts: 'contacts',
  phonenumber: 'phone numbers',
  siterules: `site's rules`,
  termsofuse: 'terms of use',
  share: 'Share',
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
  '/kids': {
    ...endefault,
  },
}
