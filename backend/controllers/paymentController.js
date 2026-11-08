import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import qs from "qs";
import Payment from "../models/Payment.js";
import Enrollment from "../models/Enrollment.js";

export const initiatePayment = async (req, res) => {
  try {
    const { courses } = req.body;

    const user = req.user;

    if (!courses || courses.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const amount =
      courses.length * Number(process.env.COURSE_PRICE);

    const transactionId = uuidv4();

    // Save pending payment
    await Payment.create({
      userId: user._id,
      courses,
      amount,
      transactionId,
      status: "Pending",
    });
    console.log("Store ID:", process.env.SSLC_STORE_ID);
console.log("Store Password:", process.env.SSLC_STORE_PASSWORD);

    const paymentData = {
      store_id: process.env.SSLC_STORE_ID,
      store_passwd: process.env.SSLC_STORE_PASSWORD,

      total_amount: amount,
      currency: "BDT",

      tran_id: transactionId,

      success_url: "http://localhost:5001/api/payment/success",
      fail_url: "http://localhost:5001/api/payment/fail",
      cancel_url: "http://localhost:5001/api/payment/cancel",
      ipn_url: "http://localhost:5001/api/payment/success",

      shipping_method: "NO",

      product_name: "CoDivas Courses",
      product_category: "Online Course",
      product_profile: "general",

      cus_name: user.name,
      cus_email: user.email,
      cus_add1: "Chattogram",
      cus_city: "Chattogram",
      cus_postcode: "4000",
      cus_country: "Bangladesh",
      cus_phone: "01700000000",
    };

    

const sslResponse = await axios.post(
  "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
  qs.stringify(paymentData),
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }
);



if (!sslResponse.data.GatewayPageURL) {
  return res.status(400).json({
    message: "Unable to create payment session",
    sslResponse: sslResponse.data,
  });
}

    return res.status(200).json({
      paymentUrl: sslResponse.data.GatewayPageURL,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const paymentSuccess = async (req, res) => {
  try {

    
    const tran_id =
      req.body.tran_id ||
      req.query.tran_id;

    if (!tran_id) {
      return res.status(400).send("Transaction ID missing");
    }

    const payment = await Payment.findOne({
      transactionId: tran_id,
    });

    if (!payment) {
      return res.status(404).send("Payment not found");
    }


    payment.status = "Completed";
    await payment.save();


    for (const courseId of payment.courses) {

      const alreadyEnrolled = await Enrollment.findOne({
        userId: payment.userId,
        courseId,
      });

      if (!alreadyEnrolled) {
        await Enrollment.create({
          userId: payment.userId,
          courseId,
          paymentStatus:"Completed"
        });
      }
    }


    return res.redirect(
      "http://localhost:5173/payment-success"
    );


  } catch(error){

    console.log(error);
    res.status(500).send("Payment Success Error");

  }
};

export const paymentFail = async (req, res) => {

  try {

    const { tran_id } = req.body;

    await Payment.findOneAndUpdate(
      {
        transactionId: tran_id,
      },
      {
        status: "Failed",
      }
    );

    return res.redirect("http://localhost:5173/payment-failed");

  } catch (error) {

    console.error(error);

    return res.status(500).send("Payment Failed");

  }

};

export const paymentCancel = async (req, res) => {

  try {

    const { tran_id } = req.body;

    await Payment.findOneAndUpdate(
      {
        transactionId: tran_id,
      },
      {
        status: "Cancelled",
      }
    );

    return res.redirect("http://localhost:5173/payment-cancelled");

  } catch (error) {

    console.error(error);

    return res.status(500).send("Payment Cancelled");

  }

};
export const getPaymentHistory = async (req, res) => {
  try {

    const payments = await Payment.find({
      userId: req.user._id
    })
    .sort({ createdAt: -1 });

    res.status(200).json(payments);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to get payment history"
    });

  }
};