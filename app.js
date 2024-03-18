// Creando metodos http puerto 300

const express = require('express');
const app = express();
const knex = require('knex');
const config = require('./knexfile');
const db = knex(config);


app.use(express.json());

app.get('/',(req, res)=>{
    res.send('hola mundo');
});

app.get('/usuarios', (req, res)=>{
    db.select('*')
  .from('usuarios')
  .then((rows) => {
    res.send(rows)
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  })


   
});

app.get('/usuarios/:id', async (req, res) =>{
    const userId = req.params.id;
    try{
        const user = await db.select('*').from('usuarios').where({id : userId}).first();
        console.log("aqui ", user)
        if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
    } catch (error){
        console.error(error)
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
    
})

const port = process.env.port || 3000;
app.listen(port, () => console.log(`escuchando en puerto ${port}...`));


// Importa la biblioteca Knex



// Configuración de la conexión a la base de datos MySQL




// Ejemplo de consulta SELECT utilizando Knex


  app.post('/usuarios', (req, res) => {
    const { nombre, apellido, correo, password, edad } = req.body;
  
    db('usuarios')
      .insert({ nombre, apellido, correo, password, edad })
      .then(() => {
        res.status(201).json({ message: 'Usuario creado exitosamente' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
      });
  });

//   app.delete('/usuarios/:id', (req, res) => {
//     const userId = req.params.id;
  
//     db('usuarios').where('id', '=', userId).del()
//   .then(() => console.log('Datos eliminados'))
//   .catch(error => console.error(error))

//   });

  app.delete('/usuarios/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const deletedUser = await 
      db('usuarios')
      .where('id','=',userId)
      .del();
      if (deletedUser) {
        res.json({ message: 'Usuario eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  });



  
  
  

