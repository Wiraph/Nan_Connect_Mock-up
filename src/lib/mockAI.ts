import { LangCode } from "@/i18n/dictionaries";
import { places } from "./data";
import { Place, loc } from "./types";

export type AIResult = {
  reply: string;
  places: Place[];
  itinerary: boolean;
};

type Intent =
  | "food"
  | "souvenir"
  | "stay"
  | "coffee"
  | "nature"
  | "temple"
  | "route"
  | "craft"
  | "default";

const KEYWORDS: Record<Intent, string[]> = {
  food: ["eat", "food", "restaurant", "อาหาร", "กิน", "ร้านอาหาร", "美食", "食事", "makan", "ăn"],
  souvenir: ["souvenir", "gift", "ของฝาก", "ของที่ระลึก", "特产", "お土産", "oleh", "quà"],
  stay: ["hotel", "stay", "sleep", "ที่พัก", "โรงแรม", "นอน", "住", "ホテル", "menginap", "khách sạn"],
  coffee: ["coffee", "cafe", "café", "กาแฟ", "คาเฟ่", "咖啡", "コーヒー", "kopi", "cà phê"],
  nature: ["nature", "mountain", "mist", "ธรรมชาติ", "ภูเขา", "ทะเลหมอก", "น้ำตก", "自然", "山", "alam", "núi"],
  temple: ["temple", "wat", "วัด", "พระธาตุ", "寺", "お寺", "candi", "chùa"],
  route: ["route", "plan", "itinerary", "day", "เส้นทาง", "แพลน", "วางแผน", "ทริป", "路线", "ルート", "rute", "lịch trình"],
  craft: ["craft", "weaving", "silver", "คราฟ", "ผ้าทอ", "เครื่องเงิน", "งานฝีมือ", "手工", "工芸", "kerajinan", "thủ công"],
  default: [],
};

function detectIntent(q: string): Intent {
  const lower = q.toLowerCase();
  for (const intent of Object.keys(KEYWORDS) as Intent[]) {
    if (KEYWORDS[intent].some((k) => lower.includes(k.toLowerCase()))) return intent;
  }
  return "default";
}

function pick(ids: string[]): Place[] {
  return ids.map((id) => places.find((p) => p.id === id)).filter(Boolean) as Place[];
}

const REPLIES: Record<Intent, { th: string; en: string }> = {
  food: {
    th: "แนะนำลองอาหารพื้นเมืองที่ถนนคนเดินกาดข่วงเมืองน่านค่ะ มีขันโตกและของกินเหนือเพียบ",
    en: "Try the local northern food at Nan Walking Street — khan toke and plenty of street eats await.",
  },
  souvenir: {
    th: "ของฝากขึ้นชื่อของน่านคือผ้าทอลายน้ำไหลและเกลือภูเขาค่ะ ลองแวะลำดวนผ้าทอและบ่อเกลือดูนะคะ",
    en: "Nan's signature souvenirs are flowing-water textiles and mountain salt — visit Lamduan Weaving and Bo Kluea.",
  },
  stay: {
    th: "ถ้าชอบเมืองมีโรงแรมในตัวเมืองน่านหลายแห่ง ถ้าชอบธรรมชาติแนะนำพักโฮมสเตย์ที่หมู่บ้านสะปันค่ะ",
    en: "For the city there are many hotels in Mueang Nan; for nature lovers, a homestay in Sapan Village is lovely.",
  },
  coffee: {
    th: "สายคาเฟ่ต้องไปจุดชมวิว 1715 และคาเฟ่ริมธารที่หมู่บ้านสะปันค่ะ วิวภูเขาสุดปัง",
    en: "Coffee lovers should head to Viewpoint 1715 and the streamside cafés of Sapan Village — epic mountain views.",
  },
  nature: {
    th: "สายธรรมชาติห้ามพลาดดอยภูคา ดอยเสมอดาวชมทะเลหมอก และหมู่บ้านสะปันค่ะ",
    en: "Nature highlights: Doi Phu Kha, the sea of mist at Doi Samer Dao, and Sapan Village.",
  },
  temple: {
    th: "วัดห้ามพลาดคือวัดภูมินทร์ (จิตรกรรมปู่ม่านย่าม่าน) วัดพระธาตุแช่แห้ง และวัดศรีพันต้นค่ะ",
    en: "Don't miss Wat Phumin (the whisper mural), Wat Phra That Chae Haeng, and Wat Si Phan Ton.",
  },
  route: {
    th: "ฉันจัดเส้นทาง 1 วันในเมืองน่านให้แล้วค่ะ กดดูแผนการเดินทางด้านล่างได้เลย",
    en: "I've put together a one-day Nan city route for you — tap the itinerary below.",
  },
  craft: {
    th: "งานคราฟเด่นของน่านคือผ้าทอไทลื้อและจิตรกรรมฝาผนัง แนะนำลำดวนผ้าทอและวัดหนองบัวค่ะ",
    en: "Nan's signature crafts are Tai Lue weaving and temple murals — try Lamduan Weaving and Wat Nong Bua.",
  },
  default: {
    th: "น่านมีของดีเยอะมากค่ะ! ลองเริ่มจากวัดภูมินทร์ บ่อเกลือ และดอยภูคา หรือถามฉันเรื่องอาหาร ที่พัก หรือเส้นทางก็ได้นะคะ",
    en: "Nan has so much to offer! Start with Wat Phumin, Bo Kluea, and Doi Phu Kha — or ask me about food, stays, or routes.",
  },
};

