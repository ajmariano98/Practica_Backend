// Importar el módulo de MySQL y la configuración de la base de datos
const mysql = require('mysql');
const config = require('../config.json');

// Crear una conexión a la base de datos utilizando la configuración proporcionada en config.json.
const db = mysql.createConnection(config.database);

// Establece la conexión a la base de datos y maneja errores
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Usuarios: Conexión exitosa a la base de datos');
  }
});

// FUNCIONES
// Obtener un usuario por nickname
function getUsuarioByNickname(nickname, callback) {
  db.query('SELECT * FROM usuario WHERE nickname = ?', [nickname], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.length === 0) {
      callback(null, null); // No se encontró el usuario
    } else {
      callback(null, result[0]); // Se encontró el usuario
    }
  });
}


// Crear un usuario
function createUsuario(usuario, callback) {
  // Verifica si el usuario ya existe antes de crearlo
  getUsuarioByNickname(usuario.nickname, (err, existingUsuario) => {
    if (err) {
      callback(err, null);
    } else if (existingUsuario) {
      callback({ message: 'El usuario ya existe' }, null); // Llamada de retorno con mensaje de error
    } else {
      db.query('INSERT INTO usuario (mail, nickname, password) VALUES (?, ?, ?)', [usuario.mail, usuario.nickname, usuario.password], callback);
    }
  });
}

// Obtener todos los usuarios
function getAllUsuarios(callback) {
  db.query('SELECT * FROM usuario', callback);
}

// Actualizar un usuario
function updateUsuario(usuario, callback) {
  // Verificar si el usuario existe antes de actualizar
  getUsuarioByNickname(usuario.nickname, (err, existingUsuario) => {
    if (err) {
      callback(err, null);
    } else if (!existingUsuario) {
      callback({ message: 'El usuario no existe' }, null); // Llamada de retorno con mensaje de error
    } else {
      db.query('UPDATE usuario SET mail = ?, password = ? WHERE nickname = ?', [usuario.mail, usuario.password, usuario.nickname], callback);
    }
  });
}

// Eliminar un usuario
function deleteUsuario(nickname, callback) {
  // Verificar si el usuario existe antes de eliminar
  getUsuarioByNickname(nickname, (err, existingUsuario) => {
    if (err) {
      callback(err, null);
    } else if (!existingUsuario) {
      callback({ message: 'El usuario no existe' }, null); // Llamada de retorno con mensaje de error
    } else {
      db.query('DELETE FROM usuario WHERE nickname = ?', [nickname], callback);
    }
  });
}

// EXTRA
// Obtener un usuario por mail
function getUsuarioByMail(mail, callback) {
  db.query('SELECT * FROM usuario WHERE mail = ?', [mail], (err, result) => {
    if (err) {
      callback(err, null);
    } else if (result.length === 0) {
      callback(null, null); // No se encontró el usuario
    } else {
      callback(null, result[0]); // Se encontró el usuario
    }
  });
}


// Exporta las funciones del modelo para su uso en el controlador.
module.exports = {
  createUsuario,
  getAllUsuarios,
  getUsuarioByNickname,
  getUsuarioByMail,
  updateUsuario,
  deleteUsuario
};