import React from "react";

class Add extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            jsonFile: ''
        }
        this.handleJsonFile = this.handleJsonFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleJsonFile (event) {
      this.setState({
          jsonFile: event.target.value
      })
    }

    handleSubmit (event) {
        // event.preventDefault();
        this.setState({
            jsonFile: '',
        })
        event.target.reset()     
    }

    render () {
        const {addNewTodo} = this.props;
        const jsonFileFormat = {"link":"string - not null","location":
        {"country":"string - not null","city":"string - not null","address":"string - not null","coordinates":{"lat":"number","lng":"number"}},"size":{"parcel_m2":"number","gross_m2":"number","net_m2":"number - not null","rooms":"number - not null"},"price":{"value":"number - not null","currency":"string - not null"},"description":"string","title":"string","images":"[string(url), string(url)]"};

        return(
            <div className="addElement">
                <div className="entryFormat">
                    <h3>Please make sure that</h3>
                    <ul>
                        <li>
                            Your JSON file must be an array.
                        </li>
                        <li>
                            Every element in the array must be an object.
                        </li>
                        <li>
                            Every object must be in below format:
                        </li>
                        <pre>{JSON.stringify(jsonFileFormat, undefined, 2)}</pre>
                    </ul>
                </div>
                
                <form onSubmit={this.handleSubmit} className="inputForm">
                    <textarea className="inputTodo" type="text" onChange={this.handleJsonFile} placeholder=" Your JSON File"/> 
                    <button className= "button" type="submit" onClick={()=>addNewTodo(this.state.jsonFile)}>Add</button>
                </form>
            </div>
        )
    }
}

export default Add;