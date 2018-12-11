'use strict';

const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

let urlOfHouses = JSON.parse(fs.readFileSync('./urlOfHouses.json', 'utf8', (error) => {
    if (error) {
        console.log(error);
    }
}))

const specifications = {
    numberOfRoom: {
        name: '#litRooms',
        extract: (str) => {return str[0]}
    },
    address: {
        name:'#property-title > .property-title',
        extract: (str) => {return str.trim()}
    },
    livingArea: {
        name:'#litSurface',
        extract: (str) => {
            let cutEndIndex = str.indexOf('m²')+2;
            return str.substring(0, cutEndIndex)
        }
    },
    plotSize: {
        name: '#litSurfaceLand',
        extract: (str) => {
            let cutEndIndex = str.indexOf('m²')+2;
            return str.substring(0, cutEndIndex)
        }
    },
    price: {
        name: '#priceContainer',
        extract: (str) => {return str.trim()}
    },
    yearOfConstruction: {
        name: '#ctl00_rptMainFeaturesLeft_ctl03_litFeatures',
        extract: (str) => {return str.trim()}
    }
}

async function getSpecifications(urls, selectors = {}) {
    const houses = [];

    for(let i=0; i<urls.length; i++) {
        await request(urls[i])
            .then((htmlContent) => {
                let $ = cheerio.load(htmlContent)
                const house = {};
                Object.keys(selectors).forEach(key => {
                    house[key] = selectors[key].extract($(selectors[key].name).text())
                })
                return houses.push(house)
            })
            .catch(error => {
                throw(error)
            });
    }

    return houses
}

getSpecifications(urlOfHouses, specifications)
    .then(item => fs.writeFile('./specificationsOfHouses.json', JSON.stringify(item), err => {
        if (err) throw err;
        console.log('It\'s done!')
    }));