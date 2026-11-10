// Traduce un error de petición a un mensaje para el usuario.
// Con respuesta del servidor hay status; sin respuesta es un problema de red.
export const mensajeDeError = (err) =>
  err.response
    ? `El servidor respondió con un error (${err.response.status}).`
    : 'No se pudo conectar con el servidor. Revisá tu conexión.'
