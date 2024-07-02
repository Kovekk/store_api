const mongodb = require("../utilities/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Clients']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("clients")
      .find();
    result.toArray().then((clients) => {
      res.setHeader("Content-Type", "application/json")
      res.status(200).json(clients)
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error })
  }
}

const getSingle = async (req, res) => {
  //#swagger.tags=['Clients']
  try {
    const clientsId = new ObjectId(req.params.id)
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("clients")
      .findOne({ _id: clientsId })
    if (result) {
      res.setHeader("Content-Type", "application/json")
      res.status(200).json(result);
    } else {
      console.log("Client not found for ID:", clientsId)
      res.status(400).json({ message: "Client not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching client", error })
  }
}

const createClient = async (req, res) => {
  //#swagger.tags=['Clients']
  try {
    const client = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      registered_at: req.body.registered_at,
    }
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("clients")
      .insertOne(client);
    if (response.acknowledged) {
      res
        .status(200)
        .json({
          message: "Client created successfully!",
          id: response.insertedId,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating client", error })
  }
};

const updateClient = async (req, res) => {
  //#swagger.tags=['Clients']
  try {
    const clientId = new ObjectId(req.params.id)
    const client = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        registered_at: req.body.registered_at,
    }
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("clients")
      .replaceOne({ _id: clientId }, client);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Client updated successfully!" })
    } else {
      res
        .status(400)
        .json({ message: "Client not found or no changes made!" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error })
  }
};

const deleteClient = async (req, res) => {
  //#swagger.tags=['clients']
  try {
    const clientId = new ObjectId(req.params.id)
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("clients")
      .deleteOne({ _id: clientId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Client deleted successfully!" })
    } else {
      res.status(400).json({ message: "Client not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error })
  }
};

module.exports = {
  getAll,
  getSingle,
  createClient,
  updateClient,
  deleteClient,
}
