import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import { calcCharge } from './utils/charges'

export const app = express()
const db = require('./utils/db')

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

/*
 ** Calculate charges (mean, min, max) of an apartment in a city
 */
app.use('/department/:dptCode/city/:postalCode/charges', (req, res) => {
  const { postalCode } = req.params
  const { condoSize, heating, employee, elevator } = req.query

  /* converting query string to real booleans */
  const isHeating = heating === 'true'
  const isEmployee = employee === 'true'
  const isElevator = elevator === 'true'

  const queryCityId =
    'SELECT id FROM City WHERE postal_code = "' + postalCode + '"'
  const query = 'SELECT * FROM BaseStats WHERE cityId IN (' + queryCityId + ')'

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    try {
      const data = calcCharge(
        rows,
        condoSize,
        isElevator,
        isHeating,
        isEmployee
      )
      res.status(200).json({
        message: 'success',
        data: data
      })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  })
})

/*
 ** Calculate charges (mean, min, max) of an apartment in a department
 */
app.use('/department/:dptCode/charges', (req, res) => {
  const { dptCode } = req.params
  const { condoSize, heating, employee, elevator } = req.query

  /* converting query string to real booleans */
  const isHeating = heating === 'true'
  const isEmployee = employee === 'true'
  const isElevator = elevator === 'true'

  const queryCityId = 'SELECT id FROM City WHERE dpt_code = "' + dptCode + '"'
  const query = 'SELECT * FROM BaseStats WHERE cityId IN (' + queryCityId + ')'

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    try {
      const data = calcCharge(
        rows,
        condoSize,
        isElevator,
        isHeating,
        isEmployee
      )
      res.status(200).json({
        message: 'success',
        data: data
      })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  })
})

/*
 ** Retrieve list of cities in a department
 */
app.use('/department/:dptCode', (req, res) => {
  const dptCode = req.params.dptCode
  const query =
    'SELECT name, postal_code FROM City WHERE dpt_code = "' + dptCode + '"'
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({ message: 'success', data: rows })
  })
})

/*
 * Retrieve list of department
 */
app.use('/department', (req, res) => {
  const query = 'SELECT DISTINCT(dpt_code) FROM City'
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({ message: 'success', data: rows })
  })
})

app.use((req, res) => {
  res.status(404)
})
export const start = async () => {
  try {
    app.listen(8080, () => {
      console.log(`REST API on http://localhost:8080/`)
    })
  } catch (e) {
    console.error(e)
  }
}
