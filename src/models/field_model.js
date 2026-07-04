const db = require("../config/database");

const FieldModel = {
  // Thêm field mới vào form
  create: async (formId, fieldData) => {
    const { label, type, order, required, options } = fieldData;

    const [result] = await db.query(
      `
      INSERT INTO FIELDS
      (
        FORM_ID,
        FIELD_LABEL,
        FIELD_TYPE,
        FIELD_ORDER,
        FIELD_REQUIRED,
        FIELD_OPTIONS
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        formId,
        label,
        type,
        order ?? 0,
        required ? 1 : 0,
        options ? JSON.stringify(options) : null,
      ],
    );

    return result.insertId;
  },

  // Lấy danh sách field theo form
  getByFormId: async (formId) => {
    const [rows] = await db.query(
      `
      SELECT
        FIELD_ID AS id,
        FORM_ID AS formId,
        FIELD_LABEL AS label,
        FIELD_TYPE AS type,
        FIELD_ORDER AS \`order\`,
        FIELD_REQUIRED AS required,
        FIELD_OPTIONS AS options
      FROM FIELDS
      WHERE FORM_ID = ?
      ORDER BY FIELD_ORDER ASC
      `,
      [formId],
    );

    return rows;
  },

  // Lấy field theo ID
  getById: async (id) => {
    const [rows] = await db.query(
      `
      SELECT
        FIELD_ID AS id,
        FORM_ID AS formId,
        FIELD_LABEL AS label,
        FIELD_TYPE AS type,
        FIELD_ORDER AS \`order\`,
        FIELD_REQUIRED AS required,
        FIELD_OPTIONS AS options
      FROM FIELDS
      WHERE FIELD_ID = ?
      `,
      [id],
    );

    return rows[0];
  },

  // Cập nhật field
  update: async (id, fieldData) => {
    const { label, type, order, required, options } = fieldData;

    await db.query(
      `
      UPDATE FIELDS
      SET
        FIELD_LABEL = ?,
        FIELD_TYPE = ?,
        FIELD_ORDER = ?,
        FIELD_REQUIRED = ?,
        FIELD_OPTIONS = ?
      WHERE FIELD_ID = ?
      `,
      [
        label,
        type,
        order,
        required ? 1 : 0,
        options ? JSON.stringify(options) : null,
        id,
      ],
    );
  },

  // Xóa field
  delete: async (id) => {
    await db.query(
      `
      DELETE FROM FIELDS
      WHERE FIELD_ID = ?
      `,
      [id],
    );
  },
};

module.exports = FieldModel;
