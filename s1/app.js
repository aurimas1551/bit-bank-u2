const express = require('express');
const cors = require('cors');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const mysql = require('mysql');

const app = express();
const port = 3003;

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db1'
  })

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser());

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

//DB
app.get('/accounts', (req, res) => {
    const sql = `
        SELECT id, name, lastName, sum, blockStatus
        FROM accounts
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/account', (req, res) => {
    const sql = `
        INSERT INTO accounts (id, name, lastName, sum, blockStatus)
        VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.id, req.body.name, req.body.lastName, req.body.sum, req.body.blockStatus], (err) => {
        if (err) throw err;
        res.json({});
    });
});

app.delete('/account/:id', (req, res) => {
    const sql = `
        DELETE FROM accounts
        WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({});
    });
});

app.put('/account/:id', (req, res) => {
    const sql = `
        UPDATE accounts
        SET id = ?, name = ?, lastName = ?, sum = ?, blockStatus = ?
        WHERE id = ?
    `;
    console.log(req.body.id, req.body.name)
    con.query(sql, [req.body.id, req.body.name, req.body.lastName, req.body.sum, req.body.blockStatus, req.params.id], (err) => {
        if (err) throw err;
        res.json({});
    });
});

app.put('/tax', (req, res) => {
    const sql = `
    UPDATE accounts
    SET sum = sum - 5
    `;

    con.query(sql, (err) => {
        if (err) throw err;
        res.json({});
    });
});


// API
/*app.get('/accountsdb', (req, res) => {
    let allData = fs.readFileSync('./data/accounts.json', 'utf8');
    allData = JSON.parse(allData);
    res.json(allData);
});



app.post('/account', (req, res) => {
    let allData = fs.readFileSync('./data/accounts.json', 'utf8');
    allData = JSON.parse(allData);
    const id = uuidv4();
    const data = {
        name: req.body.name,
        lastName: req.body.lastName,
        id: req.body.id,
        sum: req.body.sum,
        blockStatus: req.body.blockStatus
    };
    allData.push(data);
    allData = JSON.stringify(allData);
    fs.writeFileSync('./data/accounts.json', allData, 'utf8');

    res.json({
        message: { text: 'New account is added', 'type': 'ok' }
    });
});


app.delete('/account/:id', (req, res) => {
    let allData = fs.readFileSync('./data/accounts.json', 'utf8');
    allData = JSON.parse(allData);
    let deletedData = allData.filter(d => parseInt(req.params.id) !== d.id);
    deletedData = JSON.stringify(deletedData);
    fs.writeFileSync('./data/accounts.json', deletedData, 'utf8');

    res.json({ message: { text: 'The account was deleted', 'type': 'ok' } });
});

app.put('/account/:id', (req, res) => {
    let allData = fs.readFileSync('./data/accounts.json', 'utf8');
    allData = JSON.parse(allData);
    let editedData = allData.map(d => parseInt(req.params.id) === d.id ? {...d, sum: req.body.sum} : {...d });
    editedData = JSON.stringify(editedData);
    fs.writeFileSync('./data/accounts.json', editedData, 'utf8');

    res.json({ message: { text: 'Account was edited', 'type': 'ok' } });
});
*/

//Login

app.post('/login', (req, res) => {
    const sessionId = uuidv4();

    const sql = `
        UPDATE users
        SET session = ?
        WHERE name = ? AND psw = ?
    `;

    con.query(sql, [sessionId, req.body.name, md5(req.body.password)], (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.cookie('userSession', sessionId);
            res.json({
                status: 'ok',
                name: req.body.name
            });
        } else {
            res.json({
                status: 'error',
            });
        }
    });

});

app.get('/login', (req, res) => {

    const sql = `
        SELECT name
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.cookies.userSession || ''], (err, result) => {
        if (err) throw err;

        if (result.length) {
            res.json({
                status: 'ok',
                name: result[0].name,
            });
        } else {
            res.json({
                status: 'error',
            });
        }

    });

});

app.post('/logout', (req, res) => {
    res.cookie('userSession', '');
    res.json({
        status: 'logout',
    });
});

/*
app.get('/login', (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    const sessionId = req.cookies.userSession;
    const user = req.cookies.userSession ?
        users.find(u => u.session === req.cookies.userSession)
        : null;
    if (user) {
        res.json({
            status: 'ok', 
            name: user.name
        });
    } else {
        res.json({
            status: 'error'
        });
    }
});

app.post('/login', (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    const name = req.body.name;
    const password = md5(req.body.password);
    const user = users.find(u => u.name === name && u.password === password);
    if (user) {
        const sessionId = md5(uuidv4());
        user.session = sessionId;
        fs.writeFileSync('./data/users.json', JSON.stringify(users), 'utf8');
        res.cookie('userSession', sessionId);
        res.json({
            status: 'ok', 
            name: user.name
        });
    } else {
        res.json({
            status: 'error'
        });
    }
    
});

app.post('/logout', (req, res) => {
    res.cookie('userSession', '');
    res.json({
        status: 'logout',
    });
});
*/



app.listen(port, () => {
    console.log(`Server is on port number: ${port}`);
});