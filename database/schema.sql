CREATE DATABASE IF NOT EXISTS FORM_HUB;
USE FORM_HUB;

CREATE TABLE IF NOT EXISTS FORMS (
	FORM_ID INT AUTO_INCREMENT PRIMARY KEY,
    FORM_TITLE VARCHAR(255) NOT NULL,
    FORM_DESCRIPTION TEXT,
	FORM_ORDER INT DEFAULT 0,
    FORM_STATUS ENUM('ACTIVE','DRAFT') DEFAULT 'DRAFT',
    FORM_CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE IF NOT EXISTS FIELDS (
	FIELDS_ID INT AUTO_INCREMENT PRIMARY KEY,
    FORM_ID INT NOT NULL,
    FIELD_LABEL VARCHAR(255) NOT NULL,
    FIELD_TYPE ENUM('text','number','date','color','select') NOT NULL,
    FIELD_ORDER INT DEFAULT 0,
    FIELD_REQUIRED BOOLEAN DEFAULT FALSE,
	FIELD_SELECT JSON DEFAULT NULL, -- Lưu danh sách mảng cho trường select
    FOREIGN KEY (FORM_ID) REFERENCES FORMS(FORM_ID) ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS SUBMISSIONS (
	SUBMISSION_ID INT AUTO_INCREMENT PRIMARY KEY,
    FORM_ID INT NOT NULL,
    SUBMISSION_ANSWERS JSON NOT NULL, -- Lưu cặp key-value của các câu trả lời
    SUBMISSION_CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (FORM_ID) REFERENCES FORMS(FORM_ID) ON DELETE CASCADE
);

USE FORM_HUB;

-- Dữ liệu mẫu
-- Dữ liệu bảng FORMS
INSERT INTO FORMS
(FORM_TITLE, FORM_DESCRIPTION, FORM_ORDER, FORM_STATUS)
VALUES
('Thông tin sinh viên',
 'Biểu mẫu thu thập thông tin sinh viên mới',
 1,
 'ACTIVE'),

('Khảo sát mức độ hài lòng',
 'Khảo sát sau khi sử dụng dịch vụ',
 2,
 'ACTIVE'),

('Đăng ký sự kiện',
 'Biểu mẫu đăng ký tham gia workshop',
 3,
 'DRAFT');


-- Dữ liệu bảng FIELDS

-- Form 1
INSERT INTO FIELDS
(FORM_ID, FIELD_LABEL, FIELD_TYPE, FIELD_ORDER, FIELD_REQUIRED)
VALUES
(1, 'Họ và tên', 'text', 1, TRUE),
(1, 'Tuổi', 'number', 2, TRUE),
(1, 'Ngày sinh', 'date', 3, TRUE),
(1, 'Màu yêu thích', 'color', 4, FALSE);

-- Form 2
INSERT INTO FIELDS
(FORM_ID, FIELD_LABEL, FIELD_TYPE, FIELD_ORDER, FIELD_REQUIRED, FIELD_SELECT)
VALUES
(
    2,
    'Mức độ hài lòng',
    'select',
    1,
    TRUE,
    JSON_ARRAY(
        'Rất hài lòng',
        'Hài lòng',
        'Bình thường',
        'Không hài lòng'
    )
);

INSERT INTO FIELDS
(FORM_ID, FIELD_LABEL, FIELD_TYPE, FIELD_ORDER, FIELD_REQUIRED)
VALUES
(2, 'Góp ý', 'text', 2, FALSE);

-- Form 3
INSERT INTO FIELDS
(FORM_ID, FIELD_LABEL, FIELD_TYPE, FIELD_ORDER, FIELD_REQUIRED)
VALUES
(3, 'Họ tên', 'text', 1, TRUE),
(3, 'Ngày tham gia', 'date', 2, TRUE);


-- Dữ liệu bảng SUBMISSIONS
INSERT INTO SUBMISSIONS
(FORM_ID, SUBMISSION_ANSWERS)
VALUES
(
    1,
    JSON_OBJECT(
        'Họ và tên', 'Nguyễn Văn A',
        'Tuổi', 20,
        'Ngày sinh', '2005-03-15',
        'Màu yêu thích', '#ff0000'
    )
),
(
    1,
    JSON_OBJECT(
        'Họ và tên', 'Trần Thị B',
        'Tuổi', 21,
        'Ngày sinh', '2004-10-08',
        'Màu yêu thích', '#0000ff'
    )
),
(
    2,
    JSON_OBJECT(
        'Mức độ hài lòng', 'Rất hài lòng',
        'Góp ý', 'Dịch vụ rất tốt'
    )
),
(
    2,
    JSON_OBJECT(
        'Mức độ hài lòng', 'Hài lòng',
        'Góp ý', 'Cần cải thiện tốc độ'
    )
);