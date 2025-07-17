import { Request, Response } from "express";
import { Ambulance } from "../models/Ambulance";

// Add record(s)
export const addAmbulanceRecords = async (req: Request, res: Response) => {
  try {
    const records = Array.isArray(req.body) ? req.body : [req.body];
    const cleanedData = records.map((rec) => ({
      ...rec,
      villageOrWard: rec.villageOrWard || rec.areaName, // fallback if missing
    }));
    const result = await Ambulance.insertMany(cleanedData);
    res.status(201).json({ message: "Records added successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to add records", error });
  }
};

// Get all records
export const getAllAmbulanceRecords = async (req: Request, res: Response) => {
  try {
    const toNumber = (value: unknown, defaultValue: number): number => {
      if (Array.isArray(value)) value = value[0];
      const parsed = parseInt(value as string, 10);
      return isNaN(parsed) ? defaultValue : parsed;
    };

    const page = toNumber(req.query.page, 1);
    const limit = toNumber(req.query.limit, 10);

    const skip = (page - 1) * limit;

    const filters: any = {};
    if (req.query.areaType) {
      filters.areaType = { $regex: new RegExp(`^${req.query.areaType}$`, "i") };
    }
    if (req.query.selectedArea) {
      filters.areaName = {
        $regex: new RegExp(`^${req.query.selectedArea}$`, "i"),
      };
    }

    const [records, total] = await Promise.all([
      Ambulance.find(filters).skip(skip).limit(limit),
      Ambulance.countDocuments(filters),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      status: "success",
      data: records,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching ambulance records:", error);
    res.status(500).json({
      message: "Failed to fetch ambulance records",
      error,
    });
  }
};

//area names(panchayat or ward number)
export const getDistinctAreas = async (req: Request, res: Response) => {
  try {
    const panchayats = await Ambulance.distinct("areaName", { areaType: "Panchayat" });
    const wards = await Ambulance.distinct("areaName", { areaType: "Ward" });

    res.status(200).json({
      panchayats,
      wards
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch areas", error });
  }
};

