const SubmissionModel = require("../models/submission.model");

const SubmissionController = {
  // Lấy danh sách tất cả submission
  getAll: async (req, res) => {
    try {
      const submissions = await SubmissionModel.getAll();

      return res.status(200).json({
        success: true,
        data: submissions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = SubmissionController;
