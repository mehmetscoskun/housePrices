import React from "react";
import formatDate from '../util/formatDate.js';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          done: true
        };
    }

    render () {
        const {index, item} = this.props;
        const itemJson = JSON.parse(item)

        return(
            <tr className= 'textFormat'>
                <td>{index+1}</td>
                <td>{itemJson.country}</td>
                <td>{itemJson.city}</td>
                <td>{itemJson.address}</td>
                <td>{itemJson.lat}</td>
                <td>{itemJson.lng}</td>
                <td>{itemJson.parcel_m2}</td>
                <td>{itemJson.gross_m2}</td>
                <td>{itemJson.net_m2}</td>
                <td>{itemJson.rooms}</td>
                <td>{itemJson.value.toString() + " " + itemJson.currency}</td>
                <td>
                    <a href={itemJson.link}>{itemJson.link}</a>
                </td>
                <td>{formatDate(itemJson.market_date)}</td>
                <td>{itemJson.img_link.length}</td>
            </tr>
        )
    }
}

export default List;