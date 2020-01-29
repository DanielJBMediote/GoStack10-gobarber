const express = require('express')

const server = express();

server.use(express.json());
let i = 0;

const arrProjects = [];

server.use((req, res, next)=> {
  console.time("Request");
  i = i + 1;
  console.log(`Method: ${req.method}\nRequisições feitas até o momento: ${i}`);
  next();
  console.timeEnd("Request");
})

/**
 * Usado para verificar se existe um Projecto com o ID que foi 
 * passado como parametro.
 * 
 * @param {*} req Request (body or params)
 * @param {*} res Response
 * @param {*} next Continue
 */
function checkProjectID(req, res, next) {
  const { id } = req.params;
  
  if (!arrProjects.find(project => project.id === id)) {
    return res.json({ error: "Não existe um projeto com este ID" })
  }
  return next();
}

server.post('/projects', (req, res) => {
  const project = req.body;

  arrProjects.push(project);

  res.json({ message: `O Projeto "${project.title}" foi adicionado com sucesso` });
})

server.post('/projects/:id/task', checkProjectID, (req, res) => {
  const { task } = req.body;
  const { id } = req.params;
  const index = arrProjects.findIndex(project => project.id === id);

  arrProjects[index].task.push(task);
  res.json({ message: "Tarefa adicionada" });
});

server.put('/projects/:id', checkProjectID, (req, res) => {
  const { title, task } = req.body;
  const { id } = req.params;
  const index = arrProjects.findIndex(project => project.id === id);

  arrProjects[index].title = title;
  arrProjects[index].task = task;

  res.json({message: "Projeto atualizado"})
})

server.delete('/projects/:id', (req, res) => {
  
})

server.get('/projects', (req, res) => {
  res.json(arrProjects);
})

server.listen(8080);

