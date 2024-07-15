const request = require('supertest')
const express = require('express')
const clientController = require('../controllers/clients')
const { isAuthenticated } = require('../middleware/authenticate')
const { clientsValidation, validate } = require('../middleware/validation')

const app = express()
app.use(express.json())

const router = express.Router()
router.get('/clients', isAuthenticated, clientController.getAll)
router.get('/clients/:id', isAuthenticated, clientController.getSingle)
router.post('/clients', isAuthenticated, clientsValidation, validate, clientController.createClient)
router.put('/clients/:id', isAuthenticated, clientsValidation, validate, clientController.updateClient)
router.delete('/clients/:id', isAuthenticated, clientController.deleteClient)
app.use('/api', router)

jest.mock('../middleware/authenticate', () => ({
  isAuthenticated: (req, res, next) => {
    next() //Simulates that the authentication was successful
  }
}))

jest.mock('../middleware/validation', () => ({
  clientsValidation: (req, res, next) => {
    next() //Simulates that the validation was successful
  },
  validate: (req, res, next) => {
    next() //Simulates that the validation was successful
  }
}))

jest.mock('../controllers/clients', () => ({
    getAll: (req, res) => {
      res.status(200).json([
        {
          id: 1,
          firstName: 'Livia',
          lastName: 'Pimentel',
          email: 'livia@example.com',
          phone: '5577156-2458',
          address: 'Mestre Emilio Street',
          registered_at: '01-06-2023'
        },
        {
          id: 2,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: 'Some Street',
          registered_at: '01-07-2023'
        }
      ])
    },
    getSingle: (req, res) => {
      res.status(200).json({
        id: req.params.id,
        firstName: 'Livia',
        lastName: 'Pimentel',
        email: 'livia@example.com',
        phone: '5577156-2458',
        address: 'Mestre Emilio Street',
        registered_at: '01-06-2023'
      })
    },
    createClient: (req, res) => {
      res.status(201).json({ id: 3, ...req.body })
    },
    updateClient: (req, res) => {
      res.status(200).json({ id: req.params.id, ...req.body })
    },
    deleteClient: (req, res) => {
      res.status(204).send()
    }
  }))
  
  describe('Clients API', () => {
    it('should return all clients', async () => {
      const response = await request(app).get('/api/clients')
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([
        {
          id: 1,
          firstName: 'Livia',
          lastName: 'Pimentel',
          email: 'livia@example.com',
          phone: '5577156-2458',
          address: 'Mestre Emilio Street',
          registered_at: '01-06-2023'
        },
        {
          id: 2,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: 'Some Street',
          registered_at: '01-07-2023'
        }
      ])
    })
  
    it('should return a single client by ID', async () => {
      const response = await request(app).get('/api/clients/1')
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        id: '1',
        firstName: 'Livia',
        lastName: 'Pimentel',
        email: 'livia@example.com',
        phone: '5577156-2458',
        address: 'Mestre Emilio Street',
        registered_at: '01-06-2023'
      })
    })
  
    it('should create a new client', async () => {
      const newClient = {
        firstName: 'New',
        lastName: 'Client',
        email: 'newclient@example.com',
        phone: '0987654321',
        address: 'New Street',
        registered_at: '01-08-2023'
      }
      const response = await request(app).post('/api/clients').send(newClient)
      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({ id: 3, ...newClient })
    })
  
    it('should update an existing client', async () => {
      const updatedClient = {
        firstName: 'Updated',
        lastName: 'Client',
        email: 'updatedclient@example.com',
        phone: '1122334455',
        address: 'Updated Street',
        registered_at: '01-09-2023'
      }
      const response = await request(app).put('/api/clients/1').send(updatedClient)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({ id: '1', ...updatedClient })
    })
  
    it('should delete a client by ID', async () => {
      const response = await request(app).delete('/api/clients/1')
      expect(response.statusCode).toBe(204)
    })
  })