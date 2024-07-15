const request = require('supertest')
const express = require('express')
const employeeController = require('../controllers/employees')
const { employeesValidation, validate } = require('../middleware/validation')
const { isAuthenticated } = require('../middleware/authenticate')

const app = express()
app.use(express.json())

const router = express.Router()
router.get('/employees', isAuthenticated, employeeController.getAll)
router.get('/employees/:id', isAuthenticated, employeeController.getSingle)
router.post('/employees', isAuthenticated, employeesValidation, validate, employeeController.createEmployee)
router.put('/employees/:id', isAuthenticated, employeesValidation, validate, employeeController.updateEmployee)
router.delete('/employees/:id', isAuthenticated, employeeController.deleteEmployee)
app.use('/api', router)

jest.mock('../middleware/authenticate', () => ({
  isAuthenticated: (req, res, next) => {
    next() // Simula que a autenticação foi bem-sucedida
  }
}))

jest.mock('../middleware/validation', () => ({
  employeesValidation: (req, res, next) => {
    next() // Simula que a validação foi bem-sucedida
  },
  validate: (req, res, next) => {
    next() // Simula que a validação foi bem-sucedida
  }
}))

jest.mock('../controllers/employees', () => ({
  getAll: (req, res) => {
    res.status(200).json([
      {
        id: 1,
        firstName: 'Livia',
        lastName: 'Pimentel',
        email: 'livia@example.com',
        phone: '5577156-2458',
        position: "Tarinee",
        salary: 1500,
        hire_date: "12-09-2023",
        department: "financial"
      },
      {
        id: 2,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        position: "Tarinee",
        salary: 1500,
        hire_date: "12-09-2023",
        department: "financial"
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
      position: "Tarinee",
      salary: 1500,
      hire_date: "12-09-2023",
      department: "financial"
    })
  },
  createEmployee: (req, res) => {
    res.status(201).json({ id: 3, ...req.body })
  },
  updateEmployee: (req, res) => {
    res.status(200).json({ id: req.params.id, ...req.body })
  },
  deleteEmployee: (req, res) => {
    res.status(204).send()
  }
}))

describe('Employees API', () => {
  it('should return all employees', async () => {
    const response = await request(app).get('/api/employees')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([
      {
        id: 1,
        firstName: 'Livia',
        lastName: 'Pimentel',
        email: 'livia@example.com',
        phone: '5577156-2458',
        position: "Tarinee",
        salary: 1500,
        hire_date: "12-09-2023",
        department: "financial"
      },
      {
        id: 2,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        position: "Tarinee",
        salary: 1500,
        hire_date: "12-09-2023",
        department: "financial"
      }
    ])
  })

  it('should return a single employee by ID', async () => {
    const response = await request(app).get('/api/employees/1')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      id: '1',
      firstName: 'Livia',
      lastName: 'Pimentel',
      email: 'livia@example.com',
      phone: '5577156-2458',
      position: "Tarinee",
      salary: 1500,
      hire_date: "12-09-2023",
      department: "financial"
    })
  })

  it('should create a new employee', async () => {
    const newEmployee = {
      firstName: 'New',
      lastName: 'Employee',
      email: 'newemployee@example.com',
      phone: '0987654321',
      position: "Tarinee",
      salary: 1500,
      hire_date: "12-09-2023",
      department: "financial"
    }
    const response = await request(app).post('/api/employees').send(newEmployee)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({ id: 3, ...newEmployee })
  })

  it('should update an existing employee', async () => {
    const updatedEmployee = {
      firstName: 'Updated',
      lastName: 'Employee',
      email: 'updatedemployee@example.com',
      phone: '1122334455',
      position: "Tarinee",
      salary: 1500,
      hire_date: "12-09-2023",
      department: "financial"
    }
    const response = await request(app).put('/api/employees/1').send(updatedEmployee)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ id: '1', ...updatedEmployee })
  })

  it('should delete an employee by ID', async () => {
    const response = await request(app).delete('/api/employees/1')
    expect(response.statusCode).toBe(204)
  })
})
