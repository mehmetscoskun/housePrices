'use strict';

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const reducer = require('./reducer')
const app = express();

const port = 3030;

app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
});

class HouseInfoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    load(response, city) {
        let selectHouses = "SELECT * FROM House_list AS H JOIN Images AS I ON H.id_house=I.id_house";
        let condition = ` WHERE H.city='${city}'`
        let semicolon = ";"
        let mysqlCommand = "";

        if(city === undefined) {
            mysqlCommand = selectHouses + semicolon;
        } else {
            mysqlCommand = selectHouses + condition + semicolon;
        }
        
        this.dbConnection.query(mysqlCommand, [], function (err, result, fields) {
            if (err) {
                console.log(err);
                return; 
            } else {
                const results = result.reduce(reducer, [])
                 response
                    .json({results})
                    .status(200);
            }
        });
    }

    create(data) {
        data.forEach(item => {

            const houseListEntries = {
                id_house: Math.random().toString(36).substr(2, 10),
                link: item.link,
                market_date: item.market_date,
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
    
            this.dbConnection.query('INSERT INTO House_list SET ?', houseListEntries, function (error, results, fields) {
                if (error) {throw error};
            });
    
            item.images.forEach(image => {
    
                const imagesEntries = {
                    id_img: Math.random().toString(36).substr(2, 12),
                    id_house: houseListEntries.id_house,
                    img_link: image
                }
    
                this.dbConnection.query('INSERT INTO Images SET ?', imagesEntries, function (error, results, fields) {
                    if (error) {throw error};
                });
            })
        })
    }
}

const dbConnection = mysql.createConnection({
    multipleStatements: true,
        host: 'localhost',
        user: 'todo_app_user',
        password: 'Password123.',
        database: 'house_info',
        port: 3306
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const houseInfo = new HouseInfoModel(dbConnection);

    app.use(express.static(path.join(__dirname, "public")));
    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(bodyParser.json());

    app.get('/houses', (request, response) => {
        houseInfo.load(response, request.query.city);
    });

    app.post('/houses/create', (request, response) => {
        houseInfo.create(request.body);
        response
            .status(200)
    });
});