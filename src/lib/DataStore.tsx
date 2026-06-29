"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  hotels as seedHotels,
  operators as seedOperators,
  places as seedPlaces,
} from "./data";
import { Business, Place } from "./types";

const SEED_PLACES = seedPlaces;
const SEED_BIZ: Business[] = [...seedHotels, ...seedOperators];

const LS = {
  places: "nc-places",
  placesDel: "nc-places-del",
  biz: "nc-biz",
  bizDel: "nc-biz-del",
};

function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function mergePlaces(overlay: Place[], del: string[]): Place[] {
  const byId = new Map(overlay.map((p) => [p.id, p]));
  const seedIds = new Set(SEED_PLACES.map((p) => p.id));
  const merged = SEED_PLACES.filter((p) => !del.includes(p.id)).map(
    (p) => byId.get(p.id) ?? p
  );
  const added = overlay.filter((p) => !seedIds.has(p.id));
  return [...added, ...merged];
}

function mergeBiz(overlay: Business[], del: string[]): Business[] {
  const byId = new Map(overlay.map((b) => [b.id, b]));
  const seedIds = new Set(SEED_BIZ.map((b) => b.id));
  const merged = SEED_BIZ.filter((b) => !del.includes(b.id)).map(
    (b) => byId.get(b.id) ?? b
  );
  const added = overlay.filter((b) => !seedIds.has(b.id));
  return [...added, ...merged];
}

type StoreValue = {
  hydrated: boolean;
  places: Place[];
  businesses: Business[];
  getPlace: (id: string) => Place | undefined;
  getPlaceByQr: (qr: number) => Place | undefined;
  getBusiness: (id: string) => Business | undefined;
  businessesForCategory: (type: string) => Business[];
  savePlace: (p: Place) => void;
  deletePlace: (id: string) => void;
  saveBusiness: (b: Business) => void;
  deleteBusiness: (id: string) => void;
  resetAll: () => void;
};

const Ctx = createContext<StoreValue | null>(null);

export function DataStoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [placeOverlay, setPlaceOverlay] = useState<Place[]>([]);
  const [placeDel, setPlaceDel] = useState<string[]>([]);
  const [bizOverlay, setBizOverlay] = useState<Business[]>([]);
  const [bizDel, setBizDel] = useState<string[]>([]);

  useEffect(() => {
    setPlaceOverlay(read<Place[]>(LS.places, []));
    setPlaceDel(read<string[]>(LS.placesDel, []));
    setBizOverlay(read<Business[]>(LS.biz, []));
    setBizDel(read<string[]>(LS.bizDel, []));
    setHydrated(true);
  }, []);

  const places = useMemo(
    () => (hydrated ? mergePlaces(placeOverlay, placeDel) : SEED_PLACES),
    [hydrated, placeOverlay, placeDel]
  );
  const businesses = useMemo(
    () => (hydrated ? mergeBiz(bizOverlay, bizDel) : SEED_BIZ),
    [hydrated, bizOverlay, bizDel]
  );

  const value: StoreValue = {
    hydrated,
    places,
    businesses,
    getPlace: (id) => places.find((p) => p.id === id),
    getPlaceByQr: (qr) => places.find((p) => p.qrPoint === qr),
    getBusiness: (id) => businesses.find((b) => b.id === id),
    businessesForCategory: (type) =>
      type === "accommodation"
        ? businesses.filter((b) => b.category === "accommodation")
        : businesses.filter((b) => b.category === type),
    savePlace: (p) => {
      setPlaceOverlay((prev) => {
        const next = [...prev.filter((x) => x.id !== p.id), p];
        localStorage.setItem(LS.places, JSON.stringify(next));
        return next;
      });
      setPlaceDel((prev) => {
        const next = prev.filter((id) => id !== p.id);
        localStorage.setItem(LS.placesDel, JSON.stringify(next));
        return next;
      });
    },
    deletePlace: (id) => {
      setPlaceOverlay((prev) => {
        const next = prev.filter((x) => x.id !== id);
        localStorage.setItem(LS.places, JSON.stringify(next));
        return next;
      });
      if (SEED_PLACES.some((p) => p.id === id)) {
        setPlaceDel((prev) => {
          const next = [...new Set([...prev, id])];
          localStorage.setItem(LS.placesDel, JSON.stringify(next));
          return next;
        });
      }
    },
    saveBusiness: (b) => {
      setBizOverlay((prev) => {
        const next = [...prev.filter((x) => x.id !== b.id), b];
        localStorage.setItem(LS.biz, JSON.stringify(next));
        return next;
      });
      setBizDel((prev) => {
        const next = prev.filter((id) => id !== b.id);
        localStorage.setItem(LS.bizDel, JSON.stringify(next));
        return next;
      });
    },
    deleteBusiness: (id) => {
      setBizOverlay((prev) => {
        const next = prev.filter((x) => x.id !== id);
        localStorage.setItem(LS.biz, JSON.stringify(next));
        return next;
      });
      if (SEED_BIZ.some((b) => b.id === id)) {
        setBizDel((prev) => {
          const next = [...new Set([...prev, id])];
          localStorage.setItem(LS.bizDel, JSON.stringify(next));
          return next;
        });
      }
    },
    resetAll: () => {
      [LS.places, LS.placesDel, LS.biz, LS.bizDel].forEach((k) =>
        localStorage.removeItem(k)
      );
      setPlaceOverlay([]);
      setPlaceDel([]);
      setBizOverlay([]);
      setBizDel([]);
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDataStore(): StoreValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDataStore must be used within DataStoreProvider");
  return ctx;
}
