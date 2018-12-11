'use strict';

const request = require('request-promise');
const fs = require('fs');
var mysql = require('mysql');

const dataUrl = 'https://api.apify.com/v1/execs/bH3bv3bQx8BS75nyB/results?format=json&simplified=1';

function isValidEntry(item) {
    try {
        return item['link'].substr(0, 8) === 'https://' &&
            item['location']['country'].length > 2 &&
            item['location']['city'].length > 2 &&
            item['location']['address'].length > 10 &&
            typeof item['price']['value'] === 'number' &&
            item['price']['value'] > 1000 &&
            item['price']['currency'].length > 1
    } catch (e) {
        return false
    }
};

async function addCoordinates(item) {
    try {
        const addressForCoordinates = item.location.address.split(' ').join('+');
        const searchUrlForCoordinates = 'https://geocode.xyz/' + addressForCoordinates + '?json=1&auth=999192025592578197411x1407';
        const coordinates = JSON.parse(await request(searchUrlForCoordinates))
        return {
            'lat': Math.floor(Number(coordinates.latt)*100000)/100000,
            'lng': Math.floor(Number(coordinates.longt)*100000)/100000
        }
    } catch (e) {
        console.log(e)
    }
}

async function normalize(data) {
    const validEntries = data.filter(item => isValidEntry(item));

    for (const item of validEntries) {
        item.location.address = item.location.address.trim();
        item.size.parcel_m2 = Number(item.size.parcel_m2.substring(0, item.size.parcel_m2.indexOf('m²')));
        item.size.gross_m2 = Number(item.size.gross_m2.substring(0, item.size.gross_m2.indexOf('m²')));
        item.size.net_m2 = Number(item.size.net_m2.substring(0, item.size.net_m2.indexOf('m²')));
        item.size.rooms = Number(item.size.rooms.substring(0, item.size.rooms.indexOf('h')));
        const newCoordinates = await addCoordinates(item);
        item.location.coordinates.lat = newCoordinates.lat;
        item.location.coordinates.lng = newCoordinates.lng;
        item.description = item.description.trim();
        delete item.url;
    }
    return validEntries;
}

function insertDataIntoDatabase(data) {
    var connection = mysql.createConnection({
        multipleStatements: true,
        host: 'localhost',
        user: 'todo_app_user',
        password: 'Password123.',
        database: 'house_info',
        port: 3306
    });

    connection.connect();

    data.forEach(item => {

        const houseListEntries = {
            id_house: Math.random().toString(36).substr(2, 10),
            link: item.link,
            country: item.location.country,
            city: item.location.city,
            address: item.location.address,
            lat: item.location.coordinates.lat,
            lng: item.location.coordinates.lng,
            parcel_m2: item.size.parcel_m2,
            gross_m2: item.size.gross_m2,
            net_m2: item.size.net_m2,
            rooms: item.size.rooms,
            value: item.price.value,
            currency: item.price.currency,
            description: item.description,
            title: item.title
        };

        connection.query('INSERT INTO House_list SET ?', houseListEntries, function (error, results, fields) {
            if (error) {throw error};
        });

        item.images.forEach(image => {

            const imagesEntries = {
                id_img: Math.random().toString(36).substr(2, 12),
                id_house: houseListEntries.id_house,
                img_link: image
            }

            connection.query('INSERT INTO Images SET ?', imagesEntries, function (error, results, fields) {
                if (error) {throw error};
            });
        })
    })

    connection.end();
}

async function main() {
    try {
        const data = JSON.parse(await request(dataUrl));
        let normalizedData = await normalize(data);
        fs.writeFile('./apify-houseInfo.json', JSON.stringify(normalizedData), err => {
            if (err) throw err;
            console.log('It\'s written!')
        })
        insertDataIntoDatabase(normalizedData);
    } catch (e) {
        console.log(e)
    }
}

main()