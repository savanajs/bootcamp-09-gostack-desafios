const express = require('express');
const server = express();

// Para ler o body json de uma reqyuisição
server.use(express.json());

const projects = [];
let requestsCount = 0;

function getIndex(list, key, value){

    let index = null;

    for(let i in list){
        if(parseInt(list[i][key]) === parseInt(value)){
            index = i;
            break;
        }
    }

    return index;

}

/*
Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto 
nos parâmetros da URL que verifica se o projeto com aquele ID existe. 
Se não existir retorne um erro, caso contrário permita a requisição 
continuar normalmente;
*/

function checkProjectInArray(req, res, next){

    const { id } = req.params;
    const index = getIndex(projects, 'id', id);

    if (index == null) return res.status(401).json({error: 'Project not found'});

    req.project = projects[index];

    return next();

}

/*
Middleware global chamado em todas requisições que imprime 
(console.log) uma contagem de quantas requisições foram feitas na aplicação até então;
*/

server.use((req, res, next) => {

    console.log(`Total requests: ${++requestsCount}`)

    next();

});

server.get('/', (req, res) => {

    // return res.send("<h1>Ok</h1>");
    return res.json({ok: true});

});

server.get('/projects', (req, res) => {

    return res.json(projects);

});

server.post('/projects', (req, res) => {

    const project = req.body;

    projects.push(project);

    return res.json(project);

});

server.put('/projects/:id', checkProjectInArray, (req, res) => {

    const project = req.body;
    const { id } = req.params;
    const index = getIndex(projects, 'id', id);

    projects[index].title = project.title;

    return res.json(projects);

});

server.delete('/projects/:id', checkProjectInArray, (req, res) => {

    const { id } = req.params;
    const index = getIndex(projects, 'id', id);

    projects.splice(index, 1);

    return res.json(projects);

});

server.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {

    const project = req.body;
    const { id } = req.params;
    const index = getIndex(projects, 'id', id);

    projects[index].tasks.push(project.title);

    return res.json(projects[index]);

});

server.listen(3000);