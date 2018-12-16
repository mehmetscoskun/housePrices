import {configure, observable, action, runInAction} from 'mobx';

configure({enforceActions: 'observed'});

class houseApp {

    @observable output = {
        houses: [],
        status: 'loading'
    }

    @action async listHouses(city) {
        this.output.houses = [];
        this.output.status = 'loading';
        try {
            const data = await this.getItems(city);
            runInAction(() => {
                this.output.houses = data.results;
                this.output.status = 'done';
            })
        } catch (error) {
            runInAction(() => {
                this.output.status = 'error';
            })
        }
    }

    getItems(city) {
        if(city === null) {
            return fetch('/houses')
                    .then(response => response.json());
        } else {
                return fetch(`/houses?city=${city}`)
                    .then(response => response.json());
        }
    }

    @action addNewTodo = (newEntry) => {
        this.createNewItem(newEntry)
    }

    createNewItem(item) {
        return fetch('/houses/create', {
                method: 'POST',
                body: item,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
    }
}

const myHouseApp = new houseApp();

export default myHouseApp;