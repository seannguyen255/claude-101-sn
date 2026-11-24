# CLAUDE.md

## 1. Tổng quan project

**Expense Management App** là ứng dụng quản lý chi tiêu cá nhân, giúp người dùng ghi nhận, theo dõi và thống kê thu nhập/chi tiêu hằng ngày.

- **Mục đích:** nhập giao dịch thu/chi, phân loại theo danh mục, xem thống kê theo thời gian.
- **Đối tượng sử dụng:** cá nhân muốn kiểm soát tài chính hằng ngày (sinh viên, người đi làm, hộ gia đình nhỏ).

> Phiên bản Next.js này có thể khác với kiến thức quen thuộc. Xem `AGENTS.md` và tài liệu trong `node_modules/next/dist/docs/` trước khi viết code.

## 2. Công nghệ sử dụng

- **Next.js 16** (App Router) + **React 19** + **TypeScript**, dùng chung cho cả frontend và backend (API routes / Route Handlers trong `app/api/`).
- **Prisma ORM** để truy cập database.
- **MySQL** chạy qua **Docker container** cho môi trường local.
- **Tailwind CSS 4** cho toàn bộ styling.
- Quản lý package bằng **npm**.

## 3. Cấu trúc thư mục chính

```
app/                 # App Router: routes, layouts, pages, API routes
  layout.tsx         # Root layout
  page.tsx           # Trang chủ (/)
  globals.css        # Style toàn cục + Tailwind
prisma/
  schema.prisma      # Định nghĩa toàn bộ schema
  seed.ts            # Dữ liệu mẫu ban đầu
  migrations/        # Migration do Prisma sinh ra
public/              # Static assets
next.config.ts       # Cấu hình Next.js
eslint.config.mjs    # Cấu hình ESLint
tsconfig.json        # Cấu hình TypeScript (alias @/* -> thư mục gốc)
AGENTS.md            # Hướng dẫn cho agent về Next.js
```

## 4. Lệnh thường dùng

```bash
npm run dev     # Chạy dev server tại http://localhost:3000
npm run build   # Build production (cũng kiểm tra type)
npm run start   # Chạy bản build production
npm run lint    # Chạy ESLint
```

Chạy `npm run lint` và `npm run build` trước khi hoàn tất thay đổi.

## 5. Quy ước code

- Dùng **App Router** (`app/`), không dùng Pages Router (`pages/`).
- Dùng **TypeScript** cho toàn bộ code; tránh `any`.
- Mặc định là Server Component; chỉ thêm `"use client"` khi thật sự cần (state, effect, event handler).
- Import bằng alias `@/*` thay vì đường dẫn tương đối dài.

## 6. Quy tắc phối màu & styling

- **Xanh dương `#2563eb`** (`blue-600`): màu chủ đạo cho hành động chính (button, link).
- **Xanh lá `#16a34a`** (`green-600`): số liệu **thu nhập**.
- **Đỏ `#dc2626`** (`red-600`): số liệu **chi tiêu**.
- Chỉ dùng **Tailwind utility class**. **Không dùng inline style**, không dùng CSS Modules (`*.module.css`).
- Không viết file CSS riêng trừ khi thật sự cần; CSS toàn cục (nếu cần) chỉ đặt trong `app/globals.css`.

## 7. Quy tắc sử dụng icon

- Dùng thống nhất bộ icon **`lucide-react`**, không trộn lẫn với bộ icon khác.
- Icon cho danh mục chi tiêu phải có ý nghĩa rõ ràng, ví dụ:
  - "Di chuyển" → icon xe (`Car`)
  - "Mua sắm" → icon giỏ hàng (`ShoppingCart`)

## 8. Quy tắc thiết kế database với Prisma

- Toàn bộ schema định nghĩa trong `prisma/schema.prisma`; **không tạo bảng thủ công** bằng SQL trực tiếp.
- Có script seed `prisma/seed.ts` để tạo dữ liệu mẫu ban đầu: **danh mục chi tiêu mặc định** và **1 user demo**.
- Mỗi khi thay đổi schema, **bắt buộc** tạo migration bằng:

  ```bash
  npx prisma migrate dev --name <ten_migration>
  ```

  Không sửa trực tiếp trên database.
