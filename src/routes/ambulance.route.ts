import express from "express";
import { addAmbulanceRecords, getAllAmbulanceRecords, getDistinctAreas, getVillagesForPanchayat } from "../controller/ambulance.controller";

const router = express.Router();

router.post("/api/addambulancerecords", addAmbulanceRecords);
router.get("/api/getambulancerecords", getAllAmbulanceRecords);
router.get("/api/getDistinctAreas", getDistinctAreas);
router.get("/api/getVillagesForPanchayat/:areaName", getVillagesForPanchayat);

export default router;
