"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ITINERARY } from "./mockAI";

const LS = "nc-plan";
const DEFAULT_START = 8 * 60 + 30; // 08:30

type PlanState = {
  placeIds: string[];
  interests: string[];
  startMin: number;
};

const DEFAULT_PLAN: PlanState = {
  placeIds: ITINERARY.map((it) => it.id),
  interests: [],
  startMin: DEFAULT_START,
};

type PlanValue = PlanState & {
  hydrated: boolean;
  setPlan: (ids: string[]) => void;
  addStop: (id: string) => void;
  removeStop: (id: string) => void;
  setInterests: (interests: string[]) => void;
  clearPlan: () => void;
};

const Ctx = createContext<PlanValue | null>(null);

export function PlanStoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<PlanState>(DEFAULT_PLAN);

  useEffect(() => {
    try {
      const v = localStorage.getItem(LS);
      if (v) {
        const parsed = JSON.parse(v) as Partial<PlanState>;
        setState({
          placeIds: Array.isArray(parsed.placeIds) ? parsed.placeIds : DEFAULT_PLAN.placeIds,
          interests: Array.isArray(parsed.interests) ? parsed.interests : [],
          startMin: typeof parsed.startMin === "number" ? parsed.startMin : DEFAULT_START,
        });
      }
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  const persist = (next: PlanState) => {
    setState(next);
    try {
      localStorage.setItem(LS, JSON.stringify(next));
    } catch {
      /* storage may be unavailable */
    }
  };

  const value = useMemo<PlanValue>(
    () => ({
      ...state,
      hydrated,
      setPlan: (ids) => persist({ ...state, placeIds: [...new Set(ids)] }),
      addStop: (id) =>
        persist(
          state.placeIds.includes(id)
            ? state
            : { ...state, placeIds: [...state.placeIds, id] }
        ),
      removeStop: (id) =>
        persist({ ...state, placeIds: state.placeIds.filter((x) => x !== id) }),
      setInterests: (interests) => persist({ ...state, interests }),
      clearPlan: () => persist({ ...state, placeIds: [] }),
    }),
    [state, hydrated]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlanStore(): PlanValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlanStore must be used within PlanStoreProvider");
  return ctx;
}
