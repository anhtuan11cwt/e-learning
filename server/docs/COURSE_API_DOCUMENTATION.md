# Tài Liệu API Khóa Học (Course)

## Thông Tin Chung

- **Base URL**: `http://localhost:5000/api/course`
- **Content-Type**: `application/json`

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
| **URL đầy đủ** | `http://localhost:5000/api/course/65f3a...` |
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
