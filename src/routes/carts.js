import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { config } from '../config/index.js';
import { v4 as uuidv4 } from 'uuid';

export const CartsRouter = Router();

const pathToCarts = path.join(config.dirname, '/src/data/carts.json');
const pathToProducts = path.join(config.dirname, '/src/data/products.json');

// Ruta para crear un carrito nuevo
CartsRouter.post('/', async (req, res) => {
    try {
        const cartsString = await fs.promises.readFile(pathToCarts, 'utf-8');
        const carts = JSON.parse(cartsString);

        // Crear un nuevo carrito con un ID único
        const id = uuidv4();
        const newCart = {
            id,
            products: [],
        };

        // Agregar el carrito a la lista de carritos
        carts.push(newCart);

        // Guardar el nuevo carrito en el archivo JSON
        const cartsStringified = JSON.stringify(carts, null, '\t');
        await fs.promises.writeFile(pathToCarts, cartsStringified);

        res.status(201).send({ message: 'Carrito creado', cart: newCart });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el carrito', error });
    }
});

// Ruta para obtener los productos del carrito
CartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cartsString = await fs.promises.readFile(pathToCarts, 'utf-8');
        const carts = JSON.parse(cartsString);

        const cart = carts.find((c) => c.id === cid);

        if (!cart) {
            return res.status(404).send({ message: 'Carrito no encontrado' });
        }

        res.send({ products: cart.products });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los productos del carrito', error });
    }
});

// Ruta para agregar un producto al carrito
CartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cartsString = await fs.promises.readFile(pathToCarts, 'utf-8');
        const productsString = await fs.promises.readFile(pathToProducts, 'utf-8');
        const carts = JSON.parse(cartsString);
        const products = JSON.parse(productsString);

        const cart = carts.find((c) => c.id === cid);
        if (!cart) {
            return res.status(404).send({ message: 'Carrito no encontrado' });
        }

        const product = products.find((p) => p.id === pid);
        if (!product) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        // Buscar si el producto ya existe en el carrito
        const existingProductIndex = cart.products.findIndex((p) => p.product === pid);
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, solo incrementar la cantidad
            cart.products[existingProductIndex].quantity += 1;
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            cart.products.push({ product: pid, quantity: 1 });
        }

        // Guardar los carritos actualizados
        const cartsStringified = JSON.stringify(carts, null, '\t');
        await fs.promises.writeFile(pathToCarts, cartsStringified);

        res.send({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).send({ message: 'Error al agregar producto al carrito', error });
    }
});