'use strict';

const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const list_url = 'https://www.fotocasa.es/es/comprar/casas/barcelona-capital/todas-las-zonas/l?latitude=41.3854&longitude=2.1775&combinedLocationIds=724,9,8,232,376,8019,0,0,0';

const mainAddress = 'https://www.fotocasa.es'
const itemSelector = '.re-CardImage-link';
const otherPageLinkSelector = '.sui-PaginationBasic-item:last-child>a';

async function getURL(url, selectors = []) {
    return await request(url)
        .then((htmlContent) => {
            let $ = cheerio.load(htmlContent)
            const myLinks = {};
            selectors.forEach((key, index) => {
                myLinks[`selector${index}`] = new Array();
                $(key).each(function(i, elem) {
                    myLinks[`selector${index}`][i] = mainAddress + $(this).attr('href');
                });
                myLinks[`selector${index}`].join(', ');
            })            
            
            return myLinks
        })
        .catch(error => {
            throw(error)
        })
}

async function getHousesURLsInPages(firstUrl, houseSelector, pageSelector, howManyPages) {
    const allHouseUrl = [];

    let pageUrl = firstUrl;

    for(let i=0; i<howManyPages; i++) {
        await getURL(pageUrl, [houseSelector, pageSelector])
            .then(urls => {
                urls.selector0.forEach(item => allHouseUrl.push(item));
                pageUrl = urls.selector1[0]
            });
    }
    return allHouseUrl;
}

getHousesURLsInPages(list_url, itemSelector, otherPageLinkSelector, 16)
    .then(item => fs.writeFile('./urlOfHouses.json', JSON.stringify(item), err => {
        if (err) throw err;
        console.log('It\'s done!');
    }))


