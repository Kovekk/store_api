const mongodb = require("../utilities/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Suppliers']
    try {
        const result = await mongodb
          .getDatabase()
          .db()
          .collection("suppliers")
          .find();
        result.toArray().then((suppliers) => {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json(suppliers);
        });
      } catch (error) {
        res.status(500).json({ message: "Error fetching suppliers", error });
      }
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Suppliers']
    try {
      const supplierId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDatabase()
        .db()
        .collection("suppliers")
        .findOne({ _id: supplierId });
      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
      } else {
        console.log("Supplier not found for ID:", supplierId);
        res.status(400).json({ message: "Supplier not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching supplier", error });
    }
};

const createSupplier = async (req, res) => {
    //#swagger.tags=['Suppliers']
    try {
      const supplier = {
        name: req.body.name,
        contactName: req.body.contactName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        productsSupplied: req.body.productsSupplied,
      };
      const response = await mongodb
        .getDatabase()
        .db()
        .collection("suppliers")
        .insertOne(supplier);
      if (response.acknowledged) {
        res
          .status(200)
          .json({
            message: "Supplier created successfully!",
            id: response.insertedId,
          });
      }
    } catch (error) {
      res.status(500).json({ message: "Error creating supplier", error });
    }
  };

  const updateSupplier = async (req, res) => {
    //#swagger.tags=['Suppliers']
    try {
      const supplierId = new ObjectId(req.params.id);
      const supplier = {
        name: req.body.name,
        contactName: req.body.contactName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        productsSupplied: req.body.productsSupplied,
      };
      const response = await mongodb
        .getDatabase()
        .db()
        .collection("suppliers")
        .replaceOne({ _id: supplierId }, supplier);
      if (response.modifiedCount > 0) {
        res.status(200).json({ message: "Supplier updated successfully!" });
      } else {
        res
          .status(400)
          .json({ message: "Supplier not found or no changes made!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating supplier", error });
    }
  };

  const deleteSupplier = async (req, res) => {
    //#swagger.tags=['Suppliers']
    try {
      const supplierId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDatabase()
        .db()
        .collection("suppliers")
        .deleteOne({ _id: supplierId });
      if (response.deletedCount > 0) {
        res.status(200).json({ message: "Supplier deleted successfully!" });
      } else {
        res.status(400).json({ message: "Supplier not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting supplier", error });
    }
  };

  module.exports = {
    getAll,
    getSingle,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  };