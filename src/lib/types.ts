import { LangCode } from "@/i18n/dictionaries";
import {
  formatDistrictText,
  translateContentText,
} from "@/i18n/contentTranslations";

export type Loc = Record<LangCode, string> | { th: string; en: string };

export function loc(value: Loc | undefined, lang: LangCode): string {
  if (!value) return "";
  const v = value as Record<string, string>;
  if (v[lang]) return v[lang];
  if (v.en) {
    const translated = translateContentText(v.en, lang);
    if (translated !== v.en) return translated;
  }
  if (v.th) {
    const translated = translateContentText(v.th, lang);
    if (translated !== v.th) return translated;
  }
  return v.en ?? v.th ?? "";
}

export function textLoc(value: string, lang: LangCode): string {
  return translateContentText(value, lang);
}

export function districtLoc(value: string, lang: LangCode): string {
  return formatDistrictText(value, lang);
}

export type Place = {
  id: string;
  qrPoint: number;
  name: { th: string; en: string };
  district: string;
  craftType: string;
  tint: string;
  icon: string;
  lat: number;
  lon: number;
  rating: number;
  reviews: number;
  tags: { th: string[]; en: string[] };
  summary: { th: string; en: string };
  /** หมวด 1: รูปหลักของสถานที่ (path เช่น /places/wat-phumin.jpg); ว่าง = ใช้ภาพวาด */
  image?: string;
  about: { th: string; en: string };
  /** หมวด 1: ที่มา */
  source?: { th: string; en: string };
  /** หมวด 1: ทำเนียบ */
  directory?: { th: string; en: string };
  /** หมวด 1: เอกสารรับรองประกอบกิจการ */
  certDocs?: { name: { th: string; en: string }; url: string }[];
  experiences: {
    title: { th: string; en: string };
    detail: { th: string; en: string };
    duration?: number;
    price?: number;
    /** หมวด 2: จำนวนคน */
    capacity?: number;
    image?: string;
  }[];
  shopping: {
    title: { th: string; en: string };
    detail: { th: string; en: string };
    image?: string;
  }[];
  visit: {
    hours: { th: string; en: string };
    admission: { th: string; en: string };
    contact: string;
    howToGet: { th: string; en: string };
    /** หมวด 4: ราคา */
    price?: { th: string; en: string };
    /** หมวด 4: รถเช่า */
    rentalCar?: { th: string; en: string };
    /** หมวด 4: รายการบริการแบบการ์ด (ประเภทบริการ + รายละเอียด) */
    services?: {
      title: { th: string; en: string };
      detail: { th: string; en: string };
      price?: { th: string; en: string };
    }[];
  };
  news: {
    title: { th: string; en: string };
    detail: { th: string; en: string };
    month: string;
    /** หมวด 5: ช่วงเวลา */
    timeframe?: { th: string; en: string };
    /** หมวด 5: สภาพอากาศ */
    weather?: { th: string; en: string };
  }[];
};

export type Business = {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  district: string;
  contact?: string;
  facebook?: string;
};

export type Category = {
  key: string;
  icon: string;
  tint: string;
  name: { th: string; en: string };
};

export type CraftType = {
  key: string;
  icon: string;
  name: { th: string; en: string };
};

export type District = {
  key: string;
  name: { th: string; en: string };
  scans: number;
  x: number;
  y: number;
};
