// Importar la biblioteca Express para crear y configurar el servidor web.
const express = require('express');
const app = express();

// Importar la biblioteca "mysql" para interactuar con la base de datos MySQL.
const mysql = require('mysql');

// Importar la configuración de la base de datos desde el archivo "config.json".
const config = require('./config.json');

// Utilizar el middleware "express.json()" para analizar solicitudes con formato JSON.
app.use(express.json());


// PERSONAS:
// Importar el controlador de Persona.
const PersonaController = require('./controllers/personacontroller');

// Rutas CRUD básicas para "Persona".
app.get('/personas/:dni', PersonaController.getPersonaByDNI);   // Obtener persona por si DNI.

app.post('/personas', PersonaController.createPersona); // Crear una nueva persona.

app.get('/personas', PersonaController.getAllPersonas);   // Obtener lista de todas las personas.

app.put('/personas/:dni', PersonaController.updatePersona); // Actualizar una persona por su DNI.

app.delete('/personas/:dni', PersonaController.deletePersona); // Eliminar una persona por su DNI.

//EXTRA PERSONAS:
app.get('/personas/apellido/:apellido', PersonaController.getPersonaByApellido); // Obtener persona por apellido.



// USUARIOS:
// Importar el controlador de Usuario.
const UsuarioController = require('./controllers/usuariocontroller');

// Rutas para operaciones CRUD en la entidad 'Usuario'.
app.get('/usuarios/:nickname', UsuarioController.getUsuarioByNickname); // Obtener un usuario por su nickname.

app.post('/usuarios', UsuarioController.createUsuario); // Crear un nuevo usuario.

app.get('/usuarios', UsuarioController.getAllUsuarios); // Obtener lista de todos los usuarios.

app.put('/usuarios/:nickname', UsuarioController.updateUsuario); // Actualizar un usuario por su nickname.

app.delete('/usuarios/:nickname', UsuarioController.deleteUsuario); // Eliminar un usuario por su nickname.

// EXTRA USUARIOS:
app.get('/usuarios/mail/:mail', UsuarioController.getUsuarioByMail); // Obtener un usuario por mail




// Configuración del puerto del servidor, utiliza el puerto definido en "config.json" o el puerto 3000 si no está definido.
const PORT = config.server.port || 3000;

// Iniciar el servidor y escuchar en el puerto especificado.
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});