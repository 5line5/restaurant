const express = require('express');
const hbs = require('hbs');
const expressHbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
const constants = require('./consts');
const livereload = require('livereload');
const bodyParser = require('body-parser');
const connectLivereload = require('connect-livereload');
const randomizer = require('./utils/randomizer');
const pagesWorker = require('./utils/pageWorker');


const app = express();
app.use(bodyParser.json());
app.engine('hbs', expressHbs({
    layoutsDir: constants.paths.layoutsDir,
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(constants.paths.publicDir));
hbs.registerPartials(constants.paths.viewsDir);
app.use(express.static(constants.paths.publicDir));

const mongoClient = new MongoClient(constants.mongoDBUrl, { useNewUrlParser: true });

mongoClient.connect(function (err, client) {
    function fillDbs() {
        app.locals.seats.remove();
        app.locals.seats.insertMany(constants.seats);
    }

    if(err) return console.log(err);
    app.locals.seats = client.db(constants.dbName).collection('seats');
    app.locals.booking = client.db(constants.dbName).collection('booking');
    fillDbs();
    app.listen(constants.port);
});

app.get(pagesWorker.pages.mainPage.url, function (req, res) {
    res.render(pagesWorker.pages.mainPage.bodyMarkup,
        {
            layout: pagesWorker.pages.mainPage.layout,
            title: pagesWorker.pages.mainPage.title,
            sections: constants.mainHeaderSections,
            background: constants.paths.homepageSplash,
            logo: constants.paths.logo,
            description: pagesWorker.pages.mainPage.description,
            restaurants: constants.restaurantsInfo,
            items: constants.slideBarMenu
        });
});

app.get(pagesWorker.pages.ekaterinburg.url, function (req, res) {
    res.render(pagesWorker.pages.ekaterinburg.bodyMarkup,
        {
            layout: pagesWorker.pages.ekaterinburg.layout,
            title: pagesWorker.pages.ekaterinburg.title,
            sections: constants.restaurantPageHeaderSections,
            background: constants.paths.ekaterinburgSplash,
            logo: constants.paths.logo,
            description: pagesWorker.pages.ekaterinburg.description,
        });
});

app.get(pagesWorker.pages.moscow.url, function (req, res) {
    res.render(pagesWorker.pages.moscow.bodyMarkup,
        {
            layout: pagesWorker.pages.moscow.layout,
            title: pagesWorker.pages.moscow.title,
            sections: constants.restaurantPageHeaderSections,
            background: constants.paths.moscowSplash,
            logo: constants.paths.logo,
            description: pagesWorker.pages.moscow.description,
        });
});

app.get(pagesWorker.pages.booking.url, function (req, res) {
    res.render(pagesWorker.pages.booking.bodyMarkup,
        {
            layout: pagesWorker.pages.booking.layout,
            title: pagesWorker.pages.booking.title,
            sections: [{name: 'На главную', href: '/'}],
            background: constants.paths.homepageSplash,
            logo: constants.paths.logo,
            options: constants.restaurantsInfo
        });
});

app.post(pagesWorker.pages.doBooking.url, function (req, res) {
    const restaurant = req.body.place.split('-');
    const city = restaurant[0];
    const address = restaurant[1];
    const date = req.body.date;
    const phone = req.body.phone;

    app.locals.seats.findOne({place: city, address: address})
        .then(firstResult => {
            app.locals.booking.find({place: city, address: address, date}).toArray((err, result) => {
                if (err) throw err;
                if (firstResult.seats > result.length) {
                    const code = randomizer.makeRandomId();
                    app.locals.booking.insertOne({place: city, address: address, date, phone, code});
                    res.json({status: 'ok', code});
                }
                else
                    res.json({error: 'На этот день мест нет'});
            })
        });

});

app.post(pagesWorker.pages.undoBooking.url, function (req, res) {
    const code = req.body.code;

    app.locals.booking.removeOne({code}, function (err, obj) {
        if (err)
            res.json({status: 'error', info: 'Бронь в данный момент снять нельзя. Попробуйте позже или позвоните на ресепшн'});
        else if (obj.deletedCount === 0)
            res.json({status: 'ok', info: `Брони под намером ${code} не существует.`});
        else
            res.json({status:'ok', info: 'Ваша бронь снята. Спасибо, что предупредили нас.'});
    });
});

