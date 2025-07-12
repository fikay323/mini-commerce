# 🛒 Mini-Commerce – Angular Frontend Assessment

A lightweight, mobile-first e-commerce prototype built with Angular 18, RxJS, and Tailwind CSS. Visitors can browse products, view details, manage a cart, and simulate checkout — with full local persistence and offline support.

---

## 📦 Features

- 🛍 Product catalogue with live search and price filtering
- 📄 Product detail page with quantity control
- 🛒 Cart management (add, update, remove)
- ✅ Mock checkout flow with order summary + success screen
- 🌙 Dark mode toggle with persistent theme
- 💾 State persisted using `localStorage`
- ⚡ Instant feedback with toast notifications
- 📱 Responsive, accessible, and modern UI

---

## 🧱 Tech Stack

- **Angular 18** (standalone components, strict mode)
- **RxJS + Signals** for reactive state
- **Tailwind CSS v4** with dark mode
- **localStorage** for data + cart persistence
- **TypeScript strict** with no `any`
- **ToastService**, **DarkModeService**, **CartService**

---

## 📐 Design Approach

- **Responsive first** with grid/flex layouts
- **Semantic HTML** for accessibility
- **Utility-first styling** via Tailwind + custom SCSS tokens
- **Dark mode** via class strategy on `<html>`
- **Modular routing**: `/`, `/product/:slug`, `/cart`, `/checkout`, `/success`

---

## 🔍 Search & Filters

- Live search with debounced input (`1000ms`)
- Price range filters using signals

---

## ⚙️ Developer Experience

- ✅ `strict: true` in `tsconfig.json`
- ✅ ESLint + Prettier formatting
- ✅ Zero `any`s
- ✅ Minimal, readable state logic
- ✅ Incremental, meaningful commit history

---

## ⚠️ Error Handling

- Global error fallbacks (404/redirects)
- Toasts for user actions: Add/Remove/Checkout
- Graceful handling of invalid product slugs

---
### 🚀 SEO Strategy & Performance Tweaks

- Meta tags & Open Graph injected via Angular's `Meta` & `Title` services.
- Structured data (Schema.org Product) included on product pages.
- `ChangeDetectionStrategy.OnPush` applied to reduce DOM checks.

---

## 🧪 Testing

- ✅ `CartService` unit test using Karma
- Wrote unit tests for other components and services

---

## 🔗 Live Demo

🌍 [https://mini-commerce-psi.vercel.app/](https://mini-commerce-psi.vercel.app/)  
🔗 Hosted via Vercel

---

## 📁 Installation & Dev

```bash
git clone https://github.com/fikay323/mini-commerce.git
cd mini-commerce
npm install
ng serve
