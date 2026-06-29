# Nan Connect — แผนที่ path ของทุกหน้า

อ้างอิงว่าโค้ดของแต่ละหน้า/เมนูอยู่ที่ไฟล์ไหน (Next.js App Router — ทุกหน้าคือไฟล์ `page.tsx`)

## เว็บนักท่องเที่ยว (Tourist — mobile-first)
| URL | หน้า | ไฟล์โค้ด |
|-----|------|----------|
| `/` | หน้าแรก / สำรวจ | `src/app/(tourist)/page.tsx` |
| `/chat` | แชต AI (มัคคุเทศก์) | `src/app/(tourist)/chat/page.tsx` |
| `/plan` | จัดเส้นทาง / Itinerary | `src/app/(tourist)/plan/page.tsx` |
| `/map` | แผนที่ (Leaflet + OSM) | `src/app/(tourist)/map/page.tsx` |
| `/search` | ค้นหา (ข้ามภาษา) | `src/app/(tourist)/search/page.tsx` |
| `/place/[id]` | รายละเอียดสถานที่ (5 หมวด) | `src/app/(tourist)/place/[id]/page.tsx` |
| `/category/[type]` | รายการตามหมวด | `src/app/(tourist)/category/[type]/page.tsx` |
| `/biz/[id]` | รายละเอียดผู้ประกอบการ | `src/app/(tourist)/biz/[id]/page.tsx` |
| `/s/[qrId]` | หน้าหลังสแกน QR | `src/app/s/[qrId]/page.tsx` |
| — | layout มือถือ (bottom nav) | `src/app/(tourist)/layout.tsx` |

## แดชบอร์ด (Big Data)
| URL | หน้า | ไฟล์โค้ด |
|-----|------|----------|
| `/dashboard` | ภาพรวม KPI | `src/app/dashboard/page.tsx` |
| `/dashboard/heatmap` | ความหนาแน่นการสแกน | `src/app/dashboard/heatmap/page.tsx` |
| `/dashboard/intent` | วิเคราะห์ความสนใจ | `src/app/dashboard/intent/page.tsx` |
| `/dashboard/feedback` | เสียงตอบรับ | `src/app/dashboard/feedback/page.tsx` |
| — | layout + แถบเมนู | `src/app/dashboard/layout.tsx`, `src/components/DashboardNav.tsx` |

## ระบบหลังบ้าน (Admin / ผู้ประกอบการใส่ข้อมูลเอง)
| URL | หน้า | ไฟล์โค้ด |
|-----|------|----------|
| `/admin` | ภาพรวม + login (mock) | `src/app/admin/page.tsx`, `src/app/admin/layout.tsx` |
| `/admin/places` | รายการสถานที่ | `src/app/admin/places/page.tsx` |
| `/admin/places/new` | เพิ่มสถานที่ | `src/app/admin/places/new/page.tsx` |
| `/admin/places/[id]/edit` | แก้ไขสถานที่ | `src/app/admin/places/[id]/edit/page.tsx` |
| `/admin/businesses` | รายการผู้ประกอบการ | `src/app/admin/businesses/page.tsx` |
| `/admin/businesses/new` | เพิ่มผู้ประกอบการ | `src/app/admin/businesses/new/page.tsx` |
| `/admin/businesses/[id]/edit` | แก้ไขผู้ประกอบการ | `src/app/admin/businesses/[id]/edit/page.tsx` |
| — | auth / nav / ฟอร์ม | `src/lib/adminAuth.tsx`, `src/components/admin/AdminNav.tsx`, `PlaceForm.tsx`, `BusinessForm.tsx` |

## แกนระบบ (ใช้ร่วมทุกหน้า)
| ส่วน | ไฟล์โค้ด |
|------|----------|
| API แชต AI จริง (OpenRouter) | `src/app/api/chat/route.ts` |
| ข้อมูลรวม overlay (admin↔เว็บจริง) | `src/lib/DataStore.tsx` |
| seed data + helper | `src/lib/data.ts`, `src/data/*.json` |
| ค้นหา / mock AI / types | `src/lib/search.ts`, `src/lib/mockAI.ts`, `src/lib/types.ts` |
| i18n 8 ภาษา + แปลเนื้อหา | `src/i18n/dictionaries.ts`, `I18nProvider.tsx`, `contentTranslations.ts`, `placeDetailTranslations.ts` |
| ธีม / ฟอนต์ / Leaflet CSS | `src/app/layout.tsx`, `src/app/globals.css` |
| คอมโพเนนต์ร่วม | `src/components/` (AppHeader, BottomNav, PlaceCard, BusinessCard, PlaceIllustration, FeedbackModal, LangSwitcher, StarRating, dashboard/*) |
| ขอบเขตจังหวัดน่าน (แผนที่) | `src/lib/nanBoundary.ts` |

## รัน / Deploy
- `npm run dev` → http://localhost:3000 · `npm run build`
- AI จริง: ใส่ `OPENROUTER_API_KEY` ใน `.env.local` (ดู `.env.example`) / บน Vercel ใส่ใน Environment Variables
- Deploy: push GitHub → import ที่ Vercel (zero-config)
