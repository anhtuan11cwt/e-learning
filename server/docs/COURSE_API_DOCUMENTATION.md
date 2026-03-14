# Tài Liệu API Khóa Học (Course) 📚

## Thông Tin Chung

- **Base URL**: `http://localhost:5000/api/course`
- **Authentication**: Một số API yêu cầu `token` của người dùng trong Headers.
- **Content-Type**: `application/json`

---

## 📌 Danh Mục API

1. [Lấy Tất Cả Khóa Học](#1-api-lay-tat-ca-khoa-hoc)
2. [Lấy Chi Tiết Khóa Học](#2-api-lay-chi-tiet-khoa-hoc)
3. [Lấy Danh Sách Bài Giảng](#3-api-lay-danh-sach-bai-giang)

---

## 1. API Lấy Tất Cả Khóa Học

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/api/course/all` |
| **URL đầy đủ** | `http://localhost:5000/api/course/all` |
| **Authentication** | Không yêu cầu |

### Response Thành Công (200 OK)

```json
{
  "courses": [
    {
      "_id": "65f3a...",
      "title": "Khóa học React nâng cao",
      "description": "...",
      "category": "Web Development",
      "createdBy": "Admin",
      "image": "https://cloudinary.com/...",
      "price": 500000,
      "duration": "10 weeks"
    }
  ]
}
```

---

## 2. API Lấy Chi Tiết Khóa Học

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/api/course/:id` |
| **URL đầy đủ** | `http://localhost:5000/api/course/:id` |
| **Authentication** | Không yêu cầu |

### Response Thành Công (200 OK)

```json
{
  "course": {
    "_id": "65f3a...",
    "title": "Khóa học React nâng cao",
    "description": "...",
    "category": "Web Development",
    "createdBy": "Admin",
    "image": "https://cloudinary.com/...",
    "price": 500000,
    "duration": "10 weeks"
  }
}
```

### Response Lỗi

#### 404 Not Found

```json
{
  "message": "Không tìm thấy khóa học"
}
```

---

## 3. API Lấy Danh Sách Bài Giảng

### Thông Tin Cơ Bản

| Thành phần | Giá trị |
|------------|---------|
| **HTTP Method** | `GET` |
| **Endpoint** | `/api/course/:id/lectures` |
| **URL đầy đủ** | `http://localhost:5000/api/course/:id/lectures` |
| **Authentication** | Yêu cầu `token` |

### Headers

```
token: <your_jwt_token_here>
```

### Response Thành Công (200 OK)

Trả về danh sách bài giảng nếu người dùng là **Admin** hoặc **Đã đăng ký khóa học**.

```json
{
  "lectures": [
    {
      "_id": "65f3z...",
      "course": "65f3a...",
      "title": "Bài 1: Giới thiệu",
      "description": "Nội dung bài học...",
      "video": "https://cloudinary.com/..."
    }
  ]
}
```

### Response Lỗi

#### 400 Bad Request - Chưa đăng ký khóa học

Trả về khi người dùng thông thường truy cập bài giảng của khóa học mà họ chưa mua.

```json
{
  "message": "Bạn chưa đăng ký khóa học này"
}
```

#### 403 Forbidden - Token không hợp lệ hoặc hết hạn

(Từ middleware `isAuthenticated`)

```json
{
  "message": "Vui lòng đăng nhập"
}
```
