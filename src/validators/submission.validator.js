const validateSubmission = (fields, answers) => {
  const errors = [];

  fields.forEach((field) => {
    const value = answers[field.id];

    // 1. Kiểm tra trường bắt buộc
    if (
      field.required &&
      (value === undefined || value === null || value === "")
    ) {
      errors.push({
        fieldId: field.id,
        message: `Trường "${field.label}" là bắt buộc.`,
      });

      return;
    }

    // Trường hợp không bắt buộc và không nhập
    if (value === undefined || value === null || value === "") {
      return;
    }

    // 2. Kiểm tra theo kiểu dữ liệu
    switch (field.type) {
      case "text":
        if (typeof value !== "string" || value.length > 200) {
          errors.push({
            fieldId: field.id,
            message: `Trường "${field.label}" phải là chuỗi và tối đa 200 ký tự.`,
          });
        }
        break;

      case "number": {
        const number = Number(value);

        if (Number.isNaN(number) || number < 0 || number > 100) {
          errors.push({
            fieldId: field.id,
            message: `Trường "${field.label}" phải là số trong khoảng từ 0 đến 100.`,
          });
        }
        break;
      }

      case "date": {
        const inputDate = new Date(value);
        const today = new Date();

        // Chỉ so sánh ngày
        today.setHours(0, 0, 0, 0);

        if (Number.isNaN(inputDate.getTime()) || inputDate < today) {
          errors.push({
            fieldId: field.id,
            message: `Trường "${field.label}" không được là ngày trong quá khứ.`,
          });
        }
        break;
      }

      case "color": {
        const hexRegex = /^#[0-9A-Fa-f]{6}$/;

        if (!hexRegex.test(value)) {
          errors.push({
            fieldId: field.id,
            message: `Trường "${field.label}" phải là mã màu HEX hợp lệ.`,
          });
        }
        break;
      }

      case "select": {
        let options = field.options;

        // Nếu lấy từ MySQL dưới dạng string thì parse
        if (typeof options === "string") {
          try {
            options = JSON.parse(options);
          } catch (error) {
            errors.push({
              fieldId: field.id,
              message: `Danh sách lựa chọn của "${field.label}" không hợp lệ.`,
            });

            break;
          }
        }

        if (!Array.isArray(options) || !options.includes(value)) {
          errors.push({
            fieldId: field.id,
            message: `Giá trị của "${field.label}" không nằm trong danh sách cho phép.`,
          });
        }

        break;
      }

      default:
        errors.push({
          fieldId: field.id,
          message: `Kiểu dữ liệu "${field.type}" chưa được hỗ trợ.`,
        });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateSubmission,
};
