// Importar el modelo de Usuario para interactuar con la base de datos.
const UsuarioModel = require('../models/usuariomodel');


// FUNCIONES:
// Obtener un usuario por nickname
function getUsuarioByNickname(req, res) {
  const nickname = req.params.nickname;

  // Verificar si el usuario existe antes de responder
  UsuarioModel.getUsuarioByNickname(nickname, (err, usuario) => {
    if (err) {
      console.error('Error al obtener usuario por nickname:', err);
      res.status(500).json({ error: 'Error al obtener usuario por nickname' });
      return;
    }

    if (!usuario || Object.keys(usuario).length === 0) {
      res.status(404).json({ error: 'El usuario no existe' });
      return;
    }

    // Si el usuario existe, responder con los datos almacenados en "usuario"
    res.json(usuario);
  });
}

// Crear un usuario
function createUsuario(req, res) {
  const { mail, nickname, password } = req.body;

  // Verificar que se proporcionen todos los datos necesarios
  if (!mail || !nickname || !password) {
    res.status(400).json({ error: 'Faltan datos requeridos' });
    return;
  }

  // Verificar si el usuario ya existe por nickname
  UsuarioModel.getUsuarioByNickname(nickname, (err, existingUsuario) => {
    if (err) {
      console.error('Error al buscar usuario por nickname:', err);
      res.status(500).json({ error: 'Error al buscar usuario por nickname' });
      return;
    }

    if (existingUsuario) {
      res.status(400).json({ error: 'El usuario ya existe' });
      return;
    }

    // Si el usuario no existe, procede con la creación
    UsuarioModel.createUsuario({ mail, nickname, password }, (err, result) => {
      if (err) {
        console.error('Error al crear usuario:', err);
        res.status(500).json({ error: 'Error al crear usuario' });
        return;
      }
      res.json({ message: 'Usuario creado exitosamente' });
    });
  });
}

// Obtener una lista de todos los usuarios
function getAllUsuarios(req, res) {
  UsuarioModel.getAllUsuarios((err, usuarios) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
      return;
    }
    res.json(usuarios);
  });
}

// Actualizar un usuario
function updateUsuario(req, res) {
  const nickname = req.params.nickname;
  const { mail, password } = req.body;

  // Verificar si el usuario existe antes de actualizar
  UsuarioModel.getUsuarioByNickname(nickname, (err, existingUsuario) => {
    if (err) {
      console.error('Error al buscar usuario por nickname:', err);
      res.status(500).json({ error: 'Error al buscar usuario por nickname' });
      return;
    }

    if (!existingUsuario || Object.keys(existingUsuario).length === 0) {
      res.status(404).json({ error: 'El usuario no existe' });
      return;
    }

    // Si el usuario existe, procede con la actualización
    UsuarioModel.updateUsuario({ mail, nickname, password }, (err) => {
      if (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).json({ error: 'Error al actualizar usuario' });
        return;
      }
      res.json({ message: 'Usuario actualizado exitosamente' });
    });
  });
}

// Eliminar un usuario
function deleteUsuario(req, res) {
  const nickname = req.params.nickname;

  // Verificar si el usuario existe antes de eliminar
  UsuarioModel.getUsuarioByNickname(nickname, (err, existingUsuario) => {
    if (err) {
      console.error('Error al buscar usuario por nickname:', err);
      res.status(500).json({ error: 'Error al buscar usuario por nickname' });
      return;
    }

    if (!existingUsuario || Object.keys(existingUsuario).length === 0) {
      res.status(404).json({ error: 'El usuario no existe' });
      return;
    }

    // Si el usuario existe, procede con la eliminación
    UsuarioModel.deleteUsuario(nickname, (err) => {
      if (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).json({ error: 'Error al eliminar usuario' });
        return;
      }
      res.json({ message: 'Usuario eliminado exitosamente' });
    });
  });
}

// EXTRA
// Obtener un usuario por mail
function getUsuarioByMail(req, res) {
  const mail = req.params.mail;

  // Verificar si el usuario existe antes de responder
  UsuarioModel.getUsuarioByMail(mail, (err, usuario) => {
    if (err) {
      console.error('Error al obtener usuario por mail:', err);
      res.status(500).json({ error: 'Error al obtener usuario por mail' });
      return;
    }

    if (!usuario || Object.keys(usuario).length === 0) {
      res.status(404).json({ error: 'El usuario no existe' });
      return;
    }

    // Si el usuario existe, responder con los datos almacenados en "usuario"
    res.json(usuario);
  });
}





// Exportar las funciones del controlador.
module.exports = {
  getUsuarioByNickname,
  createUsuario,
  getAllUsuarios,
  updateUsuario,
  deleteUsuario,
  getUsuarioByMail
};