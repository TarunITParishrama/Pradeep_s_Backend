import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const mongoURI = "mongodb+srv://pradeep:eshwar@deeps.ygmdr8x.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, {
    dbName: "ambulanceData",
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
dotenv.config();



const app = express();
const PORT = process.env.PORT || 2012;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API is running...');
});

import AmbulanceRoutes from "./routes/ambulance.route";
app.use('/',AmbulanceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
