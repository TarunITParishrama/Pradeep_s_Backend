import express from "express";
import { addAmbulanceRecords, getAllAmbulanceRecords } from "../controller/ambulance.controller";

const router = express.Router();

router.post("/api/addambulancerecords", addAmbulanceRecords);
router.get("/api/getambulancerecords", getAllAmbulanceRecords);

export default router;
