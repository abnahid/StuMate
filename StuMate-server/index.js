import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

dotenv.config();

import questionsRoutes from "./routes/questions.js"; // note the .js extension

import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const app = express();
const port = process.env.PORT || 5012;


// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// JWT Authentication
app.post("/api/jwt", (req, res) => {
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

app.post("/logout", (req, res) => {
  res.send({ success: true, message: "Logged out" });
});


// MongoDB Connection
const uri = `mongodb+srv://${process.env.STUMATE_DB_USER}:${process.env.STUMATE_DB_PASS}@abnahid.cot7i.mongodb.net/?retryWrites=true&w=majority&appName=abnahid`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

async function run() {
  try {
    const db = client.db("StuMateDB");



    console.log("🛰️  Hey Cortana: MongoDB Atlas connection established...");
    console.log("✅ Database Connected — StuMateDB is ready to serve 🚀");

    // Collections
    const usersCollection = db.collection("users");
    const classesCollection = db.collection("classes");
    const transactionsCollection = db.collection("transactions");
    const tasksCollection = db.collection("tasks");
    const focusSessionsCollection = db.collection("focusSessions");
    const practiceSessionsCollection = db.collection("practiceSessions");
    const journalsCollection = db.collection("journals");
    const postsCollection = db.collection("posts");
    const commentsCollection = db.collection("comments");


    app.get("/api", (req, res) => {
      res.send({ message: "✅ API root is working. Use /api/users, /api/tasks, etc." });
    });


    //  Users
    app.get("/api/users", async (req, res) => {
      const users = await usersCollection.find();
      res.send(users);
    });

    app.get("/api/users/:email", async (req, res) => {
      const user = await usersCollection.findOne({ email: req.params.email });
      res.send(user);
    });

    app.post("/api/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) return res.send({ message: "User already exists", insertedId: null });

      const newUser = {
        ...user,
        role: user.role || 'student',
        university: '',
        department: '',
        grade: ''
      };

      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });


    app.patch("/api/users/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const updatedUser = req.body;

        const filter = { email };
        const updateDoc = { $set: {} };

        for (const [key, value] of Object.entries(updatedUser)) {
          if (key !== "_id" && value !== undefined && value !== null) {
            updateDoc.$set[key] = value;
          }
        }

        const result = await usersCollection.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
          return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User updated successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "Internal server error" });
      }
    });


    app.put("/api/users/:email", async (req, res) => {
      const email = req.params.email;
      const profileData = req.body;
      const allowedUpdates = {
        name: profileData.name,
        university: profileData.university,
        department: profileData.department,
        grade: profileData.grade,
      };

      Object.keys(allowedUpdates).forEach(key => allowedUpdates[key] === undefined && delete allowedUpdates[key]);

      const result = await usersCollection.updateOne({ email }, { $set: allowedUpdates });
      res.send(result);
    });

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const user = await usersCollection.findOne({ email: email });
      if (user?.role !== 'admin') {
        return res.status(403).send({ message: 'Forbidden access: requires admin role' });
      }
      next();
    }

    //  Class Schedule
    app.get("/api/classes/:email", async (req, res) => {
      const result = await classesCollection.find({ email: req.params.email }).toArray();
      res.send(result);
    });

    app.post("/api/classes", async (req, res) => {
      const newClass = req.body;
      const result = await classesCollection.insertOne(newClass);
      res.send(result);
    });

    app.put("/api/classes/:id", async (req, res) => {
      const id = req.params.id;
      const classData = req.body;
      delete classData._id;
      const result = await classesCollection.updateOne({ _id: new ObjectId(id) }, { $set: classData });
      res.send(result);
    });

    app.delete("/api/classes/:id", async (req, res) => {
      const result = await classesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    //  Budget Tracker (Transactions)
    app.get("/api/transactions/:email", async (req, res) => {
      const result = await transactionsCollection.find({ email: req.params.email }).toArray();
      res.send(result);
    });

    app.post("/api/transactions", async (req, res) => {
      const entry = req.body;
      const result = await transactionsCollection.insertOne(entry);
      res.send(result);
    });

    app.put("/api/transactions/:id", async (req, res) => {
      const id = req.params.id;
      const transactionData = req.body;
      delete transactionData._id;
      const result = await transactionsCollection.updateOne({ _id: new ObjectId(id) }, { $set: transactionData });
      res.send(result);
    });

    app.delete("/api/transactions/:id", async (req, res) => {
      const result = await transactionsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    // Study Planner (Tasks)
    app.get("/api/tasks/:email", async (req, res) => {
      const result = await tasksCollection.find({ email: req.params.email }).toArray();
      res.send(result);
    });

    app.post("/api/tasks", async (req, res) => {
      const plan = req.body;
      const result = await tasksCollection.insertOne(plan);
      res.send(result);
    });

    app.put("/api/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const taskData = req.body;
      delete taskData._id;
      const result = await tasksCollection.updateOne({ _id: new ObjectId(id) }, { $set: taskData });
      res.send(result);
    });

    app.patch("/api/tasks/:id", async (req, res) => {
      const { status } = req.body;
      const result = await tasksCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { status } }
      );
      res.send(result);
    });

    app.delete("/api/tasks/:id", async (req, res) => {
      const result = await tasksCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    //  Focus Sessions
    app.get("/api/focus-sessions/:email", async (req, res) => {
      const result = await focusSessionsCollection.find({ email: req.params.email }).toArray();
      res.send(result);
    });

    app.post("/api/focus-sessions", async (req, res) => {
      const session = req.body;
      const result = await focusSessionsCollection.insertOne(session);
      res.send(result);
    });

    //  Exam Prep Sessions
    app.get("/api/practice-sessions/:email", async (req, res) => {
      const result = await practiceSessionsCollection.find({ email: req.params.email }).toArray();
      res.send(result);
    });

    app.post("/api/practice-sessions", async (req, res) => {
      const session = req.body;
      const result = await practiceSessionsCollection.insertOne(session);
      res.send(result);
    });

    app.use("/api/questions", questionsRoutes);

    // Study Journal
    app.get("/api/journals/:email", async (req, res) => {
      const result = await journalsCollection.find({ email: req.params.email }).toArray();
      res.send(result);
    });

    app.post("/api/journals", async (req, res) => {
      const entry = req.body;
      const result = await journalsCollection.insertOne(entry);
      res.send(result);
    });


    // 💬 Community Forum
    app.get('/api/posts', async (req, res) => {
      const { category } = req.query;
      let query = {};
      if (category) {
        query.category = category;
      }
      const posts = await postsCollection.find(query).sort({ createdAt: -1 }).toArray();
      res.send(posts);
    });

    app.get('/api/posts/:id', async (req, res) => {
      const post = await postsCollection.findOne({ _id: new ObjectId(req.params.id) });
      res.send(post);
    });

    app.post('/api/posts', async (req, res) => {
      const post = req.body;

      if (post.category === 'announcements') {
        const user = await usersCollection.findOne({ email: post.authorEmail });
        // For simplicity, we'll assign admin role if a user has a specific email.
        // In a real app, you'd have a proper role field.
        const isAdmin = user?.role === 'admin' || post.authorEmail === 'admin@stumate.com';
        if (!isAdmin) {
          return res.status(403).send({ message: "Forbidden: Only admins can post announcements." });
        }
      }

      post.createdAt = new Date();
      const result = await postsCollection.insertOne(post);
      res.send({ ...post, _id: result.insertedId });
    });

    app.put('/api/posts/:id', async (req, res) => {
      const id = req.params.id;
      const postData = req.body;

      const existingPost = await postsCollection.findOne({ _id: new ObjectId(id) });
      if (!existingPost) {
        return res.status(404).send({ message: "Post not found" });
      }

      if (existingPost.authorEmail !== postData.authorEmail) {
        return res.status(403).send({ message: "Forbidden: You can only edit your own posts." });
      }

      delete postData._id;
      const result = await postsCollection.updateOne({ _id: new ObjectId(id) }, { $set: postData });
      const updatedPost = await postsCollection.findOne({ _id: new ObjectId(id) });
      res.send(updatedPost);
    });

    app.delete('/api/posts/:id', async (req, res) => {
      const id = req.params.id;
      const userEmail = req.body.email;

      const postToDelete = await postsCollection.findOne({ _id: new ObjectId(id) });
      if (!postToDelete) return res.status(404).send({ message: "Post not found" });

      const user = await usersCollection.findOne({ email: userEmail });
      const isAdmin = user?.role === 'admin' || userEmail === 'admin@stumate.com';

      // Only allow deletion if user is the owner or an admin
      if (postToDelete.authorEmail !== userEmail && !isAdmin) {
        return res.status(403).send({ message: "Forbidden: You can only delete your own posts." });
      }

      const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount > 0) {
        await commentsCollection.deleteMany({ postId: id });
        res.send({ ...postToDelete, deleted: true });
      } else {
        res.status(500).send({ message: "Failed to delete post" });
      }
    });

    app.get('/api/comments/:postId', async (req, res) => {
      const comments = await commentsCollection.find({ postId: req.params.postId }).sort({ createdAt: 1 }).toArray();
      res.send(comments);
    });

    app.post('/api/comments', async (req, res) => {
      const comment = req.body;
      comment.createdAt = new Date();
      const result = await commentsCollection.insertOne(comment);
      await postsCollection.updateOne({ _id: new ObjectId(comment.postId) }, { $inc: { commentCount: 1 } });
      res.send({ ...comment, _id: result.insertedId });
    });

  } catch (e) {
    console.error(e);
  } finally {
    console.log("Always runs");
  }
}
run().catch(console.dir);

// Root Endpoint
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>StudentSavvy Server</title></head>
      <body style="font-family: sans-serif; text-align:center; margin-top:50px;">
        <h1>🚀 StudentSavvy Server is Running</h1>
        <p>API is ready for student life management toolkit.</p>
      </body>
    </html>
  `);
});

// Start Server
app.listen(port, () => {
  console.log(`✅ StudentSavvy Server running on port: ${port}`);
});
