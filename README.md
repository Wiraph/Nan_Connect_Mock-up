# Nan Connect — Mock-up Web

แพลตฟอร์ม AI ยกระดับการท่องเที่ยวจังหวัดน่าน — *One Scan, Endless Journeys*
ตัว mock-up นี้สร้างจากไฟล์นำเสนอโครงการ Nan Connect และข้อมูลจริงของจังหวัดน่าน

## ส่วนประกอบ

**A. เว็บนักท่องเที่ยว (AI Hub) — mobile-first**
- `/` หน้าแรก/สำรวจ · ค้นหา · หมวดหมู่ · ตัวกรองงานคราฟ · สถานที่แนะนำ
- `/s/[qrId]` หน้าจำลองหลังสแกน QR (ลองที่ `/s/42`)
- `/chat` มัคคุเทศก์ AI (คำตอบจำลอง — rule-based ใน `src/lib/mockAI.ts`)
- `/plan` Smart Recommendation — เส้นทางท่องเที่ยว 1 วัน
- `/map` แผนที่หมุดสถานที่ทั่ว 15 อำเภอ
- `/place/[id]` รายละเอียดสถานที่ จัดตาม content model 5 หมวด (About & Culture / Experiences / Shopping / Visit & Services / News & Events)
- `/category/[type]`, `/biz/[id]` รายการและรายละเอียดผู้ประกอบการ

**C. Dashboard ข้อมูลเชิงลึก (Big Data)**
- `/dashboard` ภาพรวม KPI
- `/dashboard/heatmap` ความหนาแน่นการสแกนรายอำเภอ
- `/dashboard/intent` วิเคราะห์ความสนใจ (โดนัทชาร์ต)
- `/dashboard/feedback` เสียงตอบรับและเรตติ้ง

## เทคโนโลยี
- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 — ธีมแม่สีจากเดค: กรมท่า `#1B2A4A` · ทอง `#C9A227` · ครีม `#F5F1E6`
- Recharts (โดนัทชาร์ต) · Tabler Icons (webfont)
- รองรับ 8 ภาษา (ไทย/อังกฤษ/จีน/ญี่ปุ่น/ลาว/อินโด/เวียดนาม/พม่า) — `src/i18n/`
- ข้อมูลทั้งหมดเป็น static JSON ใน `src/data/`
- มี serverless route เดียว `/api/chat` (ต่อ OpenRouter) — นอกนั้นเป็น static

> AI: ถ้าไม่ตั้ง `OPENROUTER_API_KEY` จะใช้ **คำตอบจำลอง (mock)**; ถ้าตั้ง key จะต่อโมเดลจริงบน OpenRouter (ดูหัวข้อ AI ด้านล่าง)

## AI chat (OpenRouter — ออปชัน)
ค่าเริ่มต้นใช้คำตอบจำลอง ถ้าอยากต่อโมเดลจริง:
1. คัดลอก `.env.example` → `.env.local` แล้วใส่ `OPENROUTER_API_KEY` (รับ key ที่ https://openrouter.ai/keys)
2. (ออปชัน) เปลี่ยน `OPENROUTER_MODEL` — ค่าเริ่มต้น `openai/gpt-oss-120b:free`
3. รีสตาร์ท `npm run dev`

- เรียกผ่าน server route `/api/chat` เท่านั้น (key ไม่หลุดไป browser) · คำตอบ stream ทีละ token · ผูกกับข้อมูลสถานที่น่าน · ตอบตามภาษาที่เลือก
- โควต้าฟรี OpenRouter: 20 req/นาที, 50 req/วัน (เติม $10 ครั้งเดียว → 1,000/วัน) — เมื่อหมดโควต้า/ไม่มี key ระบบ **fallback เป็น mock** อัตโนมัติ
- บน Vercel: ใส่ env เดียวกันที่ Project Settings → Environment Variables

## ข้อมูลที่ใช้ seed
- `src/data/places.json` — สถานที่จริงของน่าน 14 จุด (วัดภูมินทร์, บ่อเกลือ, ดอยภูคา, สะปัน ฯลฯ)
- `src/data/hotels.json` — โรงแรมในน่าน ~223 แห่ง (จากไฟล์ข้อมูลจริง)
- `src/data/operators.json` — ผู้ประกอบการชมรมท่องเที่ยวสะปัน
- `src/data/categories.json`, `craftTypes.json`, `districts.json`, `dashboard.json`

## รันในเครื่อง
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy ขึ้น Vercel
ขึ้น Vercel ได้แบบ zero-config (static เป็นหลัก + 1 serverless route):
1. push โค้ดขึ้น GitHub
2. import repo ที่ [vercel.com/new](https://vercel.com/new) — Vercel ตรวจเจอ Next.js อัตโนมัติ
3. (ออปชัน) ใส่ `OPENROUTER_API_KEY` ใน Environment Variables เพื่อเปิด AI จริง — ไม่ใส่ก็ deploy ได้ (ใช้ mock)
4. กด Deploy
