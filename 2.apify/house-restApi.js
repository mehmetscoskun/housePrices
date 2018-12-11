'use strict';

const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();


const todoUser = 2;
const port = 3000;

app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
});

class HouseInfoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    load() {
        const selectHouses = "SELECT * FROM House_list AS H JOIN Images AS I ON H.id_house=I.id_house";
        const aaa = " WHERE H.city=? ORDER BY ? ?;"
        
        this.dbConnection.query(selectHouses, [], function (err, results, fields) {
            if (err) {
                console.log(err);
                return; }
            // } else {
            //     let todoDb = {
            //         todoItems: results[0],
            //         todoItemTag: results[1],
            //         tags: results[2]
            //     }
            //     let readableStr = `const todoDb = ${JSON.stringify(todoDb)}`;
            //     fs.writeFile(__dirname + '/public/todos.json', readableStr, (error) => {
            //         if (error) {
            //             console.log(error);
            //         }
            //     });
            //     return;
            // }
        });
    }

    create(data) {
        data.forEach(item => {

            const houseListEntries = {
                id_house: Math.random().toString(36).substr(2, 10),
                link: item.link,
                country: item.location.country,
                city: item.location.city,
                address: item.location.address,
                lat: item.location.coordinates.lat,
                lng: item.location.coordinates.lng,
                parcel_m2: item.size.parcel_m2,
                gross_m2: item.size.gross_m2,
                net_m2: item.size.net_m2,
                rooms: item.size.rooms,
                value: item.price.value,
                currency: item.price.currency,
                description: item.description,
                title: item.title
            };
    
            this.dbConnection.query('INSERT INTO House_list SET ?', houseListEntries, function (error, results, fields) {
                if (error) {throw error};
            });
    
            item.images.forEach(image => {
    
                const imagesEntries = {
                    id_img: Math.random().toString(36).substr(2, 12),
                    id_house: houseListEntries.id_house,
                    img_link: image
                }
    
                this.dbConnection.query('INSERT INTO Images SET ?', imagesEntries, function (error, results, fields) {
                    if (error) {throw error};
                });
            })
        })
    }

    // createTags(description) {
    //     const newItem = {
    //         "description": description,
    //     };
    //     this.dbConnection.query('INSERT INTO tags SET ?', newItem, function (err, results, fields) {
    //         if (err) {
    //             throw err;
    //             return;
    //         }
    //     })
    // }

    // update(description, id, user) {
    //     const updateRow = [description, id, user];
    //     this.dbConnection.query('UPDATE todo_items SET text = ? WHERE id = ? AND user_id = ?', updateRow, function (err, results, fields) {
    //         if (err) {
    //             throw err;
    //             return;
    //         }
    //     })
    // }

    // delete(id, user) {
    //     this.dbConnection.query('DELETE FROM todo_items WHERE id = ? AND user_id = ?', [id, user], function (error, results, fields) {
    //         if (error) {
    //             throw error;
    //         }

    //     })
    // }

    // tagTodoItem(todoItemId, tagId, user) {
    //     const tag = [tagId, todoItemId, user];

    //     this.dbConnection.query('INSERT INTO todo_item_tag(todo_item_id, tag_id) SELECT id, ? FROM todo_items WHERE id = ? AND user_id = ?', tag, function (err, results, fields) {
    //         if (err) {
    //             throw err;
    //             return;
    //         }
    //     })
    // }

    // untagTodoItem(todoItemId, tagId, user) {
    //     const tag = [tagId, todoItemId, user];

    //     this.dbConnection.query('DELETE todo_item_tag FROM todo_item_tag JOIN todo_items ON todo_item_tag.todo_item_id = todo_items.id WHERE todo_item_tag.tag_id = ? AND todo_item_tag.todo_item_id = ? AND todo_items.user_id = ?', tag, function (err, results, fields) {
    //         if (err) {
    //             throw err;
    //             return;
    //         }
    //     })
    // }

    // markCompleted(id, user) {
    //     this.dbConnection.query('UPDATE todo_items SET is_completed = 1 WHERE id = ? AND user_id = ?', [id, user], function (err, results, fields) {
    //         if (err) {
    //             throw err;
    //             return;
    //         }
    //     })
    // }
}

const dbConnection = mysql.createConnection({
    multipleStatements: true,
        host: 'localhost',
        user: 'todo_app_user',
        password: 'Password123.',
        database: 'house_info',
        port: 3306
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const houseInfo = new HouseInfoModel(dbConnection);

    app.use(express.static(path.join(__dirname, "public")));
    app.use(bodyParser.urlencoded({
        extended: false
    }))

    app.get('/houses', (request, response) => {
        houseInfo.load(todoUser);
        response
            .status(200)
            .sendFile(path.join(__dirname + "/index.html"))
    });

    app.post('/todos', (request, response) => {
        todoModel.create(request.body.task, todoUser);
        todoModel.load(todoUser);
        response
            .status(200)
            .sendFile(path.join(__dirname + "/index.html"))
    });

    // app.post('/tags', (request, response) => {
    //     todoModel.createTags(request.body.tags);
    //     todoModel.load(todoUser);
    //     response
    //         .status(200)
    //         .sendFile(path.join(__dirname + "/index.html"))
    // });

    // app.post('/todos/:id(\\d+)/:tagid(\\d+)', (request, response) => {
    //     todoModel.tagTodoItem(request.params.id, request.params.tagid, todoUser);
    //     todoModel.load(todoUser);
    //     response
    //         .status(200)
    //         .sendFile(path.join(__dirname + "/index.html"))
    // });

    // app.delete('/todos/:id(\\d+)/:tagid(\\d+)', (request, response) => {
    //     todoModel.untagTodoItem(request.params.id, request.params.tagid, todoUser);
    //     todoModel.load(todoUser);
    //     response
    //         .status(200)
    //         .sendFile(path.join(__dirname + "/index.html"))
    // });

    // app.get('/todos/:id(\\d+)', (request, response) => {
    //     todoModel.delete(request.params.id, todoUser);
    //     todoModel.load(todoUser);
    //     response
    //         .status(200)
    //         .sendFile(path.join(__dirname + "/index.html"))
    // });

    // app.put('/todos/:id(\\d+)', (request, response) => {
    //     todoModel.update(request.body.task, request.params.id, todoUser);
    //     todoModel.load(todoUser);
    //     response
    //         .status(200)
    //         .sendFile(path.join(__dirname + "/index.html"))
    // });

    // app.put('/todos/:id(\\d+)/done', (request, response) => {
    //     todoModel.markCompleted(request.params.id, todoUser);
    //     todoModel.load(todoUser);
    //     response
    //         .status(200)
    //         .sendFile(path.join(__dirname + "/index.html"))
    // });
});