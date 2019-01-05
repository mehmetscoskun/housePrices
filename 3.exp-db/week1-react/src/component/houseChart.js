import React from "react";
import Chart from "chart.js";
import "chartjs-plugin-annotation";
import newDate from '../util/formatDate.js';

class houseChart extends React.Component {

    componentWillUpdate(nextProps) {

        const node = this.node;

        const {houses} = nextProps;

        const rawData = houses.reduce((accu, item) => {
            if (item.market_date in accu) {
                accu[item.market_date] = {
                    total: (item.value / item.net_m2) + accu[item.market_date]['total'],
                    num: accu[item.market_date].num + 1
                };
            } else {
                accu[item.market_date] = {
                    total: item.value / item.net_m2,
                    num: 1
                };
            }

            return accu;
        }, {})

        const avgPrices = [];

        Object.keys(rawData).forEach(i => {
            let property = rawData[i];
            avgPrices.push({
                date: i,
                avg: property.total / property.num
            })
        })

        avgPrices.sort((a, b) => {
            return new Date(a.date) - new Date(b.date)
        });

        var myChart = new Chart(node, {
            type: "line",
            data: {
                labels: avgPrices.map(i => newDate(i.date)),
                datasets: [{
                    label: "average price per m2",
                    data: avgPrices.map(i => i.avg),
                    backgroundColor: ["rgba(255, 159, 64, 1)"],
                    borderColor: ["rgba(54, 162, 235, 1)"]
                }]
            }
        });
    }

    render() {

        return ( 
            <div className = "chart" >

                <canvas 
                    style = {{
                        width: 800,
                        height: 300
                    }}
                    ref = {
                        node => (this.node = node)
                    }
            />

            </div>
        )
    }
}

export default houseChart;