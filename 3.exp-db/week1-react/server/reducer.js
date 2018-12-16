Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

function reducer(accumulator, currentValue){
    const idOfHouses = accumulator.map(item => item.id_house)
    if(idOfHouses.includes(currentValue.id_house)){
        accumulator.forEach(item => {
            if(item.id_house === currentValue.id_house){
                const imgLinks = Array.of(item.img_link, currentValue.img_link); 
                item.img_link = imgLinks.flat();
            }
        })
    } else {
        accumulator.push(currentValue)
    }
    return accumulator
}

module.exports = reducer;