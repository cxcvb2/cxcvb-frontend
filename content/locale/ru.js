const rudefault = {
  //header
  search: 'поиск',
  dashboard: 'Дашборд',
  films: 'Фильмы',
  serials: 'Сериалы',
  onlinetv: 'Онлайн ТВ',
  kids: 'Дети',
  //footer
  contacts: 'контакты',
  phonenumber: 'номера телефонов',
  siterules: 'правила сайта',
  termsofuse: 'условия использования',
  share: 'поделиться',
}

export const ru = {
  '/dashboard': {
    signin: 'войти',
    speedtest: 'тест скорости',
    ...rudefault,
  },
  '/[query]': {
    ...rudefault,
  },
  '/': {
    ...rudefault,
  },
  '/kids': {
    ...rudefault,
  },
}
