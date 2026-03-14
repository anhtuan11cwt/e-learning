# Tài Liệu Test API với Postman

## Thông Tin Chung

- **Base URL**: `http://localhost:5000/api`
- **Content-Type**: `application/json`
- **Server Port**: `5000` (mặc định) hoặc theo biến môi trường `PORT`

---

## 📌 Danh Mục API

1. [Đăng Ký Người Dùng](#1-api-dang-ky-nguoi-dung)
2. [Xác Minh Người Dùng (Verify OTP)](#2-api-xac-minh-nguoi-dung-verify-otp)
3. [Đăng Nhập Người Dùng](#3-api-dang-nhap-nguoi-dung)
4. [Lấy Thông Tin Cá Nhân](#4-api-lay-thong-tin-ca-nhan)
5. [Lấy Danh Sách Khóa Học Đã Mua](#5-api-lay-danh-sach-khoa-hoc-da-mua)
6. [Checkout (Thanh Toán Stripe)](#6-api-checkout-tao-phien-thanh-toan-stripe)
7. [Xác Thực Thanh Toán](#7-api-xac-thuc-thanh-toan)

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

## 3. API Đăng Nhập Người Dùng

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `POST` |
| **Endpoint** | `/api/user/login` |
| **URL đầy đủ** | `http://localhost:5000/api/user/login` |
| **Authentication** | Không yêu cầu |

### Headers

```
Content-Type: application/json
```

### Request Body (JSON)

```json
{
  "email": "nguyenvana@example.com",
  "password": "password123"
}
```

**Giải thích các trường:**
- `email` (string, bắt buộc): Email của người dùng đã đăng ký
- `password` (string, bắt buộc): Mật khẩu của người dùng

### Response Thành Công (200 OK)

```json
{
  "message": "Chào mừng quay trở lại, Nguyễn Văn A",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f3a...",
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "role": "user",
    "createdAt": "2024-03-14T..."
  }
}
```

**Giải thích:**
- `message`: Thông báo chào mừng kèm tên người dùng
- `token`: JWT token dùng để xác thực cho các yêu cầu sau này (hết hạn sau 15 ngày)
- `user`: Thông tin chi tiết của người dùng

### Response Lỗi

#### 400 Bad Request - Sai Email

```json
{
  "message": "Không tìm thấy người dùng với email này"
}
```

#### 400 Bad Request - Sai Mật Khẩu

```json
{
  "message": "Mật khẩu không đúng"
}
```

---

## 4. API Lấy Thông Tin Cá Nhân

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/api/user/me` |
| **URL đầy đủ** | `http://localhost:5000/api/user/me` |
| **Authentication** | Yêu cầu `token` trong Headers |

### Headers

```
Content-Type: application/json
token: <your_jwt_token_here>
```

**Lưu ý:** `token` là chuỗi nhận được từ API Đăng nhập.

### Response Thành Công (200 OK)

```json
{
  "user": {
    "_id": "65f3a...",
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "role": "user",
    "createdAt": "2024-03-14T..."
  }
}
```

### Response Lỗi

#### 400 Bad Request - Chưa Đăng Nhập

```json
{
  "message": "Vui lòng đăng nhập"
}
```

**Nguyên nhân:** Không cung cấp `token` trong Headers.

#### 400 Bad Request - Người dùng không tồn tại

```json
{
  "message": "Không tìm thấy người dùng"
}
```

**Nguyên nhân:** Token hợp lệ nhưng ID người dùng trong token không còn tồn tại trong database.

#### 500 Internal Server Error

```json
{
  "message": "jwt expired"
}
```

**Nguyên nhân:** Token đã hết hạn hoặc không hợp lệ.

---

## 5. API Lấy Danh Sách Khóa Học Đã Mua

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/api/user/mycourse` |
| **URL đầy đủ** | `http://localhost:5000/api/user/mycourse` |
| **Authentication** | Yêu cầu `token` trong Headers |

### Headers

```
token: <your_jwt_token_here>
```

### Response Thành Công (200 OK)

```json
{
  "courses": [
    {
      "_id": "65f3a...",
      "title": "Khóa học React nâng cao",
      "description": "Mô tả khóa học...",
      "price": 500000,
      "image": "https://cloudinary.com/...",
      "category": "Web Development",
      "createdBy": "Admin Name",
      "duration": "10 weeks"
    }
  ]
}
```

---

## 6. API Checkout (Tạo Phiên Thanh Toán Stripe)

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `POST` |
| **Endpoint** | `/api/user/checkout/:id` |
| **URL đầy đủ** | `http://localhost:5000/api/user/checkout/:id` |
| **Authentication** | Yêu cầu `token` trong Headers |

### Path Parameters
- `id`: ID của khóa học muốn mua.

### Headers

```
token: <your_jwt_token_here>
```

### Response Thành Công (201 Created)

```json
{
  "course": {
    "_id": "65f3a...",
    "name": "Khóa học React nâng cao",
    "price": 500000
    // ... các trường khác
  },
  "session": {
    "id": "cs_test_...",
    "url": "https://checkout.stripe.com/..."
    // ... thông tin phiên thanh toán Stripe
  }
}
```

### Response Lỗi

#### 400 Bad Request - Đã mua khóa học
```json
{
  "message": "Bạn đã có khóa học này rồi"
}
```

#### 404 Not Found - Không tìm thấy khóa học
```json
{
  "message": "Không tìm thấy khóa học"
}
```

---

## 7. API Xác Thực Thanh Toán

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `POST` |
| **Endpoint** | `/api/user/paymentverification/:id` |
| **URL đầy đủ** | `http://localhost:5000/api/user/paymentverification/:id` |
| **Authentication** | Yêu cầu `token` trong Headers |

### Path Parameters
- `id`: ID của khóa học vừa thanh toán.

### Request Body (JSON)

```json
{
  "session_id": "cs_test_a1b2c3..."
}
```

### Response Thành Công (200 OK)

```json
{
  "message": "Mua khóa học thành công"
}
```

### Response Lỗi

#### 400 Bad Request - Thanh toán chưa hoàn tất
```json
{
  "message": "Thanh toán chưa hoàn tất"
}
```

---


## Quy Trình Đăng Ký Hoàn Chỉnh

1. **Bước 1:** Gọi API `/api/user/register` với thông tin `name`, `email`, `password`
   - Nhận được `activationToken` và email chứa mã OTP

2. **Bước 2:** Kiểm tra email để lấy mã OTP (6 chữ số)

3. **Bước 3:** Gọi API `/api/user/verify` với `otp` và `activationToken` nhận được ở bước 1
   - Nếu thành công, tài khoản được tạo.

4. **Bước 4:** Sử dụng email và mật khẩu để gọi API `/api/user/login`
   - Nhận được `token` dùng để truy cập các tài nguyên bị giới hạn.

5. **Bước 5:** Sử dụng `token` trong header để gọi các API khác, ví dụ `/api/user/me`.

**Lưu ý:**
- Token kích hoạt (đăng ký) chỉ có hiệu lực trong 5 phút.
- Token đăng nhập có hiệu lực trong 15 ngày.
- Token được gửi qua header với tên là `token`.

---