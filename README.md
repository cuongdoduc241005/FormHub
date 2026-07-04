# 📋 FormHub

> RESTful API for Dynamic Form Management built with **Node.js**, **Express** and **MySQL**.

---

# 📖 Introduction

FormHub là hệ thống quản lý biểu mẫu (Dynamic Form Management System) được xây dựng theo kiến trúc **Layered Architecture** nhằm đảm bảo khả năng mở rộng, bảo trì và tái sử dụng mã nguồn.

## Chức năng chính

- CRUD Forms
- CRUD Fields
- Submit Form
- Dynamic Validation
- Swagger API Documentation

---

# 🛠 Tech Stack

| Technology | Description           |
| ---------- | --------------------- |
| Node.js    | JavaScript Runtime    |
| Express.js | Backend Framework     |
| MySQL      | Database              |
| Swagger UI | API Documentation     |
| dotenv     | Environment Variables |

---

# 📂 Project Structure

```text
FormHub
│
├── database
│   ├── schema.sql                  # Script khởi tạo cơ sở dữ liệu và dữ liệu mẫu
│   └── schema.png                  # Sơ đồ cơ sở dữ liệu (ERD)
│
├── src
│   │
│   ├── config                      # Cấu hình hệ thống
│   │   └── database.js             # Thiết lập kết nối MySQL
│   │
│   ├── controllers                 # Tiếp nhận request và điều phối xử lý
│   │   ├── form.controller.js
│   │   ├── field.controller.js
│   │   └── submission.controller.js
│   │
│   ├── models                      # Thao tác trực tiếp với cơ sở dữ liệu
│   │   ├── form.model.js
│   │   ├── field.model.js
│   │   └── submission.model.js
│   │
│   ├── routes                      # Định nghĩa các API Endpoint
│   │   ├── form.routes.js
│   │   ├── field.routes.js
│   │   └── submission.routes.js
│   │
│   ├── validators                  # Kiểm tra và xác thực dữ liệu đầu vào
│   │   └── submission.validator.js
│   │
│   ├── middleware                  # Chứa middleware dùng chung (dự phòng mở rộng)
│   │
│   ├── services                    # Chứa business logic (dự phòng mở rộng)
│   │
│   ├── utils                       # Chứa các hàm tiện ích dùng chung (dự phòng mở rộng)
│   │
│   └── app.js                      # Khởi tạo Express và cấu hình ứng dụng
│
├── .env                            # Biến môi trường
├── package.json                    # Thông tin dự án và danh sách dependencies
├── package-lock.json               # Khóa phiên bản các package
├── server.js                       # Entry Point khởi chạy server
├── swagger.yaml                    # Định nghĩa tài liệu OpenAPI (Swagger)
└── README.md                       # Tài liệu hướng dẫn dự án
```

> **Lưu ý:** Các thư mục `middleware`, `services` và `utils` được tạo sẵn theo kiến trúc Layered Architecture để thuận tiện mở rộng hệ thống trong tương lai, mặc dù hiện tại chưa được sử dụng.

---

# 🚀 Installation

## 1. Clone project

```bash
git clone <repository-url>
cd FormHub
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create environment file

Tạo file `.env` tại thư mục gốc.

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=form_hub
```

## 4. Initialize Database

Mở MySQL và chạy file:

```text
database/schema.sql
```

File này sẽ tạo:

- Database `form_hub`
- FORMS
- FIELDS
- SUBMISSIONS

## 5. Start Server

```bash
npm start
```

Nếu thành công sẽ hiển thị:

```text
Server đang chạy tại port 3000
```

---

# 📚 API Documentation

Sau khi chạy server thành công, truy cập:

```text
http://localhost:3000/api-docs
```

Swagger UI hỗ trợ kiểm thử toàn bộ API.

Bao gồm:

- Forms API
- Fields API
- Submission API

---

# ✨ Features

## Forms

- Create Form
- Get All Forms
- Get Form By ID
- Update Form
- Delete Form

## Fields

- Create Field
- Get Fields
- Update Field
- Delete Field

