const FieldModel = require("../models/field.model");
const FormModel = require("../models/form.model");

const FieldController = {
  // Tạo field mới cho form
  create: async (req, res) => {
    try {
      const form = await FormModel.getById(req.params.formId);

      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy form",
        });
      }

      const fieldId = await FieldModel.create(req.params.formId, req.body);

      return res.status(201).json({
        success: true,
        message: "Thêm field thành công",
        fieldId,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Cập nhật field
  update: async (req, res) => {
    try {
      const field = await FieldModel.getById(req.params.fieldId);

      if (!field) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy field",
        });
      }

      await FieldModel.update(req.params.fieldId, req.body);

      return res.status(200).json({
        success: true,
        message: "Cập nhật field thành công",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Xóa field
  delete: async (req, res) => {
    try {
      const field = await FieldModel.getById(req.params.fieldId);

      if (!field) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy field",
        });
      }

      await FieldModel.delete(req.params.fieldId);

      return res.status(200).json({
        success: true,
        message: "Xóa field thành công",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = FieldController;
