// Importar el modelo de Persona para interactuar con la base de datos.
const PersonaModel = require('../models/personamodel');

// FUNCIONES:

// Obtener una persona por DNI
function getPersonaByDNI(req, res) {
  const dni = req.params.dni; // Obtiene el DNI desde los parámetros de la URL

  // Verificar si la persona existe antes de responder
  PersonaModel.getPersonaByDNI(dni, (err, existingPersona) => {
    if (err) {
      console.error('Error al buscar persona por DNI:', err);
      res.status(500).json({ error: 'Error al buscar persona por DNI' });
      return;
    }

    if (!existingPersona || Object.keys(existingPersona).length === 0) {
      res.status(404).json({ error: 'La persona no existe' });
      return;
    }

    // Si la persona existe, responder con los datos almacenados en "existingPersona".
    res.json(existingPersona);
  });
}

// Función para crear una nueva persona.
function createPersona(req, res) {
  const { dni, nombre, apellido } = req.body;

  // Verificar si la persona ya existe antes de crearla.
  PersonaModel.getPersonaByDNI(dni, (err, existingPersona) => {
    if (err) {
      console.error('Error al buscar persona:', err);
      res.status(500).json({ error: 'Error al buscar persona' });
      return;
    }

    if (existingPersona) {
      res.status(400).json({ error: 'La persona ya existe' });
      return;
    }

    // Si la persona no existe, procede con la creación.
    PersonaModel.createPersona({ dni, nombre, apellido }, (err) => {
      if (err) {
        console.error('Error al crear persona:', err);
        res.status(500).json({ error: 'Error al crear persona' });
        return;
      }
      res.json({ message: 'Persona creada exitosamente' });
    });
  });
}

// Función para obtener todas las personas.
function getAllPersonas(req, res) {
  PersonaModel.getAllPersonas((err, personas) => {
    if (err) {
      console.error('Error al obtener personas:', err);
      res.status(500).json({ error: 'Error al obtener personas' });
      return;
    }
    res.json(personas);
  });
}

// Función para actualizar una persona por su DNI.
function updatePersona(req, res) {
  const dni = req.params.dni;
  const { nombre, apellido } = req.body;

  // Verificar si la persona existe antes de actualizar.
  PersonaModel.getPersonaByDNI(dni, (err, existingPersona) => {
    if (err) {
      console.error('Error al buscar persona:', err);
      res.status(500).json({ error: 'Error al buscar persona' });
      return;
    }

    if (!existingPersona || Object.keys(existingPersona).length === 0) {
      res.status(404).json({ error: 'La persona no existe' });
      return;
    }

    // Si la persona existe, procede con la actualización.
    PersonaModel.updatePersona({ dni, nombre, apellido }, (err) => {
      if (err) {
        console.error('Error al actualizar persona:', err);
        res.status(500).json({ error: 'Error al actualizar persona' });
        return;
      }
      res.json({ message: 'Persona actualizada exitosamente' });
    });
  });
}

// Función para eliminar una persona por su DNI.
function deletePersona(req, res) {
  const dni = req.params.dni;

  // Verificar si la persona existe antes de eliminar.
  PersonaModel.getPersonaByDNI(dni, (err, existingPersona) => {
    if (err) {
      console.error('Error al buscar persona:', err);
      res.status(500).json({ error: 'Error al buscar persona' });
      return;
    }

    if (!existingPersona || Object.keys(existingPersona).length === 0) {
      res.status(404).json({ error: 'La persona no existe' });
      return;
    }

    // Si la persona existe, procede con la eliminación.
    PersonaModel.deletePersona(dni, (err) => {
      if (err) {
        console.error('Error al eliminar persona:', err);
        res.status(500).json({ error: 'Error al eliminar persona' });
        return;
      }
      res.json({ message: 'Persona eliminada exitosamente' });
    });
  });
}

// EXTRA
// Función para buscar persona por apellido.
function getPersonaByApellido(req, res) {
  const apellido = req.params.apellido; // Obtener el apellido desde los parámetros de la URL

  // Verificar si la persona existe antes de eliminar.
  PersonaModel.getPersonaByApellido(apellido, (err, existingPersona) => {
    if (err) {
      console.error('Error al buscar persona por apellido:', err);
      res.status(500).json({ error: 'Error al buscar persona por apellido' });
      return;
    }

    if (!existingPersona || Object.keys(existingPersona).length === 0) {
      res.status(404).json({ error: 'La persona no existe' });
      return;
    }

    // Si la persona existe, responder con los datos que se almacenaron en "existingPersona".
    res.json(existingPersona);
  });
}




// Exportar las funciones del controlador.
module.exports = {
  createPersona,
  getAllPersonas,
  updatePersona,
  deletePersona,
  getPersonaByApellido,
  getPersonaByDNI
};