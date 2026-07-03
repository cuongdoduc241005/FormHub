const db = require("../config/database");

const FormModel = {
  // Tạo form mới
  create: async (formData) => {
    const { title, description, order, status } = formData;

    const [result] = await db.query(
      `
      INSERT INTO FORMS
      (
        FORM_TITLE,
        FORM_DESCRIPTION,
        FORM_ORDER,
        FORM_STATUS
      )
      VALUES (?, ?, ?, ?)
      `,
      [title, description, order ?? 0, status ?? "DRAFT"],
    );

    return result.insertId;
  },

  // Lấy danh sách tất cả form
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT *
      FROM FORMS
      ORDER BY FORM_ORDER ASC
    `);

    return rows;
  },

  // Lấy form theo ID
  getById: async (id) => {
    const [rows] = await db.query(
      `
      SELECT *
      FROM FORMS
      WHERE FORM_ID = ?
      `,
      [id],
    );

    return rows[0];
  },

  // Cập nhật form
  update: async (id, formData) => {
    const { title, description, order, status } = formData;

    await db.query(
      `
      UPDATE FORMS
      SET
        FORM_TITLE = ?,
        FORM_DESCRIPTION = ?,
        FORM_ORDER = ?,
        FORM_STATUS = ?
      WHERE FORM_ID = ?
      `,
      [title, description, order, status, id],
    );
  },

  // Xóa form
  delete: async (id) => {
    await db.query(
      `
      DELETE FROM FORMS
      WHERE FORM_ID = ?
      `,
      [id],
    );
  },
};

module.exports = FormModel;
