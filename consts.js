const path = require('path');

const mongoDBUrl = 'mongodb://localhost:27017/';

const port = 3000;
const dbName = 'userdb';

const paths = {
    logo: 'images/logo.png',
    homepageSplash: 'images/homepageSplash.png',
    ekaterinburgSplash: 'images/restaurants/ekaterinburg.jpg',
    moscowSplash: 'images/restaurants/moscow.jpg',
    separator: 'images/homepageSplash.png',
    publicDir: path.join(__dirname, '/public'),
    viewsDir: path.join(__dirname, '/views/partials'),
    layoutsDir: 'views/layout'
};

const restaurantsInfo = [
    {place: 'Екатеринбург', address: 'Улица Тургенева 4', image: paths.ekaterinburgSplash, href: 'ekaterinburg'},
    {place: 'Москва', address: 'Багратионовский пр., 12', image: paths.moscowSplash, href: 'moscow'}
];

const slideBarMenu =  [
    {name: 'Супы', image: 'images/menu/soups.jpg', href: 'soups', number: 1},
    {name: 'Закуски', image: 'images/menu/snacks.jpg', href: 'snacks', number: 2},
    {name: 'Блюда с рисом', image: 'images/menu/rice.jpg', href: 'rice', number: 3},
    {name: 'Блюда с мясом', image: 'images/menu/meat.jpg', href: 'meat', number: 4},
    {name: 'Суши и роллы', image: 'https://avatars.mds.yandex.net/get-zen_doc/1101166/pub_5c17d9ba1a81fb00aa155571_5c17da7a8ae9ee00ab73f21b/scale_1200', href: 'sushi', number: 5},
    {name: 'Напитки', image: 'images/menu/drinks.jpg', href: 'drinks', number: 6}
];

const mainHeaderSections = [
    {name: 'О нас', href: '#about'},
    {name: 'Сеть ресторанов', href: '#restaurants'},
    {name: 'Меню', href: '#menu'},
    {name: 'Забронировать', href: 'booking'}
];

const restaurantPageHeaderSections = [
    {name: 'На главную', href: '/'},
    {name: 'О ресторане', href: '#about'},
    {name: 'Забронировать', href: 'booking'},
];

const seats = [
    {place: 'Екатеринбург', address: 'Улица Тургенева 4', seats: 60},
    {place: 'Москва', address: 'Багратионовский пр., 12', seats: 100}
];

module.exports = {
    restaurantsInfo,
    slideBarMenu,
    mongoDBUrl,
    port,
    dbName,
    paths,
    mainHeaderSections,
    restaurantPageHeaderSections,
    seats
};