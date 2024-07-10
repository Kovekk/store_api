
const { check, validationResult } = require('express-validator')

// Employees validations
exports.employeesValidation = [
    check('firstName', 'First name is required.').not().isEmpty(),
    check('lastName', 'Last name is required.').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail().normalizeEmail({ gmail_remove_dots: true}),
    check('phone', 'Phone number is required.').not().isEmpty(),
    check('position', 'Position is required.').not().isEmpty(),
    check('salary', 'Salary is required.').not().isEmpty(),
    check('hire_date', 'Hire date is required.').not().isEmpty(),
    check('department', 'Department is required.').not().isEmpty()
]
// Clients validations
exports.clientsValidation = [
    check('firstName', 'First name is required.').not().isEmpty(),
    check('lastName', 'Last name is required.').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail().normalizeEmail({ gmail_remove_dots: true}),
    check('phone', 'Phone number is required.').not().isEmpty(),
    check('address', 'Address is required.').not().isEmpty(),
    check('registered_at', 'Registered at is required.').not().isEmpty(),
]
// Products validations
exports.productsValidation = [
    check('name', 'Name is required.').not().isEmpty(),
    check('description', 'Description is required.').not().isEmpty(),
    check('price', 'Price is required in valid format.').isEmail().normalizeEmail({ gmail_remove_dots: true}),
    check('category', 'Category is required.').not().isEmpty(),
    check('stock_quantity', 'Quantity is required.').not().isEmpty(),
    check('supplier_id', 'Supplier id is required.').not().isEmpty()
]
// Suppliers validations
exports.suppliersValidation = [
    check('name', 'Name of supplier is required.').not().isEmpty(),
    check('contact_name', 'First name of contact is required.').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail().normalizeEmail({ gmail_remove_dots: true}),
    check('phone', 'Phone number is required.').not().isEmpty(),
    check('address', 'Street address is required.').not().isEmpty(),
    check('city', 'City is required.').not().isEmpty(),
    check('country', 'Country is required.').not().isEmpty(),
    check('products_supplied', 'Products list is required.').not().isEmpty()
]

// Middleware to handle validation results
exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    next()
}