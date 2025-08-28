const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5012;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// JWT Authentication
app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  res.send({ success: true, token });
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ message: "unauthorized access" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "unauthorized access" });
    req.decoded = decoded;
    next();
  });
};

// MongoDB Connection
const uri = `mongodb+srv://${process.env.STUMATE_DB_USER}:${process.env.STUMATE_DB_PASS}@cluster0.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("StuMateDB");

    // Collections
    const usersCollection = db.collection("users");
    const classesCollection = db.collection("classes");
    const budgetCollection = db.collection("budget");
    const studyPlansCollection = db.collection("studyPlans");

    // 🧑‍🎓 Users
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) return res.send({ message: "User already exists" });

      user.role = user.role || "student";
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // 📅 Class Schedule
    app.get("/classes", async (req, res) => {
      const result = await classesCollection.find().toArray();
      res.send(result);
    });

    app.post("/classes", async (req, res) => {
      const newClass = req.body;
      const result = await classesCollection.insertOne(newClass);
      res.send(result);
    });

    app.delete("/classes/:id", async (req, res) => {
      const result = await classesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    // 💰 Budget Tracker
    app.get("/budget/:email", async (req, res) => {
      const result = await budgetCollection.find({ email: req.params.email }).toArray();
      res.send(result);
    });

    app.post("/budget", async (req, res) => {
      const entry = req.body;
      const result = await budgetCollection.insertOne(entry);
      res.send(result);
    });

    // 📖 Study Planner
    app.get("/studyPlans/:email", async (req, res) => {
      const result = await studyPlansCollection.find({ email: req.params.email }).toArray();
      res.send(result);
    });

    app.post("/studyPlans", async (req, res) => {
      const plan = req.body;
      const result = await studyPlansCollection.insertOne(plan);
      res.send(result);
    });

    app.patch("/studyPlans/:id", async (req, res) => {
      const { status } = req.body;
      const result = await studyPlansCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { status } }
      );
      res.send(result);
    });

    // 📊 Dashboard Stats
    app.get("/dashboard/stats", async (req, res) => {
      const totalUsers = await usersCollection.countDocuments();
      const totalClasses = await classesCollection.countDocuments();
      const totalPlans = await studyPlansCollection.countDocuments();
      const totalBudgets = await budgetCollection.countDocuments();

      res.send({
        totalUsers,
        totalClasses,
        totalPlans,
        totalBudgets,
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
run().catch(console.dir);

// Root Endpoint
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>StuMate Server</title></head>
      <body style="font-family: sans-serif; text-align:center; margin-top:50px;">
        <h1>🚀 StuMate Server is Running</h1>
        <p>API is ready for student life management toolkit.</p>
      </body>
    </html>
  `);
});

// Start Server
app.listen(port, () => {
  console.log(`✅ StuMate Server running on port: ${port}`);
});
