// Obtener notas desde el frontend
fetch('/api/notes')
  .then(response => response.json())
  .then(data => {
    // Manejar los datos recibidos
  })
  .catch(error => {
    console.error('Error al obtener las notas:', error);
  });
