function validElem(item) {
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
}

module.exports = validElem;