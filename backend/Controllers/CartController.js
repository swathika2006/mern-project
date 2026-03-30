

import usermodel from "../Models/UserModel.js";

/* ================= ADD TO CART ================= */
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size } = req.body;

    const user = await usermodel.findById(userId);
    let cartData = user.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await usermodel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= UPDATE CART ================= */
const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size, quantity } = req.body;

    const user = await usermodel.findById(userId);
    let cartData = user.cartData || {};

    if (!cartData[itemId]) {
      return res.json({ success: false });
    }

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    await usermodel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= GET USER CART ================= */
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await usermodel.findById(userId);

    res.json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, updateCart, getUserCart };