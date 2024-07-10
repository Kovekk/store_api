
const { check, validationResult } = require('express-validator')

// Employees validations
exports.employeesValidation = [
    check('firstName', 'First name is required.').not().isEmpty(),
    check('lastName', 'Last name is required.').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail().normalizeEmail({ gmail_remove_dots: true}),
    check('phone', 'Phone number is required.').not().isEmpty(),
    check('position', 'Position is required.').not().isEmpty(),
    check('salary', 'Salary is required.').isNumeric(),
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

// Middleware to handle validation results
exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    next()
}