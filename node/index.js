const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

// Middleware para processar o corpo da requisição
app.use(express.urlencoded({ extended: true }));

// Criação da tabela 'people' se ela não existir
const sqlCreateTable = `
    CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
`;

connection.query(sqlCreateTable, (err) => {
    if (err) throw err;
    console.log('Tabela "people" criada ou já existe.');
});

// Rota para exibir e inserir registros
app.get('/', (req, res) => {
    const sqlSelect = 'SELECT * FROM people';

    connection.query(sqlSelect, (err, results) => {
        if (err) throw err;

        let responseHtml = `
            <html>
            <head>
                <title>Pessoas</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body class="bg-light">
                <div class="container">
                    <h1 class="mt-5 text-center">Full Cycle Rocks!</h1>
                    <form action="/" method="POST" class="mt-4">
                        <div class="input-group">
                            <input type="text" name="name" class="form-control" placeholder="Nome" required>
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="submit">Adicionar</button>
                            </div>
                        </div>
                    </form>
                    <h2 class="mt-5">Lista de Pessoas</h2>
                    <ul class="list-group mt-3">`;

        results.forEach(person => {
            responseHtml += `<li class="list-group-item">${person.name}</li>`;
        });
        responseHtml += '</ul></div></body></html>';

        res.send(responseHtml);
    });
});

// Rota para lidar com o formulário de inserção
app.post('/', (req, res) => {
    const name = req.body.name;
    const sqlInsert = `INSERT INTO people(name) VALUES(?)`;

    connection.query(sqlInsert, [name], (err, result) => {
        if (err) throw err;
        console.log('Registro inserido: ' + result.affectedRows);
        
        // Redirecionar para a página principal após a inserção
        res.redirect('/');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log('Rodando na porta: ' + port);
});
