const moment = require("moment");
const transactionModel = require("../models/transactionModel.js");
const { default: ConsoleHelperBackend } = require("../ConsoleHelperBackend.js");

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transaction = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: { $gt: moment().subtract(Number(frequency), "d").toDate() },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transaction);
  } catch (error) {
    ConsoleHelperBackend(error);
    res.status(500).json(error);
  }
};

const deleteTransaction=async(req,res)=>{
  try {
    await transactionModel.findOneAndDelete({_id:req.body.transactionId})
    res.status(200).send('Deleted successful!')
  } catch (error) {
    ConsoleHelperBackend(error);
    res.status(500).json(error)
  }
}

const editTransaction=async(req,res)=>{
  try {
    await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload)
    res.status(200).send('Edit successful!')
  } catch (error) {
    ConsoleHelperBackend(error);
    res.status(500).json(error)
  }
}

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    ConsoleHelperBackend(newTransaction);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    ConsoleHelperBackend(error);
    res.status(500).json(error);
  }
};


module.exports = { getAllTransaction, addTransaction, editTransaction, deleteTransaction};
