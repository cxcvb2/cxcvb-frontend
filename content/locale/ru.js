const rudefault = {
  search: 'поиск',
  dashboard: 'Дашборд',
  films: 'Фильмы',
  serials: 'Сериалы',
  onlinetv: 'Онлайн ТВ',
  contacts: 'контакты',
  phonenumber: 'номера телефонов',
  siterules: 'правила сайта',
  termsofuse: 'условия использования',
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
}
