const pages = {
    mainPage: {
        url: '/',
        title:'K-FOOD',
        layout: 'layout.hbs',
        bodyMarkup: 'main.hbs',
        description: 'Сеть ресторанов "K-FOOD" уже много лет радует и знакомит своих посетителей с завораживающей культурой Кореи.\n' +
            'Кухня являет важной точкой на пути к пониманию многовековых традиций и обычаев корейского народа.\n' +
            'Каждый уголок наших ресторанов пропитан теплом и уютом.\n' +
            'Большой выбор блюд и их первоклассное качество порадует каждого гостя.\n' +
            'Испробуйте все: от яблок в карамели до кимчи и окунитесь в неповторимую атмосферу корейского уюта',

    },
    ekaterinburg: {
        url: '/ekaterinburg',
        title: 'K-FOOD Екатеринбург',
        layout: 'layout.hbs',
        bodyMarkup: 'restaurantPage.hbs',
        description: 'Ресторан удачно расположен в самом центре города, что позволит гостям увидеть, ' +
            'а постоянным жителям напомнить то, как красив наш город. ' +
            'Доброжелательные официанты и лучшие повора погрузят вас в атмосферу спокойствия и умиритворения',
    },
    moscow: {
        url: '/moscow',
        title: 'K-FOOD Москва',
        layout: 'layout.hbs',
        bodyMarkup: 'restaurantPage.hbs',
        description: 'Кухня Кореи – всё ещё экзотика. К ней стоит внимательно присмотреться. ' +
            'И K-FOOD в Москве дает вам эту возможность! Дорого отделанный, с плюшевыми диванами, хрустальными люстрами,' +
            ' плазмами на стенах ресторан с вышколенным персоналом поможет вам прочувствовать волшебный быт и корейский менталитет.'
    },
    booking: {
        url: '/booking',
        title: 'K-FOOD Бронирование',
        layout: 'bookingLayout.hbs',
        bodyMarkup: 'bookingBody.hbs'
    },
    doBooking: {
        url: '/doBooking',
    },
    undoBooking: {
        url: '/undoBooking',
    }
};

module.exports = {
    pages
};