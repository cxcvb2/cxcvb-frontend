<<<<<<< HEAD
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
=======
export const ru = {
  '/': {
    signin: 'войти',
    speedtest: 'тест скорости',
    search: 'поиск',
    dashboard: 'Дашборд',
    films: 'Фильмы',
    serials: 'Сериалы',
    onlinetv: 'Онлайн ТВ',
    contacts: 'контакты',
    phonenumber: 'номера телефонов',
    siterules: 'правила сайта',
    termsofuse: 'условия использования',
>>>>>>> b6e5afb684f9c3601ed36340c2ec869f7ea470a5
  },
}
