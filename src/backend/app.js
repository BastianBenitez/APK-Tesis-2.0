const http = require('http');

function procesarFormulario(req, res) {
  if (req.method === 'POST' && req.url === '/procesar_formulario') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const nombres = formData.get('nombre');
      const rut = formData.get('rut');
      const correo = formData.get('correo');
      const direccion = formData.get('direccion');
      const numeroContacto = formData.get('numero_contacto');
      const salario = formData.get('salario');
      const fechaContratacion = formData.get('fecha_contratacion');
      const cargo = formData.get('cargo');
      const departamento = formData.get('departamento');
      const sede = formData.get('sede');
      const proyecto = formData.get('proyecto');

      // Aquí puedes realizar cualquier acción con los datos recibidos, como almacenarlos en una base de datos o procesarlos de alguna otra manera.
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
}

module.exports = {
  procesarFormulario
};