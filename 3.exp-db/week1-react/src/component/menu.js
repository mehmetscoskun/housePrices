import React from "react";

class Menu extends React.Component {


    render () {
        const {houses, whichCity, handleCity} = this.props;
        const cityArr = houses.map(item => item.city)
        const cities = cityArr.filter((item, pos) => {
            return cityArr.indexOf(item) === pos;
        })

        const cityLinks = cities.map((item, key)=> 
        <button className = "button-menu" onClick={() => handleCity(item)} key={key}>{item}</button>
        )

        return(
            <div className="dropdown">
                <button className="dropbtn">Choose a city: {whichCity}</button>
                <div className="dropdown-content">
                    <button className = "button-menu" onClick={() => handleCity('All Cities')}>All Cities</button>
                    {cityLinks}
                </div>
            </div>
        )
    }
}

export default Menu;