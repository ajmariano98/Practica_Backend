// Importar el módulo de MySQL y la configuración de la base de datos
const mysql = require('mysql');
const config = require('../config.json');

// Crear una conexión a la base de datos utilizando la configuración proporcionada en config.json
const db = mysql.createConnection(config.database);

// Establece la conexión a la base de datos y maneja errores
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Personas: Conexión exitosa a la base de datos');
  }
});

// FUNCIONES
// Función para obtener una persona por su DNI.
function getPersonaByDNI(dni, callback) {
  db.query('SELECT * FROM persona WHERE dni = ?', [dni], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.length === 0) {
      callback(null, null); // No se encontró la persona
    } else {
      callback(null, result[0]); // Se encontró la persona
    }
  });
}


// Función para crear una nueva persona en la base de datos.
function createPersona(persona, callback) {
  db.query('INSERT INTO persona (dni, nombre, apellido) VALUES (?, ?, ?)', [persona.dni, persona.nombre, persona.apellido], callback);
}

// Función para obtener todas las personas de la base de datos.
function getAllPersonas(callback) {
  db.query('SELECT * FROM persona', callback);
}


// Función para actualizar una persona por su DNI.
function updatePersona(persona, callback) {
  getPersonaByDNI(persona.dni, (err, existingPersona) => {
    if (err) {
      callback(err, null);
    } else if (!existingPersona) {
      callback({ message: 'La persona no existe' }, null); // Llamada de retorno con mensaje de error
    } else {
      db.query('UPDATE persona SET nombre = ?, apellido = ? WHERE dni = ?', [persona.nombre, persona.apellido, persona.dni], callback);
    }
  });
}

// Función para eliminar una persona por su DNI.
function deletePersona(dni, callback) {
  db.query('DELETE FROM persona WHERE dni = ?', [dni], callback);
}

// EXTRA
// Función para buscar una persona por su apellido.
function getPersonaByApellido(apellido, callback) {
  db.query('SELECT * FROM persona WHERE apellido = ?', [apellido], callback);
}



// Exporta las funciones del modelo para su uso en el controlador.
module.exports = {
  createPersona,
  getAllPersonas,
  getPersonaByDNI,
  getPersonaByApellido,
  updatePersona,
  deletePersona
};