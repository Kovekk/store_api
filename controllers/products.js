const mongodb = require("../utilities/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const result = await mongodb
          .getDatabase()
          .db()
          .collection("products")
          .find();
        result.toArray().then((products) => {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json(products);
        });
      } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
      }
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Products']
    try {
      const productId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDatabase()
        .db()
        .collection("products")
        .findOne({ _id: productId });
      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
      } else {
        console.log("Product not found for ID:", productId);
        res.status(400).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching product", error });
    }
};

const createProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
      const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock_quantity: req.body.stock_quantity,
        supplier_id: req.body.supplier_id,
      };
      const response = await mongodb
        .getDatabase()
        .db()
        .collection("products")
        .insertOne(product);
      if (response.acknowledged) {
        res
          .status(200)
          .json({
            message: "Product created successfully!",
            id: response.insertedId,
          });
      }
    } catch (error) {
      res.status(500).json({ message: "Error creating product", error });
    }
  };

  const updateProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
      const productId = new ObjectId(req.params.id);
      const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock_quantity: req.body.stock_quantity,
        supplier_id: req.body.supplier_id,
      };
      const response = await mongodb
        .getDatabase()
        .db()
        .collection("products")
        .replaceOne({ _id: productId }, product);
      if (response.modifiedCount > 0) {
        res.status(200).json({ message: "Product updated successfully!" });
      } else {
        res
          .status(400)
          .json({ message: "Product not found or no changes made!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error });
    }
  };

  const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
      const productId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDatabase()
        .db()
        .collection("products")
        .deleteOne({ _id: productId });
      if (response.deletedCount > 0) {
        res.status(200).json({ message: "Product deleted successfully!" });
      } else {
        res.status(400).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting product", error });
    }
  };

  const updateSupplier = async (req, res) => {
    //#swagger.tags=['Products']
    try {
      const productId = new ObjectId(req.params.id);
      const supplierId = new ObjectId(req.params.supplierId);
      const supplier = {supplier_id: supplierId}
      const response = await mongodb
        .getDatabase()
        .db()
        .collection("products")
        .updateOne({ _id: productId }, {$set: supplier});
        if (response.modifiedCount > 0) {
          res.status(200).json({ message: "Product updated successfully!" });
        } else {
          res
            .status(400)
            .json({ message: "Product not found or no changes made!" });
        }
    } catch (error) {
      res.status(500).json({ message: "Error updating product ", error });
    }
  }

  module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct,
    updateSupplier
  };