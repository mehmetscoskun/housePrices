import React, { Component } from 'react';
import './App.css';
import {inject, observer} from 'mobx-react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import List from "./component/list.js";
import Add from "./component/add";
import Home from "./component/home";
import Menu from "./component/menu";
import Avg from "./component/average";

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/houses' component={Houses}/>
          <Route path='/' component={Home}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

@inject('myHouseApp')
@observer

class Houses extends Component {

  constructor(props) {
    super(props);
    const queries = new URLSearchParams(this.props.location.search)
    const city = queries.get('city');
    props.myHouseApp.listHouses(city);
    this.state = {
      checkStatus: true
    }
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck() {
    this.setState({
      checkStatus: !this.state.checkStatus
    })
  }

  render() {
    const {myHouseApp} = this.props;

    const elements = myHouseApp.output.houses.map((item, key)=> 
      <List key={key} index={key} item={JSON.stringify(item)} />
    )
      
    return (
      
      <div className="App">
        <h1>My House List</h1>

        <Menu houses={myHouseApp.output.houses} />

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
            <label htmlFor="tab-3" className="head">AVG</label>
            
            <div className="average content">
              <Avg houses={myHouseApp.output.houses} />
            </div>
          </div>
        </div>  
      </div>
    );
  }
}

export default App;