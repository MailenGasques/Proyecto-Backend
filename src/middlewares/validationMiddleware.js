export const validateInputProducts = (req, res, next) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;

  // Verificar si todos los campos requeridos están presentes
  if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
    return res.status(400).send({ message: "Faltan algunos parámetros" });
  }

  // Verificar tipos de datos
  if (typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof category !== 'string') {
    return res.status(400).send({ message: "Campos 'title', 'description', 'code' y 'category' deben ser de tipo cadena de texto" });
  }

  if (typeof price !== 'number' || typeof stock !== 'number') {
    return res.status(400).send({ message: "Campos 'price' y 'stock' deben ser números" });
  }

  if (typeof status !== 'boolean') {
    return res.status(400).send({ message: "El campo 'status' debe ser un valor booleano" });
  }

  // Verificar que 'price' y 'stock' sean números positivos
  if (price <= 0 || stock < 0) {
    return res.status(400).send({ message: "El precio debe ser mayor que 0 y el stock no puede ser negativo" });
  }

  // Verificar que 'thumbnails' sea un array y que no esté vacío
  if (!Array.isArray(thumbnails) || thumbnails.length === 0) {
    return res.status(400).send({ message: "El campo 'thumbnails' debe ser un array no vacío" });
  }

  // Si pasa todas las validaciones, continúa al siguiente middleware o ruta
  next();
};