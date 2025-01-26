import express from 'express'
import path from 'path'
import { CartsRouter, ProductsRouter } from '../routes/index.js'
import { config } from '../config/index.js'

const initApp = () => {
  const app = express()

  app.use('/public', express.static('/public'))
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  app.use('/api/products', ProductsRouter)
  app.use('/api/carts', CartsRouter)

  return app
}

export default initApp
