import React from "react";

class Menu extends React.Component {

    render () {
        const {houses} = this.props;
        const cityArr = houses.map(item => item.city)
        const cities = cityArr.filter((item, pos) => {
            return cityArr.indexOf(item) === pos;
        })
        const basicLink = "http://localhost:3000/houses?city="

        const cityLinks = cities.map((item, key)=> 
        <a href={basicLink+item} key={key}>{item}</a>
        )

        return(
            <div className="dropdown">
                <button className="dropbtn">Dropdown</button>
                <div className="dropdown-content">
                    <a href="http://localhost:3000/houses">All Houses</a>
                    {cityLinks}
                </div>
            </div>
        )
    }
}

export default Menu;