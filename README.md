project-root/
│
├── database/ // Quản lý tài nguyên cơ sở dữ liệu
│ └── schema.sql // Cấu trúc CSDL
├── src/ // Mã nguồn chính của hệ thống
│ ├── config/ // Cấu hình ứng dụng
│ │ └── database.js // Thiết lập kết nối MySQL
│ ├── routes/ // Khai báo các API endpoint và ánh xạ đến Controller
│ ├── controllers/ // Tiếp nhận Request, gọi Service và trả về Response
│ ├── services/ // Chứa Business Logic (nghiệp vụ của hệ thống)
│ ├── models/ // Định nghĩa các thực thể và thao tác với cơ sở dữ liệu
│ │ └── form_model.js
│ ├── validators/ // Kiểm tra tính hợp lệ của dữ liệu đầu vào
│ ├── middleware/ // Middleware (xác thực, xử lý lỗi, logging, ...)
│ ├── utils/ // Các hàm tiện ích dùng chung
│ └── app.js // Khởi tạo ứng dụng Express và cấu hình middleware
├── server.js // Điểm khởi động (Entry Point) của ứng dụng
├── .env // Biến môi trường (DB, PORT, SECRET_KEY, ...)
├── .gitignore // Danh sách file/thư mục không đưa lên Git
├── package.json // Thông tin dự án, dependencies và scripts
└── README.md // Tài liệu hướng dẫn cài đặt và sử dụng dự án
