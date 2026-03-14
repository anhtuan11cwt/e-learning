export const register = async (_req, res) => {
  try {
    res.send("API Đăng ký");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
