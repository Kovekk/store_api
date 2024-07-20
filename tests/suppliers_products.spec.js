const {app} = require('../server')
const supertest = require('supertest')
const {expect} = require('@jest/globals')
const request = supertest(app)

jest.mock('../middleware/authenticate', () => ({
    isAuthenticated: (req, res, next) => {
        next() //Simulates that the authentication was successful
    }
}))

let supplierId = 0;

describe('supplier routes', () => {
    test('responds to /suppliers. test the get all route', async () => {
        const res = await request.get('/suppliers');
        // console.log(res)
        expect(res.statusCode).toBe(200);
    })
    test('responds to /suppliers. test the create new supplier', async () => {
        const supplier = {
            name: "Super Dasani",
            contactName: "Fred",
            email: "fred@fred.me",
            phone: "001-001-0001",
            address: "123 E Supplier road",
            city: "Tristate area",
            country: "USA",
            productsSupplied: ["Water bottle", "Water can"]
        }
        const res = await request.post('/suppliers').send(supplier);
        // console.log(res)
        expect(res.statusCode).toBe(200);
        supplierId = res.body.id;
    })
    test('responds to /suppliers/:id. test get single', async () => {
        const res = await request.get('/suppliers/' + supplierId);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            _id: supplierId,
            name: "Super Dasani",
            contactName: "Fred",
            email: "fred@fred.me",
            phone: "001-001-0001",
            address: "123 E Supplier road",
            city: "Tristate area",
            country: "USA",
            productsSupplied: ["Water bottle", "Water can"]
        })
    })
    test('responds to /suppliers/:id, test update supplier', async () => {
        const supplier = {
            name: "a little less super dasani",
            contactName: "Fred",
            email: "fred@fred.me",
            phone: "001-001-0001",
            address: "123 E Supplier road",
            city: "Tristate area",
            country: "USA",
            productsSupplied: ["Water bottle", "Water can"]
        }
        const res = await request.put('/suppliers/' + supplierId).send(supplier);
        expect(res.statusCode).toBe(200);
    })
    test('responds to /suppliers/:id, test delete supplier', async () => {
        const res = await request.delete('/suppliers/' + supplierId);
        expect(res.statusCode).toBe(200);
    })
})

let productId = 0;

describe('products routes', () => {
    test('responds to /products. test the get all route', async () => {
        const res = await request.get('/products');
        // console.log(res)
        expect(res.statusCode).toBe(200);
    })
    test('responds to /products. test the create new product', async () => {
        const product = {
            name: "Water bottle",
            description: "Just something to help quench thirst.",
            price: 12.99,
            category: "food",
            stock_quantity: 109,
            supplier_id: "123456789abc"
        }
        const res = await request.post('/products').send(product);
        // console.log(res)
        expect(res.statusCode).toBe(200);
        productId = res.body.id;
    })
    test('responds to /products/:id. test get single', async () => {
        const res = await request.get('/products/' + productId);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            _id: productId,
            name: "Water bottle",
            description: "Just something to help quench thirst.",
            price: 12.99,
            category: "food",
            stock_quantity: 109,
            supplier_id: "123456789abc"
        })
    })
    test('responds to /products/:id, test update product', async () => {
        const product = {
            name: "Water bottle",
            description: "Just something to help quench thirst.",
            price: 12.99,
            category: "food",
            stock_quantity: 109,
            supplier_id: "123456789abc"
        }
        const res = await request.put('/products/' + productId).send(product);
        expect(res.statusCode).toBe(200);
    })
    test('responds to /products/:id, test delete product', async () => {
        const res = await request.delete('/products/' + productId);
        expect(res.statusCode).toBe(200);
    })
})