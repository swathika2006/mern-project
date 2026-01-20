import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized login",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach userId safely
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authUser;
