const express = require('express');

const server = express();

//Usado para passar objetos nas requisições
server.use(express.json());

const gameStore = ['ESO V: Skyrim', 'Fallout', 'Rainbow Siex', 'GTA V']

function checkGameInArray(req, res, next) {
  if (!gameStore[req.params.id]) {
    return res.status(400).json({error: 'Game does not found'});
  }

  return next();
}

function checkIfGameExist(req, res, next) {
  if (gameStore.includes(req.body.name)) {
    return res.status(400).json({error:'Game already exists.'})
  }
  return next();
}

server.post('/games', checkIfGameExist,(req, res) => {
  const { name } = req.body;

  gameStore.push(name);

  res.json(`${name} adicionado com sucesso.`);
});


server.put('/games/:id', checkGameInArray, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  let oldName = gameStore[id];

  gameStore[id] = name;

  res.json(`${oldName} alterado para ${gameStore[id]}`);
});


server.delete('/games/:id', checkGameInArray, (req, res) => {
  const { id } = req.params;

  gameStore.splice(id, 1);

  res.json({message: "Jogo Deletado"})
})

server.get('/games/:id', checkGameInArray, (req, res) => {
  const { id } = req.params;
  
  gameStore.slice(id, 1);

  res.json({ "message": `${gameStore[id]}` })
});


server.get('/games', (req, res) => {
  res.json(gameStore);
});

server.listen(3000);