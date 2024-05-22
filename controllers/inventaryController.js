const userModel = require("../models/userModel");
const inventaryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");
const createInventaryController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    if (req.body.inventaryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      const totalInOfRequestedBlood = await inventaryModel.aggregate([
        {
          $match: {
            organisation,
            inventaryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      const totalOutOfRequestedBlood = await inventaryModel.aggregate([
        {
          $match: {
            organisation,
            inventaryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBlood[0]?.total || 0;
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup} mL of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }
    const inventary = new inventaryModel(req.body);
    await inventary.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Creating Inventary API",
      error,
    });
  }
};
const getInventoryController = async (req, res) => {
  try {
    const inventary = await inventaryModel
      .find({ organisation: req.body.userId })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: "true",
      message: "Get Records Successfully",
      inventary,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Getting Inventary",
      error,
    });
  }
};
const getDonarsControllers = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const donarId = await inventaryModel.distinct("donar", {
      organisation,
    });
    const donars = await userModel.find({ _id: { $in: donarId } });
    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};
const getHospitalControllers = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const hospitalId = await inventaryModel.distinct("hospital", {
      organisation,
    });
    const hospitals = await userModel.find({ _id: { $in: hospitalId } });
    return res.status(200).send({
      success: true,
      message: "Hospital Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital API",
      error,
    });
  }
};
const getOrganisationControllers = async (req, res) => {
  try {
    const donar = req.body.userId;
    const organisationId = await inventaryModel.distinct("organisation", {
      donar,
    });
    const orgs = await userModel.find({ _id: { $in: organisationId } });
    return res.status(200).send({
      success: true,
      message: "Organisation Data Fetched Successfully",
      orgs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Organisation API",
      error,
    });
  }
};
const getOrganisationForHospitalControllers = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const organisationId = await inventaryModel.distinct("organisation", {
      hospital,
    });
    const orgs = await userModel.find({ _id: { $in: organisationId } });
    return res.status(200).send({
      success: true,
      message: "Hospital Organisation Data Fetched Successfully",
      orgs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital Organisation API",
      error,
    });
  }
};
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventary = await inventaryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: "true",
      message: "Get Records of Hospital Successfully",
      inventary,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Getting Hospital Inventary",
      error,
    });
  }
};
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventaryModel
      .find({
        organisation: req.bosy.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Recent Inventary",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Inventary",
      error,
    });
  }
};
module.exports = {
  createInventaryController,
  getInventoryController,
  getDonarsControllers,
  getHospitalControllers,
  getOrganisationControllers,
  getOrganisationForHospitalControllers,
  getInventoryHospitalController,
  getRecentInventoryController,
};
