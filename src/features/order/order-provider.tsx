"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { LocaleText } from "@/features/catalog/types";

export type Audience = "home" | "trade";

export type OrderLine = {
  id: string;
  slug: string;
  name: LocaleText;
  qty: LocaleText;
  amount: number | null;
  count: number;
};

type OrderState = {
  audience: Audience;
  lines: OrderLine[];
};

const STORAGE_KEY = "bk-order";
const CHANGE_EVENT = "bk-order-change";
const EMPTY: OrderState = { audience: "home", lines: [] };

let state: OrderState = EMPTY;
let hydrated = false;

function emit() {
  if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CHANGE_EVENT, onStoreChange);
}

function readState() {
  return hydrated ? state : EMPTY;
}

export type LastAdded = {
  id: string;
  name: LocaleText;
  qty: LocaleText;
  stamp: number;
};

type OrderContextValue = {
  audience: Audience;
  lines: OrderLine[];
  count: number;
  lastAdded: LastAdded | null;
  setAudience: (audience: Audience) => void;
  addLine: (line: Omit<OrderLine, "count">) => void;
  setCount: (id: string, count: number) => void;
  undoLast: () => void;
  dismissLast: () => void;
  clear: () => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, readState, () => EMPTY);
  const [lastAdded, setLastAdded] = useState<LastAdded | null>(null);

  useEffect(() => {
    if (state.lines.length === 0) {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as OrderState;
          if (parsed && (parsed.audience === "home" || parsed.audience === "trade") && Array.isArray(parsed.lines)) {
            state = parsed;
          }
        } catch {
          state = EMPTY;
        }
      }
    }
    hydrated = true;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const setAudience = useCallback((audience: Audience) => {
    state = { ...state, audience };
    emit();
  }, []);

  const addLine = useCallback((line: Omit<OrderLine, "count">) => {
    const existing = state.lines.find((item) => item.id === line.id);
    const lines = existing
      ? state.lines.map((item) => (item.id === line.id ? { ...item, count: item.count + 1 } : item))
      : [...state.lines, { ...line, count: 1 }];
    state = { ...state, lines };
    emit();
    setLastAdded({ id: line.id, name: line.name, qty: line.qty, stamp: Date.now() });
  }, []);

  const setCount = useCallback((id: string, count: number) => {
    const lines =
      count < 1
        ? state.lines.filter((item) => item.id !== id)
        : state.lines.map((item) => (item.id === id ? { ...item, count } : item));
    state = { ...state, lines };
    emit();
  }, []);

  const undoLast = useCallback(() => {
    if (lastAdded) {
      const line = state.lines.find((item) => item.id === lastAdded.id);
      if (line) setCount(line.id, line.count - 1);
    }
    setLastAdded(null);
  }, [lastAdded, setCount]);

  const dismissLast = useCallback(() => setLastAdded(null), []);

  const clear = useCallback(() => {
    state = { ...state, lines: [] };
    emit();
    setLastAdded(null);
  }, []);

  const value = useMemo<OrderContextValue>(
    () => ({
      audience: snapshot.audience,
      lines: snapshot.lines,
      count: snapshot.lines.reduce((sum, line) => sum + line.count, 0),
      lastAdded,
      setAudience,
      addLine,
      setCount,
      undoLast,
      dismissLast,
      clear,
    }),
    [snapshot, lastAdded, setAudience, addLine, setCount, undoLast, dismissLast, clear],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const value = useContext(OrderContext);
  if (!value) throw new Error("useOrder must be used inside OrderProvider");
  return value;
}
