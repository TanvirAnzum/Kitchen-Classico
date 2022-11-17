/**
 * title: "Server side portion of Kitchen Classico project"
 * description: "It contains secure CRUD operations of reviews and services from the project Kitchen Classico"
 * author: "Tanvir Anzum"
 * date: "07/11/2022"
 */

// dependencies
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// express initialization
const app = express();
const port = 9000;

// middlewares
app.use(cors());
app.use(express.json());

// mongodb initialization
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ylycqib.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// server homepage
app.get("/", (req, res) => {
  res.send("Welcome to the server side of kitchen classico application!");
});

// veify jwt token

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({
      message: "Unauthorized Access",
      code: "401",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Forbidden Access",
        code: "403",
      });
    }
    req.decoded = decoded;
    next();
  });
};

// jwt token request
app.post("/jwt", (req, res) => {
  const requestData = req.body;
  const token = jwt.sign(requestData, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  res.send({ token });
});

// function to connect with database

async function run() {
  try {
    const db = client.db("kitchenDB");
    const servicesDb = db.collection("services");
    const reviewsDb = db.collection("reviews");

    // services CRUD operations

    // get all services from collection
    app.get("/services", async (req, res) => {
      // limit and page from query string
      const limit = Number(req.query.limit);
      const page = Number(req.query.page);
      // total count of services
      const totalCount = await servicesDb.estimatedDocumentCount();
      const query = {};
      const cursor = servicesDb
        .find(query)
        .skip(page ? (limit ? page * limit : 0) : 0)
        .limit(limit ? limit : 10)
        .sort({ createdAt: -1 });

      const data = await cursor.toArray();

      res.send({
        totalCount,
        apiResponse: data,
      });
    });

    // get single services from collection
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const response = await servicesDb.findOne(query);
      res.send(response);
    });

    // create new services into collection
    app.post("/services", async (req, res) => {
      const requestData = req.body;
      const response = await servicesDb.insertOne(requestData);
      res.send(requestData);
    });

    // reviews CRUD operations

    // get reviews
    app.get("/reviews", verifyJWT, async (req, res) => {
      // for pagination
      const limit = Number(req.query.limit);
      const page = Number(req.query.page);

      // filtering through author email
      const authorEmail = req.query.email;

      // filtering through service id
      const serviceId = req.query.serviceId;

      const query = {};

      // verifying request email
      if (authorEmail) {
        if (req.decoded.email === authorEmail) {
          query.authorEmail = authorEmail;
        } else {
          res.status(403).send({ message: "unauthorized access" });
        }
      }

      if (serviceId) query.serviceId = serviceId;

      // total count of reviews
      const totalCount = await reviewsDb.countDocuments(query);

      const cursor = reviewsDb
        .find(query)
        .skip(page ? (limit ? page * limit : 0) : 0)
        .limit(limit ? limit : 10)
        .sort({ createdAt: -1 });
      const data = await cursor.toArray();

      res.send({
        totalCount,
        apiResponse: data,
      });
    });

    //
    // app.get("/reviews/:email", verifyJWT, async (req, res) => {
    //   const email = req.params.email;
    //   console.log(email);
    //   // for pagination
    //   const limit = Number(req.query.limit);
    //   const page = Number(req.query.page);

    //   if (email === req.decoded.email) {
    //     const query = {};
    //     query.authorEmail = email;
    //     // total count of reviews
    //     const totalCount = await reviewsDb.countDocuments(query);

    //     const cursor = reviewsDb
    //       .find(query)
    //       .skip(page ? (limit ? page * limit : 0) : 0)
    //       .limit(limit ? limit : 10)
    //       .sort({ createdAt: -1 });
    //     const data = await cursor.toArray();

    //     res.send({
    //       totalCount,
    //       apiResponse: data,
    //     });
    //   } else {
    //     res.status(403).send({ message: "unauthorized access" });
    //   }
    // });

    // add reviews
    app.post("/reviews", async (req, res) => {
      const requestData = req.body;
      const response = await reviewsDb.insertOne(requestData);
      res.send(requestData);
    });

    // update reviews
    app.patch("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const updatedData = req.body;
      const options = { upsert: true };
      const dataToUpdate = {
        $set: {
          ...updatedData,
        },
      };
      const response = await reviewsDb.updateOne(query, dataToUpdate, options);
      res.send(updatedData);
    });

    //delete reviews
    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const response = await reviewsDb.deleteOne(query);
      res.send(response);
    });
  } catch (error) {
    console.log(error);
  }
}

run();

// application listening
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
