import React, { Component } from 'react';
import './App.css';
import {inject, observer} from 'mobx-react';
// import {BrowserRouter, Route, Switch} from 'react-router-dom';
import List from "./component/list.js";
import Add from "./component/add";
// import Home from "./component/home";
import Menu from "./component/menu";
import Housechart from "./component/houseChart";

@inject('myHouseApp')
@observer

class App extends Component {

  constructor(props) {
    super(props);
    props.myHouseApp.listHouses();
    this.state = {
      checkStatus: true,
      whichCity: 'All Cities'
    }
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCity = this.handleCity.bind(this);
  }

  handleCheck() {
    this.setState({
      checkStatus: !this.state.checkStatus
    })
  }

  handleCity(city) {
    this.setState({
      whichCity: city
    })
  }

  render() {
    const {myHouseApp} = this.props;
    const allHouses = myHouseApp.output.houses
    const isAllCities = this.state.whichCity === 'All Cities';

    const listedCities = isAllCities ? allHouses : allHouses.filter(item => item.city === this.state.whichCity)

    const elements = listedCities.map((item, key)=> 
      <List key={key} index={key} item={JSON.stringify(item)} />
    )
      
    return (
      
      <div className="App">
        <h1>My House List</h1>

        <Menu 
          houses={myHouseApp.output.houses}
          whichCity= {this.state.whichCity}
          handleCity = {this.handleCity}
        />

        <div className="tabs">
          <div className="getFrame tab">
            <input type="radio" id="tab-1" name="tab-group-1" onChange={()=>this.handleCheck} defaultChecked={this.state.checkStatus}/>
            <label htmlFor="tab-1" className="head">GET</label>
            
            <div className="get content">
              <table>
                <thead>
                    <tr>
                        <th>no</th>
                        <th>country</th>
                        <th>city</th>
                        <th>address</th>
                        <th>latitude</th>
                        <th>longtitude</th>
                        <th>parcel_m2</th>
                        <th>gross_m2</th>
                        <th>net_m2</th>
                        <th>rooms</th>
                        <th>price</th>
                        <th>link</th>
                        <th>market date</th>
                        <th>images</th>
                    </tr>
                </thead>
                <tbody>
                  {elements}
                </tbody>
              </table>

            </div>
          </div>

          <div className="postFrame tab">
            <input type="radio" id="tab-2" name="tab-group-1" onChange={()=>this.handleCheck} defaultChecked={!this.state.checkStatus}/>
            <label htmlFor="tab-2" className="head">POST</label>
            
            <div className="post content">
              <Add
                addNewTodo = {myHouseApp.addNewTodo}
              />
            </div>
          </div>

          <div className="postFrame tab">
            <input type="radio" id="tab-3" name="tab-group-1" onChange={()=>this.handleCheck} defaultChecked={!this.state.checkStatus}/>
            <label htmlFor="tab-3" className="head">Graphics</label>
            
            <div className="average content">
              <Housechart houses={listedCities} />
            </div>
          </div>
        </div>  
      </div>
    );
  }
}

export default App;