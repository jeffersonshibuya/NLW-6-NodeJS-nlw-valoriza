import 'reflect-metadata'
import express, { json, NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import { router } from './routes'

import './database'

const app = express();

app.use(json())

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (typeof Error) {
    return response.status(400).json({ error: err.message })
  } else {
    return response.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error"
    })
  }
})

const port = 3333
app.listen(port, () => {
  console.log(`App running on port ${port}`)
})