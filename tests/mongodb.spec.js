const { MongoClient } = require('mongodb')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer
let connection
let db

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create() //Creates a MongoDB server instance in memory

  const mongoUri = mongoServer.getUri() //Gets the connection URI from the server

  connection = await MongoClient.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  db = connection.db() //Gets the client database object

  global.__MONGO_URI__ = mongoUri //Defines the URI globally for Jest
})

afterAll(async () => {
  await connection.close() //Closes the connection to the MongoDB client
  await mongoServer.stop() //To the MongoDB server in memory
})

beforeEach(async () => {
  //Clears database data between tests if necessary
  await db.collection('clients').deleteMany({})
})

//Example of tests using MongoDB in memory
describe('Clients API with MongoDB', () => {
  it('should return all clients', async () => {
    //Simulates data entry for testing
    await db.collection('clients').insertMany([
      {
        firstName: 'Livia',
        lastName: 'Pimentel',
        email: 'livia@example.com',
        phone: '5577156-2458',
        address: 'Mestre Emilio Street',
        registered_at: '01-06-2023'
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: 'Some Address',
        registered_at: '01-06-2023'
      }
    ])

    //Test to fetch all clients
    const clients = await db.collection('clients').find().toArray()
    expect(clients).toHaveLength(2)
  })

  it('should return a single client by ID', async () => {
    //Simulates the insertion of a specific client for the test
    const insertedClient = await db.collection('clients').insertOne({
      firstName: 'Livia',
      lastName: 'Pimentel',
      email: 'livia@example.com',
      phone: '5577156-2458',
      address: 'Mestre Emilio Street',
      registered_at: '01-06-2023'
    })

    const clientId = insertedClient.insertedId

    //Test to fetch a client by ID
    const client = await db.collection('clients').findOne({ _id: clientId })
    expect(client.firstName).toBe('Livia') //Checks if the client found has the correct name
  })
})
