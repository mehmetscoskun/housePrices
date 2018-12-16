const faker = require('faker');
const fs = require('fs');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const generateHouse = function () {
    return {
        "link": faker.internet.url(),
        "market_date": formatDate(faker.date.between('2018-10-01', '2018-12-15')),
        "location": {
            "country": "Germany",
            "city": "Berlin",
            "address": faker.address.streetAddress(),
            "coordinates": {
                "lat": Number(faker.address.latitude()),
                "lng": Number(faker.address.longitude())
            }
        },
        "size": {
            "parcel_m2": Math.floor(Math.random() * 100) + 1000,
            "gross_m2": Math.floor(Math.random() * 100) + 200,
            "net_m2": Math.floor(Math.random() * 100) + 100,
            "rooms": Math.floor(Math.random() * 5)+2
        },
        "price": {
            "value": Math.floor(Math.random() * 100000) + 100000,
            "currency": "EUR"
        },
        "description": "",
        "title": "",
        "images": [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()]
    }
}
const generator = function (n) {
    var houses = []
    for (let i = 0; i < n; i++) {
        houses.push(generateHouse())
    }
    return fs.writeFile('./src/util/fakeHouses.json', JSON.stringify(houses), err => {
        if (err) throw err;
        console.log('It\'s done!')
    })
}

generator(15)