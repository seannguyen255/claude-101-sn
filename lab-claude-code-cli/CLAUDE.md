# CLAUDE.md

## Mô tả project

Ứng dụng web xây dựng bằng **Next.js 16** (App Router), **TypeScript** và **Tailwind CSS 4**, dùng React 19 và quản lý package bằng npm.

> Phiên bản Next.js này có thể khác với kiến thức quen thuộc. Xem `AGENTS.md` và tài liệu trong `node_modules/next/dist/docs/` trước khi viết code.

## Cấu trúc thư mục chính

```
app/                 # App Router: routes, layouts, pages
  layout.tsx         # Root layout
  page.tsx           # Trang chủ (/)
  globals.css        # Style toàn cục + Tailwind
public/              # Static assets
next.config.ts       # Cấu hình Next.js
eslint.config.mjs    # Cấu hình ESLint
tsconfig.json        # Cấu hình TypeScript (alias @/* -> thư mục gốc)
AGENTS.md            # Hướng dẫn cho agent về Next.js
```

## Lệnh thường dùng

```bash
npm run dev     # Chạy dev server tại http://localhost:3000
npm run build   # Build production (cũng kiểm tra type)
npm run start   # Chạy bản build production
npm run lint    # Chạy ESLint
```

Chạy `npm run lint` và `npm run build` trước khi hoàn tất thay đổi.

## Quy ước code

- Dùng **App Router** (`app/`), không dùng Pages Router (`pages/`).
- Dùng **TypeScript** cho toàn bộ code; tránh `any`.
- Style bằng **Tailwind CSS** (utility classes). **Không dùng CSS Modules** (`*.module.css`).
- CSS toàn cục chỉ đặt trong `app/globals.css`.
- Mặc định là Server Component; chỉ thêm `"use client"` khi thật sự cần (state, effect, event handler).
- Import bằng alias `@/*` thay vì đường dẫn tương đối dài.
