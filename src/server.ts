import 'reflect-metadata'
import express, { json } from 'express'

import './database'

const app = express();

app.use(json())

const port = 3333
app.listen(port, () => {
  console.log(`App running on port ${port}`)
})