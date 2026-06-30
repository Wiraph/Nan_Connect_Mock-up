import postsJson from "@/data/posts.json";

/** The 5 dataset categories — posts are standalone content, NOT tied to a place. */
export type PostCategory = "about" | "experiences" | "shopping" | "visit" | "news";

export const POST_CATEGORIES: PostCategory[] = [
  "about",
  "experiences",
  "shopping",
  "visit",
  "news",
];

/** Per-category presentation metadata (icon + i18n label key). */
export const POST_CATEGORY_META: Record<
  PostCategory,
  { icon: string; tint: string; labelKey: string }
> = {
  about: { icon: "ti-book-2", tint: "navy", labelKey: "place.about" },
  experiences: { icon: "ti-compass", tint: "teal", labelKey: "place.experiences" },
  shopping: { icon: "ti-shopping-bag", tint: "gold", labelKey: "place.shopping" },
  visit: { icon: "ti-info-circle", tint: "blue", labelKey: "place.visit" },
  news: { icon: "ti-calendar-event", tint: "coral", labelKey: "place.news" },
};

export function isPostCategory(v: string): v is PostCategory {
  return (POST_CATEGORIES as string[]).includes(v);
}

export type Post = {
  id: string;
  category: PostCategory;
  title: { th: string; en: string };
  detail: { th: string; en: string };
  image?: string;
  // About & Culture
  craftType?: string;
  source?: { th: string; en: string };
  directory?: { th: string; en: string };
  // Experiences
  duration?: number;
  capacity?: number;
  // Experiences / Visit
  price?: { th: string; en: string };
  // Visit & Services
  contact?: string;
  rentalCar?: { th: string; en: string };
  lat?: number;
  lon?: number;
  // News & Events
  timeframe?: { th: string; en: string };
  month?: string;
  weather?: { th: string; en: string };
};

export const seedPosts = postsJson as Post[];
