"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedPosts, Post, PostCategory } from "./posts";

const LS = { posts: "nc-posts", postsDel: "nc-posts-del" };

function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function mergePosts(overlay: Post[], del: string[]): Post[] {
  const byId = new Map(overlay.map((p) => [p.id, p]));
  const seedIds = new Set(seedPosts.map((p) => p.id));
  const merged = seedPosts
    .filter((p) => !del.includes(p.id))
    .map((p) => byId.get(p.id) ?? p);
  const added = overlay.filter((p) => !seedIds.has(p.id));
  return [...added, ...merged];
}

type StoreValue = {
  hydrated: boolean;
  posts: Post[];
  getPost: (id: string) => Post | undefined;
  postsByCategory: (category: PostCategory) => Post[];
  savePost: (p: Post) => void;
  deletePost: (id: string) => void;
  resetPosts: () => void;
};

const Ctx = createContext<StoreValue | null>(null);

export function PostStoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [overlay, setOverlay] = useState<Post[]>([]);
  const [del, setDel] = useState<string[]>([]);

  useEffect(() => {
    setOverlay(read<Post[]>(LS.posts, []));
    setDel(read<string[]>(LS.postsDel, []));
    setHydrated(true);
  }, []);

  const posts = useMemo(
    () => (hydrated ? mergePosts(overlay, del) : seedPosts),
    [hydrated, overlay, del]
  );

  const value: StoreValue = {
    hydrated,
    posts,
    getPost: (id) => posts.find((p) => p.id === id),
    postsByCategory: (category) => posts.filter((p) => p.category === category),
    savePost: (p) => {
      setOverlay((prev) => {
        const next = [...prev.filter((x) => x.id !== p.id), p];
        localStorage.setItem(LS.posts, JSON.stringify(next));
        return next;
      });
      setDel((prev) => {
        const next = prev.filter((id) => id !== p.id);
        localStorage.setItem(LS.postsDel, JSON.stringify(next));
        return next;
      });
    },
    deletePost: (id) => {
      setOverlay((prev) => {
        const next = prev.filter((x) => x.id !== id);
        localStorage.setItem(LS.posts, JSON.stringify(next));
        return next;
      });
      if (seedPosts.some((p) => p.id === id)) {
        setDel((prev) => {
          const next = [...new Set([...prev, id])];
          localStorage.setItem(LS.postsDel, JSON.stringify(next));
          return next;
        });
      }
    },
    resetPosts: () => {
      [LS.posts, LS.postsDel].forEach((k) => localStorage.removeItem(k));
      setOverlay([]);
      setDel([]);
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePostStore(): StoreValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePostStore must be used within PostStoreProvider");
  return ctx;
}
