# Tài Liệu Test API với Postman

## Thông Tin Chung

- **Base URL**: `http://localhost:5000/api`
- **Content-Type**: `application/json`
- **Server Port**: `5000` (mặc định) hoặc theo biến môi trường `PORT`

---

## 1. API Đăng Ký Người Dùng

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `POST` |
| **Endpoint** | `/api/user/register` |
| **URL đầy đủ** | `http://localhost:5000/api/user/register` |
| **Authentication** | Không yêu cầu |

### Headers

```
Content-Type: application/json
```

### Request Body (JSON)

```json
{
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "password": "password123"
}
```

**Giải thích các trường:**
- `name` (string, bắt buộc): Tên người dùng
- `email` (string, bắt buộc): Email người dùng (phải là email hợp lệ và chưa tồn tại)
- `password` (string, bắt buộc): Mật khẩu (sẽ được mã hóa bằng bcrypt)

### Response Thành Công (200 OK)

```json
{
  "activationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Mã OTP đã được gửi đến email của bạn"
}
```

**Giải thích:**
- `activationToken`: JWT token chứa thông tin người dùng và OTP (hết hạn sau 5 phút)
- `message`: Thông báo xác nhận

### Response Lỗi

#### 400 Bad Request - Email đã tồn tại

```json
{
  "message": "Người dùng đã tồn tại"
}
```

#### 500 Internal Server Error

```json
{
  "message": "Lỗi chi tiết từ server"
}
```

---