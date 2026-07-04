const FormModel = require("../models/form.model");
const FieldModel = require("../models/field.model");
const SubmissionModel = require("../models/submission.model");
const { validateSubmission } = require("../validators/submission.validator");

const FormController = {
  // Tạo form mới
  create: async (req, res) => {
    try {
      const insertId = await FormModel.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Tạo form thành công",
        formId: insertId,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Lấy danh sách tất cả form
  getAll: async (req, res) => {
    try {
      const forms = await FormModel.getAll();

      return res.status(200).json({
        success: true,
        data: forms,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Lấy chi tiết form theo ID
  getById: async (req, res) => {
    try {
      const form = await FormModel.getById(req.params.formId);

      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy form",
        });
      }

      // Lấy danh sách field thuộc form
      const fields = await FieldModel.getByFormId(req.params.formId);

      return res.status(200).json({
        success: true,
        data: {
          ...form,
          fields,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Cập nhật form
  update: async (req, res) => {
    try {
      const form = await FormModel.getById(req.params.formId);

      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy form",
        });
      }

      await FormModel.update(req.params.formId, req.body);

      return res.status(200).json({
        success: true,
        message: "Cập nhật form thành công",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Xóa form
  delete: async (req, res) => {
    try {
      const form = await FormModel.getById(req.params.formId);

      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy form",
        });
      }

      await FormModel.delete(req.params.formId);

      return res.status(200).json({
        success: true,
        message: "Xóa form thành công",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Dành cho nhân viên SW
  // Lấy danh sách form đang hoạt động
  getActive: async (req, res) => {
    try {
      const forms = await FormModel.getActiveForms();

      return res.status(200).json({
        success: true,
        data: forms,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Nộp form
  submit: async (req, res) => {
    try {
      const formId = req.params.formId;
      const { answers } = req.body;

      // Kiểm tra form có tồn tại và đang hoạt động
      const form = await FormModel.getById(formId);

      if (!form || form.status !== "ACTIVE") {
        return res.status(404).json({
          success: false,
          message: "Form không tồn tại hoặc chưa được kích hoạt",
        });
      }

      // Lấy danh sách field của form
      const fields = await FieldModel.getByFormId(formId);

      // Kiểm tra dữ liệu đầu vào
      const validation = validateSubmission(fields, answers ?? {});

      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Dữ liệu không hợp lệ",
          errors: validation.errors,
        });
      }

      // Lưu kết quả submit
      const submissionId = await SubmissionModel.create(formId, answers);

      return res.status(201).json({
        success: true,
        message: "Nộp form thành công",
        submissionId,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = FormController;