const INTENT_PLACES: Record<Intent, string[]> = {
  food: ["kad-khuang-walking-street", "wat-phumin"],
  souvenir: ["lamduan-weaving", "bo-kluea", "wat-nong-bua"],
  stay: ["sapan-village", "doi-samer-dao"],
  coffee: ["viewpoint-1715", "sapan-village"],
  nature: ["doi-phu-kha", "doi-samer-dao", "sapan-village"],
  temple: ["wat-phumin", "wat-phra-that-chae-haeng", "wat-si-phan-ton"],
  route: ["wat-phumin", "nan-national-museum", "kad-khuang-walking-street"],
  craft: ["lamduan-weaving", "wat-nong-bua", "wat-phumin"],
  default: ["wat-phumin", "bo-kluea", "doi-phu-kha"],
};

/** Curated place cards + itinerary flag for a query — reused alongside the
 *  real AI text stream so cards still render even with a live model. */
export function matchPlaces(query: string): { places: Place[]; itinerary: boolean } {
  const intent = detectIntent(query);
  return { places: pick(INTENT_PLACES[intent]), itinerary: intent === "route" };
}

export function getAIResponse(query: string, lang: LangCode): AIResult {
  const intent = detectIntent(query);
  const reply = loc(REPLIES[intent], lang);
  const { places: matched, itinerary } = matchPlaces(query);
  return { reply, places: matched, itinerary };
}

/** The default smart itinerary used by the /plan page. */
export const ITINERARY = [
  { id: "wat-phra-that-chae-haeng", time: "08:30", note: { th: "ไหว้พระธาตุคู่เมือง เริ่มเช้าก่อนแดดแรง", en: "Morning blessing at the city's sacred stupa" } },
  { id: "wat-phumin", time: "10:00", note: { th: "ชมจิตรกรรมปู่ม่านย่าม่าน", en: "See the famous whisper mural" } },
  { id: "nan-national-museum", time: "11:15", note: { th: "ชมงาช้างดำและอุโมงค์ลีลาวดี", en: "Black Ivory and the frangipani tunnel" } },
  { id: "wat-si-phan-ton", time: "13:30", note: { th: "วิหารทองและพญานาคเจ็ดเศียร", en: "Golden viharn and seven-headed Naga" } },
  { id: "kad-khuang-walking-street", time: "17:00", note: { th: "ปิดท้ายด้วยถนนคนเดินและขันโตก", en: "End with the walking street and khan toke" } },
];
