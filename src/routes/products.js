import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { config } from '../config/index.js'
import { v4 as uuidv4 } from 'uuid'
import { validateInputProducts } from '../middlewares/validationMiddleware.js'

export const ProductsRouter = Router()

const pathToProducts = path.join(config.dirname, '/src/data/products.json')

ProductsRouter.get('/', async (req, res) => {
    let productsString = await fs.promises.readFile(pathToProducts, 'utf-8')
    const products = JSON.parse(productsString)
    res.send({ products })
})

ProductsRouter.post('/', validateInputProducts, async (req, res) => {
    let productsString = await fs.promises.readFile(pathToProducts, 'utf-8')
    const products = JSON.parse(productsString)

    const id = uuidv4() 

    const {title, description, code, price, status, stock, category, thumbnails,} = req.body

    const product = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    }

    products.push(product)

    const productsStringified = JSON.stringify(products, null, '\t')
    await fs.promises.writeFile(pathToProducts, productsStringified)
    res.send({ message: 'Producto creado', data: product })
})

ProductsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params  // Obtiene el id del producto desde los parámetros de la URL
    const { title, description, code, price, status, stock, category, thumbnails } = req.body

    try {
        // Leer los productos desde el archivo JSON
        let productsString = await fs.promises.readFile(pathToProducts, 'utf-8')
        const products = JSON.parse(productsString)

        // Buscar el producto por su id
        const productIndex = products.findIndex(p => p.id === pid)
        if (productIndex === -1) {
            return res.status(404).send({ message: 'Producto no encontrado' })  // Si no se encuentra, devolver un error 404
        }

        // Actualizar el producto encontrado
        products[productIndex] = {
            ...products[productIndex],  // Conservar el producto original
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        }

        // Guardar los productos actualizados en el archivo JSON
        const productsStringified = JSON.stringify(products, null, '\t')
        await fs.promises.writeFile(pathToProducts, productsStringified)

        // Enviar una respuesta indicando que el producto fue actualizado
        res.send({ message: 'Producto actualizado', data: products[productIndex] })
    } catch (error) {
        res.status(500).send({ message: "Error al actualizar el producto" })  // Manejo de errores
    }
})

ProductsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params  // Obtiene el id del producto desde los parámetros de la URL

    try {
        // Leer los productos desde el archivo JSON
        let productsString = await fs.promises.readFile(pathToProducts, 'utf-8')
        const products = JSON.parse(productsString)

        // Buscar el producto por su id
        const productIndex = products.findIndex(p => p.id === pid)
        if (productIndex === -1) {
            return res.status(404).send({ message: 'Producto no encontrado' })  // Si no se encuentra, devolver un error 404
        }

        // Eliminar el producto encontrado
        products.splice(productIndex, 1)

        // Guardar los productos actualizados (sin el producto eliminado) en el archivo JSON
        const productsStringified = JSON.stringify(products, null, '\t')
        await fs.promises.writeFile(pathToProducts, productsStringified)

        // Enviar una respuesta indicando que el producto fue eliminado
        res.send({ message: 'Producto eliminado' })
    } catch (error) {
        res.status(500).send({ message: "Error al eliminar el producto" })  // Manejo de errores
    }
})