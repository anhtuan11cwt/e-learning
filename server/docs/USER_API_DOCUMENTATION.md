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

## 2. API Xác Minh Người Dùng (Verify OTP)

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `POST` |
| **Endpoint** | `/api/user/verify` |
| **URL đầy đủ** | `http://localhost:5000/api/user/verify` |
| **Authentication** | Không yêu cầu |

### Headers

```
Content-Type: application/json
```

### Request Body (JSON)

```json
{
  "otp": "123456",
  "activationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Giải thích các trường:**
- `otp` (string, bắt buộc): Mã OTP 6 chữ số nhận được từ email
- `activationToken` (string, bắt buộc): Token kích hoạt nhận được từ API đăng ký (hết hạn sau 5 phút)

### Response Thành Công (200 OK)

```json
{
  "message": "Đăng ký thành công"
}
```

**Giải thích:**
- `message`: Thông báo xác nhận đăng ký thành công. Tài khoản người dùng đã được tạo trong hệ thống.

### Response Lỗi

#### 400 Bad Request - OTP đã hết hạn

```json
{
  "message": "OTP đã hết hạn"
}
```

**Nguyên nhân:** Token kích hoạt đã hết hạn (quá 5 phút kể từ khi đăng ký)

#### 400 Bad Request - OTP không đúng

```json
{
  "message": "OTP không đúng"
}
```

**Nguyên nhân:** Mã OTP nhập vào không khớp với mã OTP trong token

#### 500 Internal Server Error

```json
{
  "message": "Lỗi chi tiết từ server"
}
```

---

## Quy Trình Đăng Ký Hoàn Chỉnh

1. **Bước 1:** Gọi API `/api/user/register` với thông tin `name`, `email`, `password`
   - Nhận được `activationToken` và email chứa mã OTP

2. **Bước 2:** Kiểm tra email để lấy mã OTP (6 chữ số)

3. **Bước 3:** Gọi API `/api/user/verify` với `otp` và `activationToken` nhận được ở bước 1
   - Nếu thành công, tài khoản được tạo và có thể đăng nhập

**Lưu ý:**
- Token kích hoạt chỉ có hiệu lực trong 5 phút
- Mỗi email chỉ có thể đăng ký một lần
- Mật khẩu được mã hóa bằng bcrypt trước khi lưu vào database

---