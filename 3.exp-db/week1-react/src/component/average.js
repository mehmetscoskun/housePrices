import React from "react";
// import formatDate from '../util/formatDate.js';

class Avg extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            days: '',
            afterTheDate: ''
        }
        this.handleDays = this.handleDays.bind(this);
        this.calculate = this.calculate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleDays (event) {
      this.setState({
          days: event.target.value
      })
    }

    calculate(){
        // Date.prototype.addDays = function(days) {
        //     var date = new Date(this.valueOf());
        //     date.setDate(date.getDate() + days);
        //     return date;
        // };

        // const dayNumber = Number(this.state.days)
        // const today = new Date();

        this.setState({
            afterTheDate: ''
        })

        // console.log(this.state.afterTheDate);
    }

    handleSubmit (event) {
        event.preventDefault();
        this.setState({
            days: '',
            afterTheDate: ''
        })
        event.target.reset()     
    }

    render () {
        const {houses} = this.props;
        const cityArr = houses.map(item => item.city)
        const cities = cityArr.filter((item, pos) => {
            return cityArr.indexOf(item) === pos;
        })

        const cityTh = cities.map((item, key)=> 
        <th key={key}>{item}</th>
        )

        const prices = cities.map(item => {
            const specificCities = houses.filter(i => i.city === item)
            let total = 0;
            specificCities.forEach(item => total=total+item.value)
            let averagePrice = Math.floor(total/specificCities.length)
            var money = averagePrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
            return "€ " + money;
        })

        const priceTd = prices.map((item, key)=> 
        <td key={key}>{item}</td>
        )

        return(
            <div className = "average">
                <div>
                    Take the average of last
                    <form onSubmit={this.handleSubmit}>
                        <input className="inputTodo" type="text" onChange={this.handleDays} placeholder=""/>
                        <button className= "inpButton" type="submit" onClick={()=>this.calculate()}>calculate</button>
                    </form>
                </div>

                <table>
                    <thead>
                        <tr>
                            {cityTh}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className= 'textFormat'>
                            {priceTd}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Avg;