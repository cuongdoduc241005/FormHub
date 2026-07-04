const db = require("../config/database");

const SubmissionModel = {
  // Tạo submission mới
  create: async (formId, answers) => {
    const [result] = await db.query(
      `
      INSERT INTO SUBMISSIONS
      (
        FORM_ID,
        SUBMISSION_ANSWERS
      )
      VALUES (?, ?)
      `,
      [formId, JSON.stringify(answers)],
    );

    return result.insertId;
  },

  // Lấy danh sách tất cả submission
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT
        SUBMISSION_ID AS id,
        FORM_ID AS formId,
        SUBMISSION_ANSWERS AS answers,
        SUBMISSION_CREATED_AT AS createdAt
      FROM SUBMISSIONS
      ORDER BY SUBMISSION_CREATED_AT DESC
    `);

    return rows;
  },
};

module.exports = SubmissionModel;
