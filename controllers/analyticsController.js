const inventoryModel = require("../models/inventoryModel");
const mongoose = require('mongoose')
//Get blood data
const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    const organisation = new mongoose.Types.ObjectId(req.body.userId);
    //Get Single Blood group
    await Promise.all(bloodGroups.map (async (bloodGroup) => {
     // count  total in
     const totalIn = await inventoryModel.aggregate([
       {
         $match: {
           bloodGroup: bloodGroup,
           inventoryType: "in",
           organisation,
         },
       },
       {
         $group: {
           _id: null,
           total: { $sum: "$quantity" },
         },
       },
     ]);
      // count  total OUT
      const totalOut = await inventoryModel.aggregate([
       {
         $match: {
           bloodGroup: bloodGroup,
           inventoryType: "out",
           organisation,
         },
       },
       {
         $group: {
           _id: null,
           total: { $sum: "$quantity" },
         },
       },
     ]);
     //calculate Total
     const availabeBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0)
     //Push Data
     bloodGroupData.push({
      bloodGroup,
      totalIn: totalIn[0]?.total || 0,
      totalOut: totalOut[0]?.total || 0,
      availabeBlood
     })

   }))

    return res.status(200).send({
     success:true,
     message:'Blood Group Data Fetch Successfully',
     bloodGroupData,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In BloodGroup Data Analytics API",
      error,
    });
  }
};

module.exports = { bloodGroupDetailsController };