## Submission

- Submit Form
- Server-side Validation
- Validate:
  - Text
  - Number
  - Date
  - Color
  - Select

---

# 🧠 Design Decisions

## Layered Architecture

```
Client
    │
Routes
    │
Controllers
    │
Validators
    │
Models
    │
Database
```

# 🌱 Test Data

Sau khi chạy `database/schema.sql`, hệ thống sẽ tạo sẵn:

- 01 Form mẫu
- 05 Field mẫu (Text, Number, Date, Color, Select)

Reviewer có thể kiểm thử ngay API Submission mà không cần tạo dữ liệu thủ công.

---

# 🧪 Quick Test Guide

Sau khi khởi động server thành công và truy cập Swagger tại:

```text
http://localhost:3000/api-docs
```

Reviewer có thể kiểm thử nhanh theo các bước dưới đây.

## Test 1. Tạo Form

**POST** `/api/forms`

```json
{
  "title": "Employee Survey",
  "description": "Survey for employees",
  "displayOrder": 1,
  "isActive": true
}
```

**Expected Result**

- HTTP 201 Created
- Trả về thông tin Form vừa được tạo.

---

## Test 2. Thêm Field

**POST** `/api/fields`

```json
{
  "formId": 1,
  "label": "Full Name",
  "fieldType": "text",
  "required": true,
  "displayOrder": 1
}
```

**Expected Result**

- HTTP 201 Created
- Field được thêm vào Form.

---

## Test 3. Lấy danh sách Form

**GET**

```text
/api/forms
```

**Expected Result**

- HTTP 200 OK
- Trả về danh sách các Form.

---

## Test 4. Submit Form hợp lệ

**POST**

```text
/api/submissions
```

```json
{
  "formId": 1,
  "responses": {
    "Full Name": "Nguyen Van A"
  }
}
```

**Expected Result**

- HTTP 201 Created
- Submission được lưu thành công.

---

## Test 5. Validation

Thử gửi dữ liệu thiếu trường bắt buộc.

Ví dụ:

```json
{
  "formId": 1,
  "responses": {}
}
```

**Expected Result**

- HTTP 400 Bad Request
- Trả về thông báo validation phù hợp.

---

## Test 6. Xóa Form

**DELETE**

```text
/api/forms/1
```

**Expected Result**

- HTTP 200 OK
- Form bị xóa thành công.

## ✅ Reviewer Checklist

| Chức năng          | Endpoint               | Kết quả mong đợi |
| ------------------ | ---------------------- | ---------------- |
| Tạo Form           | POST /api/forms        | 201 Created      |
| Lấy danh sách Form | GET /api/forms         | 200 OK           |
| Thêm Field         | POST /api/fields       | 201 Created      |
| Submit Form        | POST /api/submissions  | 201 Created      |
| Validation         | POST /api/submissions  | 400 Bad Request  |
| Xóa Form           | DELETE /api/forms/{id} | 200 OK           |

### Design Principles

- Controller không chứa câu lệnh SQL.
- Model chỉ chịu trách nhiệm thao tác với cơ sở dữ liệu.
- Validator được tách riêng nhằm đảm bảo khả năng tái sử dụng và dễ bảo trì.
- Mỗi tầng chỉ đảm nhận một trách nhiệm duy nhất (Single Responsibility Principle).

---

# Error Handling

Trong phạm vi bài test, việc xử lý lỗi được thực hiện trực tiếp tại Controller nhằm:

- Đảm bảo server luôn hoạt động ổn định.
- Trả về JSON Response thống nhất.
- Giảm khả năng crash trong quá trình review.

---

# Future Improvements

Nếu có thêm thời gian, dự án sẽ được mở rộng với các tính năng:

- Unified Error Middleware
- Unit Test
- Pagination
- Authentication & Authorization
- Docker Compose
- Logging
- Rate Limiting
- CI/CD Pipeline

---

# Author

**Đỗ Đức Cường**

Fullstack Develop Intern

Node.js • Express • MySQL
