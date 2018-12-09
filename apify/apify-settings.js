// Custom ID            : fotocasa
// Start URLs           : https://www.fotocasa.es/es/comprar/casas/barcelona-capital/todas-las-zonas/l?sortType=publicationDate&latitude=41.3854&longitude=2.17754&combinedLocationIds=724,9,8,232,376,8019,0,0,0&gridType=3
// Pseudo-URLs          : houses     https://www.fotocasa.es/vivienda/barcelona-capital/[.*]-[\d+]?RowGrid=[\d+]&tti=1&opi=300
// Pseudo-URLs          : pages      https://www.fotocasa.es/es/comprar/casas/barcelona-capital/todas-las-zonas/l/[\d+]?sortType=publicationDate&latitude=41.3854&longitude=2.17754&combinedLocationIds=724,9,8,232,376,8019,0,0,0&gridType=3
// Clickable elements   : .re-Card-primary > a[href] , .sui-PaginationBasic-item > a[href]

function pageFunction(context) {
    var $ = context.jQuery;
    var jsonLdStr = 'script[type="application/ld+json"]';
    var nextLineRegEx = /\r?\n|\r/g;

    if (context.request.label === "houses") {
        context.skipLinks();
        if ($(jsonLdStr).length) {
            var jsonLdData = JSON.parse($(jsonLdStr).text().replace(nextLineRegEx, ''));
            return {
                "link": context.request.url,
                "location": {
                    "country": "Spain",
                    "city": context.request.url.split('/')[4],
                    "address": $('#property-title > .property-title').text(),
                    "coordinates": {
                        "lat": "",
                        "lng": ""
                    }
                },
                "size": {
                    "parcel_m2": $('#litSurfaceLand').text(),
                    "gross_m2": "",
                    "net_m2": $('#litSurface').text(),
                    "rooms": $('#litRooms').text()
                },
                "price": {
                    "value": Number(jsonLdData.offers.price),
                    "currency": jsonLdData.offers.priceCurrency
                },
                "description": $('#property-title > .property-title').text(),
                "title": jsonLdData.name,
                "images": Array.from($('#containerSlider > li > img')).map(function (img) {
                    return img.src
                })
            };
        }
    } else {
        context.skipOutput();
    }
}