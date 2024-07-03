const mongodb = require("../utilities/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Employees']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("employees")
      .find();
    result.toArray().then((employees) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(employees);
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Employees']
  try {
    const employeesId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("employees")
      .findOne({ _id: employeesId });
    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      console.log("Employee not found for ID:", employeesId);
      res.status(400).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

const createEmployee = async (req, res) => {
  //#swagger.tags=['Employees']
  try {
    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      salary: req.body.salary,
      hire_date: req.body.hire_date,
      department: req.body.department,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("employees")
      .insertOne(employee);
    if (response.acknowledged) {
      res
        .status(200)
        .json({
          message: "Employee created successfully!",
          id: response.insertedId,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
};

const updateEmployee = async (req, res) => {
  //#swagger.tags=['Employees']
  try {
    const employeeId = new ObjectId(req.params.id);
    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      salary: req.body.salary,
      hire_date: req.body.hire_date,
      department: req.body.department,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("employees")
      .replaceOne({ _id: employeeId }, employee);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Employee updated successfully!" });
    } else {
      res
        .status(400)
        .json({ message: "Employee not found or no changes made!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

const deleteEmployee = async (req, res) => {
  //#swagger.tags=['Employees']
  try {
    const employeeId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("employees")
      .deleteOne({ _id: employeeId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Employee deleted successfully!" });
    } else {
      res.status(400).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
