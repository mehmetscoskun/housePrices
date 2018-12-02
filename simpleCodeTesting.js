// const cheerio = require('cheerio');
// const request = require('request-promise');

// const url = 'https://www.fotocasa.es/vivienda/barcelona-capital/aire-acondicionado-calefaccion-parking-terraza-trastero-ascensor-piscina-amueblado-television-piscina-sant-gervasi-i-la-bonanova-139568183?RowGrid=4&tti=1&opi=300';
// const key = '#ctl00_rptMainFeaturesLeft_ctl03_litFeatures < li';
// const anotherOpt = {
//     withDomLvl1: false,
//     normalizeWhitespace: true,
//     xmlMode: true,
//     decodeEntities: true
// }

// request(url)
//         .then((htmlContent) => {
//             let $ = cheerio.load(htmlContent)
//             // $(key).each(function(i, elem) {
//             //     console.log($(this).attr('class'))
//             // })
//             console.log($(key).text())
            
//         })


// let str = '\n                Chalet en Sarrià - Sant Gervasi - Sant Gervasi I La Bonanova / Sant Gervasi i la Bonanova,  Barcelona Capital\n            '
// let dash = str.indexOf('-');
// let slash = str.indexOf('/');
// let cutStartIndex = Math.min(dash, slash)+2;
// let cutEndIndex = str.indexOf('Barcelona')+9
// console.log(str.substring(cutStartIndex, cutEndIndex))

// let str = '870 m²'
// let a = str.indexOf('m²')
// console.log(str.substring(0, a-2))


console.log(a.length)