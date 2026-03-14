# Tài Liệu API Quản Trị (Admin) 🛠️

## Thông Tin Chung

- **Base URL**: `http://localhost:5000/api/admin`
- **Authentication**: Yêu cầu `token` của tài khoản có quyền `admin` trong Headers.
- **Content-Type**: `multipart/form-data` (cho các API có tải lên hình ảnh/video) hoặc `application/json`.

---

## 📌 Danh Mục API

1. [Tạo Khóa Học Mới](#1-api-tao-khoa-hoc-moi)
2. [Cập Nhật Khóa Học](#2-api-cap-nhat-khoa-hoc)
3. [Xóa Khóa Học](#3-api-xoa-khoa-hoc)
4. [Thêm Bài Giảng Vào Khóa Học](#4-api-them-bai-giang-vao-khoa-hoc)

---

## 1. API Tạo Khóa Học Mới

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `POST` |
| **Endpoint** | `/api/admin/create` |
| **URL đầy đủ** | `http://localhost:5000/api/admin/create` |
| **Authentication** | Yêu cầu `token` (Admin) |

### Headers

```
token: <your_admin_jwt_token_here>
```

### Request Body (form-data)

Vì API này cho phép tải lên hình ảnh, bạn cần sử dụng định dạng `form-data` trong Postman.

| Key | Type | Value | Mô tả |
|-----|------|-------|-------|
| `title` | Text | "Khóa học React nâng cao" | Bắt buộc |
| `description` | Text | "Mô tả về khóa học..." | Bắt buộc |
| `category` | Text | "Web Development" | Bắt buộc |
| `createdBy` | Text | "Admin Name" | Bắt buộc |
| `duration` | Text | "10 weeks" | Bắt buộc |
| `price` | Text | "500000" | Bắt buộc |
| `file` | File | [Chọn ảnh] | Hình ảnh xem trước của khóa học |

### Response Thành Công (201 Created)

```json
{
  "message": "Tạo khóa học thành công"
}
```

### Response Lỗi

#### 403 Forbidden - Không có quyền Admin

```json
{
  "message": "Bạn không có quyền truy cập này"
}
```

---

## 2. API Cập Nhật Khóa Học

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `PUT` |
| **Endpoint** | `/api/admin/update/:id` |
| **URL đầy đủ** | `http://localhost:5000/api/admin/update/:id` |
| **Authentication** | Yêu cầu `token` (Admin) |

### Headers

```
token: <your_admin_jwt_token_here>
```

### Request Body (form-data)

Các trường là tùy chọn, chỉ gửi các trường cần cập nhật.

| Key | Type | Value | Mô tả |
|-----|------|-------|-------|
| `title` | Text | "Tên mới" | Tiêu đề khóa học |
| `description` | Text | "Mô tả mới" | Mô tả khóa học |
| `category` | Text | "New Category" | Danh mục |
| `createdBy` | Text | "New Creator" | Người tạo |
| `duration` | Text | "12 weeks" | Thời lượng |
| `price` | Text | "600000" | Giá |
| `file` | File | [Ảnh mới] | Hình ảnh xem trước mới |

### Response Thành Công (200 OK)

```json
{
  "course": {
    "_id": "65f3a...",
    "title": "Tên mới",
    "description": "Mô tả mới",
    "category": "New Category",
    "createdBy": "New Creator",
    "duration": "12 weeks",
    "image": "https://cloudinary.com/...",
    "price": 600000
  },
  "message": "Cập nhật khóa học thành công"
}
```

---

## 3. API Xóa Khóa Học

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `DELETE` |
| **Endpoint** | `/api/admin/delete/:id` |
| **URL đầy đủ** | `http://localhost:5000/api/admin/delete/:id` |
| **Authentication** | Yêu cầu `token` (Admin) |

### Response Thành Công (200 OK)

```json
{
  "message": "Xóa khóa học thành công"
}
```

#### 404 Not Found

```json
{
  "message": "Không tìm thấy khóa học"
}
```

---

## 4. API Thêm Bài Giảng Vào Khóa Học

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `POST` |
| **Endpoint** | `/api/admin/course/:id` |
| **URL đầy đủ** | `http://localhost:5000/api/admin/course/:id` |
| **Authentication** | Yêu cầu `token` (Admin) |

### Headers

```
token: <your_admin_jwt_token_here>
```

### Request Body (form-data)

| Key | Type | Value | Mô tả |
|-----|------|-------|-------|
| `title` | Text | "Bài 1: Giới thiệu" | Tiêu đề bài giảng (Bắt buộc) |
| `description` | Text | "Nội dung bài học..." | Mô tả bài giảng (Bắt buộc) |
| `file` | File | [Chọn video] | Video bài giảng |

### Response Thành Công (201 Created)

```json
{
  "lecture": {
    "_id": "65f3z...",
    "course": "65f3a...",
    "title": "Bài 1: Giới thiệu",
    "description": "Nội dung bài học...",
    "video": "https://cloudinary.com/..."
  },
  "message": "Đã thêm bài giảng thành công"
}
```

### Response Lỗi

#### 404 Not Found - Không tìm thấy khóa học

```json
{
  "message": "Không tìm thấy khóa học với ID này"
}
```
