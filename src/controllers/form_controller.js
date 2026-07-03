const FormModel = require("../models/form.model");
const FieldModel = require("../models/field.model");

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
};

module.exports = FormController;
