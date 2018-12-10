const a = 'Piso en Barcelona ,Camp D En Grassot I Gràcia Nova / El Baix Guinardó,  Barcelona Capital'
const addressForCoordinates = a.split(' ').join('+');
const searchUrlForCoordinates = 'https://geocode.xyz/' + addressForCoordinates + '?json=1&auth=999192025592578197411x1407';
console.log(searchUrlForCoordinates);