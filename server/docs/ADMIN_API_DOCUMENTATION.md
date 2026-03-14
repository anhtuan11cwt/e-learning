# Tài Liệu API Quản Trị (Admin)

## Thông Tin Chung

- **Base URL**: `http://localhost:5000/api/admin`
- **Authentication**: Yêu cầu `token` của tài khoản có quyền `admin` trong Headers.
- **Content-Type**: `multipart/form-data` (cho các API có tải lên hình ảnh) hoặc `application/json`.

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
| **URL đầy đủ** | `http://localhost:5000/api/admin/update/65f3a...` |
| **Authentication** | Yêu cầu `token` (Admin) |

### Headers

```
token: <your_admin_jwt_token_here>
```

### Request Body (form-data)

Các trường là tùy chọn, chỉ gửi các trường cần cập nhật.

| Key | Type | Value |
|-----|------|-------|
| `title` | Text | "Tên mới" |
| `file` | File | [Ảnh mới] |
| ... | ... | ... |

### Response Thành Công (200 OK)

```json
{
  "course": {
    "_id": "65f3a...",
    "title": "Tên mới",
    "image": "https://cloudinary.com/..."
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
| **URL đầy đủ** | `http://localhost:5000/api/admin/delete/65f3a...` |
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
