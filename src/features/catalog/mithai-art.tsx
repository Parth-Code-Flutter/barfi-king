import type { ReactNode } from "react";
import type { CategoryId, Product } from "@/features/catalog/types";

type Shape = "disc" | "slab" | "diamond" | "ball" | "roll" | "mound" | "sticks" | "sev" | "mix" | "packet";
type Topping = "kesar" | "nuts" | "vark" | "drizzle" | "petals" | "flakes" | "grains" | null;

type Look = { shape: Shape; colour: string; topping: Topping; seed: number };

// First match wins, so the more specific flavours come first.
const FLAVOURS: [RegExp, string][] = [
  [/strawberry/, "#e8667b"],
  [/biscoff/, "#b97a45"],
  [/choco/, "#6b3b22"],
  [/mango/, "#f4b13d"],
  [/butterscotch/, "#dea25a"],
  [/gulkand|rose/, "#ea97ab"],
  [/khajur/, "#6e3a22"],
  [/anjeer/, "#93503d"],
  [/gajar/, "#e4682c"],
  [/dudhi/, "#b5c779"],
  [/pineapple/, "#f2d35b"],
  [/pancharatna|roasted|afghan/, "#a8642f"],
  [/kesar/, "#f2a33a"],
  [/exotica/, "#efd7a4"],
  [/kaju|topra|white|malai|paneer/, "#fbf1dc"],
  [/thabdi/, "#b9773f"],
  [/mava/, "#d9b07e"],
  [/motichoor/, "#f39a25"],
  [/besan/, "#e8a944"],
  [/churma/, "#c98b45"],
  [/tikha|spicy/, "#d65a2b"],
  [/banana/, "#a8c447"],
  [/sweet-chevdo/, "#efb43a"],
];

const CATEGORY_COLOUR: Record<CategoryId, string> = {
  peda: "#e9cfa0",
  fancy: "#e7b7a0",
  barfi: "#f2e2c4",
  "dry-fruit": "#f1e0bd",
  halwa: "#c8743a",
  laddu: "#efa23a",
  farsan: "#e3ac4b",
  wafer: "#f6cc4a",
};

function hash(text: string) {
  let value = 7;
  for (const char of text) value = (value * 31 + char.charCodeAt(0)) >>> 0;
  return value;
}

function mix(from: string, to: string, amount: number) {
  const a = parseInt(from.slice(1), 16);
  const b = parseInt(to.slice(1), 16);
  const channel = (shift: number) => Math.round(((a >> shift) & 255) * (1 - amount) + ((b >> shift) & 255) * amount);
  return `#${((channel(16) << 16) | (channel(8) << 8) | channel(0)).toString(16).padStart(6, "0")}`;
}

const shade = (colour: string, amount: number) => mix(colour, "#2b1408", amount);
const light = (colour: string, amount: number) => mix(colour, "#ffffff", amount);

function shapeOf(product: Product): Shape {
  const slug = product.slug;
  switch (product.category) {
    case "peda":
      return "disc";
    case "barfi":
      return "slab";
    case "dry-fruit":
      return /bite|sandwich|pak/.test(slug) ? "slab" : "diamond";
    case "fancy":
      if (/ball/.test(slug)) return "ball";
      if (/roll|vatika/.test(slug)) return "roll";
      if (/katri/.test(slug)) return "diamond";
      return /gulshan/.test(slug) ? "disc" : "slab";
    case "halwa":
      return "mound";
    case "laddu":
      return "ball";
    case "farsan":
      if (/chavana/.test(slug)) return "mix";
      return /sev/.test(slug) ? "sev" : "sticks";
    case "wafer":
      return "packet";
  }
}

function toppingOf(product: Product): Topping {
  const slug = product.slug;
  if (/motichoor|besan|churma/.test(slug)) return "grains";
  if (/kesar/.test(slug)) return "kesar";
  if (/choco|biscoff/.test(slug)) return "drizzle";
  if (/rose|gulkand/.test(slug)) return "petals";
  if (/topra/.test(slug)) return "flakes";
  if (/dry-fruit|pancharatna|roasted|akrot|afghan|american|khajana|anjeer/.test(slug)) return "nuts";
  if (/white|malai|kaju|exotica|marble/.test(slug)) return "vark";
  return null;
}

export function mithaiLook(product: Product): Look {
  const colour = FLAVOURS.find(([pattern]) => pattern.test(product.slug))?.[1] ?? CATEGORY_COLOUR[product.category];
  return { shape: shapeOf(product), colour, topping: toppingOf(product), seed: hash(product.slug) };
}

export function mithaiTint(product: Product) {
  return mix(shade(mithaiLook(product).colour, 0.08), "#f9e8c8", 0.72);
}

function random(seed: number) {
  let value = seed || 1;
  return () => {
    value = (value * 1103515245 + 12345) & 0x7fffffff;
    return value / 0x7fffffff;
  };
}

const TRIO: [number, number][] = [
  [43, 72],
  [77, 72],
  [60, 84],
];

function Topping({ kind, x, y, size, colour }: { kind: Topping; x: number; y: number; size: number; colour: string }) {
  const s = size / 16;
  switch (kind) {
    case "kesar":
      return (
        <g stroke="#c8321b" strokeWidth={1.3} strokeLinecap="round">
          <path d={`M${x - 5 * s} ${y - 1 * s} l${4 * s} ${-2 * s}`} />
          <path d={`M${x + 1 * s} ${y + 1.5 * s} l${5 * s} ${-1 * s}`} />
          <path d={`M${x - 2 * s} ${y + 2.5 * s} l${2 * s} ${-4.5 * s}`} />
        </g>
      );
    case "nuts":
      return (
        <g>
          <ellipse cx={x - 4 * s} cy={y} rx={2.6 * s} ry={1.5 * s} fill="#8db13c" transform={`rotate(-25 ${x - 4 * s} ${y})`} />
          <ellipse cx={x + 3.5 * s} cy={y - 1 * s} rx={2.8 * s} ry={1.6 * s} fill="#ecd5a5" transform={`rotate(20 ${x + 3.5 * s} ${y - s})`} />
          <ellipse cx={x + 0.5 * s} cy={y + 2.5 * s} rx={2.2 * s} ry={1.3 * s} fill="#7da332" />
        </g>
      );
    case "vark":
      return <ellipse cx={x} cy={y} rx={9 * s} ry={3.6 * s} fill="#eef1f4" opacity={0.85} />;
    case "drizzle":
      return (
        <path
          d={`M${x - 9 * s} ${y - 1 * s} l${3 * s} ${3 * s} l${3 * s} ${-4 * s} l${3 * s} ${4 * s} l${3 * s} ${-4 * s} l${3 * s} ${3 * s}`}
          stroke={colour === "#6b3b22" ? "#f3e2c4" : "#3b1f10"}
          strokeWidth={1.4}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "petals":
      return (
        <g fill="#d64f6d">
          <ellipse cx={x - 3 * s} cy={y} rx={2.6 * s} ry={1.4 * s} transform={`rotate(-30 ${x - 3 * s} ${y})`} />
          <ellipse cx={x + 3 * s} cy={y - 0.5 * s} rx={2.6 * s} ry={1.4 * s} transform={`rotate(35 ${x + 3 * s} ${y})`} />
        </g>
      );
    case "flakes":
      return (
        <g stroke="#ffffff" strokeWidth={1.5} strokeLinecap="round">
          <path d={`M${x - 6 * s} ${y} l${3 * s} ${-1 * s}`} />
          <path d={`M${x} ${y - 2 * s} l${3 * s} ${1 * s}`} />
          <path d={`M${x + 4 * s} ${y + 1.5 * s} l${2.5 * s} ${-1.5 * s}`} />
          <path d={`M${x - 2 * s} ${y + 2.5 * s} l${2.5 * s} ${0.5 * s}`} />
        </g>
      );
    default:
      return null;
  }
}

function Disc({ x, y, colour, topping }: { x: number; y: number; colour: string; topping: Topping }) {
  const r = 17;
  const ry = r * 0.5;
  return (
    <g>
      <ellipse cx={x} cy={y + 6} rx={r} ry={ry} fill={shade(colour, 0.3)} />
      <rect x={x - r} y={y} width={r * 2} height={6} fill={shade(colour, 0.3)} />
      <ellipse cx={x} cy={y} rx={r} ry={ry} fill={colour} />
      <ellipse cx={x} cy={y + 1} rx={r * 0.42} ry={ry * 0.4} fill={shade(colour, 0.14)} />
      <ellipse cx={x - r * 0.45} cy={y - ry * 0.45} rx={r * 0.26} ry={ry * 0.2} fill="#fff" opacity={0.5} />
      <Topping kind={topping} x={x} y={y} size={16} colour={colour} />
    </g>
  );
}

function Slab({ x, y, colour, topping, flat }: { x: number; y: number; colour: string; topping: Topping; flat?: boolean }) {
  const w = flat ? 21 : 17;
  const h = flat ? 7.5 : 8.5;
  const t = flat ? 4 : 9;
  return (
    <g>
      <path d={`M${x - w} ${y} L${x} ${y + h} L${x} ${y + h + t} L${x - w} ${y + t}Z`} fill={shade(colour, 0.16)} />
      <path d={`M${x} ${y + h} L${x + w} ${y} L${x + w} ${y + t} L${x} ${y + h + t}Z`} fill={shade(colour, 0.3)} />
      <path d={`M${x - w} ${y} L${x} ${y - h} L${x + w} ${y} L${x} ${y + h}Z`} fill={colour} />
      <path d={`M${x - w + 4} ${y} L${x} ${y - h + 2}`} stroke="#fff" strokeWidth={1.4} opacity={0.55} strokeLinecap="round" />
      <Topping kind={topping} x={x} y={y} size={flat ? 15 : 14} colour={colour} />
    </g>
  );
}

const GRAIN_SPOTS: [number, number][] = [
  [-0.5, -0.2], [0.1, -0.55], [0.45, -0.1], [-0.2, 0.35], [0.35, 0.45],
  [-0.6, 0.25], [0.05, 0.05], [0.55, -0.45], [-0.35, -0.6], [-0.1, 0.7], [0.7, 0.2],
];

function Ball({ x, y, colour, topping }: { x: number; y: number; colour: string; topping: Topping }) {
  const r = 15;
  return (
    <g>
      <ellipse cx={x} cy={y + r * 0.9} rx={r * 0.95} ry={r * 0.28} fill="#3a1d0d" opacity={0.18} />
      <circle cx={x} cy={y} r={r} fill={shade(colour, 0.24)} />
      <circle cx={x - 1.5} cy={y - 1.5} r={r - 2} fill={colour} />
      {topping === "grains"
        ? GRAIN_SPOTS.map(([dx, dy], index) => (
            <circle
              key={index}
              cx={x + dx * (r - 3)}
              cy={y + dy * (r - 3)}
              r={1.5}
              fill={index % 3 === 0 ? light(colour, 0.35) : shade(colour, 0.22)}
            />
          ))
        : null}
      <ellipse cx={x - r * 0.4} cy={y - r * 0.45} rx={r * 0.3} ry={r * 0.17} fill="#fff" opacity={0.55} transform={`rotate(-30 ${x - r * 0.4} ${y - r * 0.45})`} />
      {topping !== "grains" ? <Topping kind={topping} x={x + 1} y={y - 4} size={13} colour={colour} /> : null}
    </g>
  );
}

function Roll({ x, y, colour, topping }: { x: number; y: number; colour: string; topping: Topping }) {
  const r = 14;
  return (
    <g>
      <ellipse cx={x} cy={y + r * 0.9} rx={r} ry={r * 0.28} fill="#3a1d0d" opacity={0.18} />
      <circle cx={x} cy={y} r={r} fill={topping === "nuts" ? "#9bb84e" : shade(colour, 0.3)} />
      <circle cx={x} cy={y} r={r - 2.6} fill={light(colour, 0.1)} />
      <path
        d={`M${x} ${y} m-1.5 0 a1.5 1.5 0 1 1 3 0 a3.5 3.5 0 1 1 -7 0 a5.5 5.5 0 1 1 11 0 a7.5 7.5 0 1 1 -15 0`}
        fill="none"
        stroke={shade(colour, 0.38)}
        strokeWidth={1.5}
      />
      {topping === "kesar" || topping === "petals" ? <Topping kind={topping} x={x} y={y - r + 2} size={10} colour={colour} /> : null}
    </g>
  );
}

function Mound({ colour, topping }: { colour: string; topping: Topping }) {
  return (
    <g>
      <ellipse cx="60" cy="70" rx="38" ry="10" fill="#b4ab9d" />
      <path d="M26 76 C 30 52, 46 44, 60 44 C 74 44, 90 52, 94 76Z" fill={colour} />
      <path
        d="M38 64 q 8 -6 16 -2 M62 54 q 8 -3 14 3 M46 72 q 12 -6 26 0"
        stroke={shade(colour, 0.24)}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="47" cy="54" rx="8" ry="3" fill="#fff" opacity={0.35} transform="rotate(-25 47 54)" />
      {topping ? (
        <>
          <Topping kind={topping} x={50} y={56} size={13} colour={colour} />
          <Topping kind={topping} x={70} y={60} size={13} colour={colour} />
        </>
      ) : (
        <Topping kind="nuts" x={62} y={52} size={12} colour={colour} />
      )}
      <path d="M22 70 A38 10 0 0 0 98 70 Q 96 99 60 99 Q 24 99 22 70Z" fill="#d6d0c6" />
      <path d="M22 70 A38 10 0 0 0 98 70" stroke="#f2efe9" strokeWidth={2.5} fill="none" />
      <path d="M31 82 Q 35 93 50 96" stroke="#fff" strokeWidth={2.5} opacity={0.75} fill="none" strokeLinecap="round" />
    </g>
  );
}

const STICKS: [number, number, number, number][] = [
  [32, 72, 60, 64],
  [56, 60, 88, 74],
  [36, 86, 70, 82],
  [50, 80, 86, 68],
  [30, 80, 50, 90],
  [64, 90, 92, 84],
  [44, 66, 58, 78],
];

function Sticks({ colour, seed }: { colour: string; seed: number }) {
  const offset = seed % STICKS.length;
  const order = [...STICKS.slice(offset), ...STICKS.slice(0, offset)];
  return (
    <g strokeLinecap="round">
      {order.map(([x1, y1, x2, y2], index) => (
        <g key={index}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={shade(colour, 0.3)} strokeWidth={8.5} />
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colour} strokeWidth={6.5} />
          <line x1={x1 + 1} y1={y1 - 1.6} x2={x2 - 1} y2={y2 - 1.6} stroke={light(colour, 0.4)} strokeWidth={1.4} />
        </g>
      ))}
    </g>
  );
}

function Squiggles({ colour, seed, count, width }: { colour: string; seed: number; count: number; width: number }) {
  const next = random(seed);
  const items: ReactNode[] = [];
  for (let index = 0; index < count; index += 1) {
    const x = 32 + next() * 48;
    const y = 66 + next() * 22;
    const up = next() > 0.5 ? -3 : 3;
    items.push(
      <path
        key={index}
        d={`M${x} ${y} q 3 ${up} 6 0 t 6 0 t 6 0`}
        stroke={index % 3 === 0 ? shade(colour, 0.2) : colour}
        strokeWidth={width}
        fill="none"
        strokeLinecap="round"
      />,
    );
  }
  return <g>{items}</g>;
}

function Mix({ colour, seed }: { colour: string; seed: number }) {
  const next = random(seed + 3);
  const bits: ReactNode[] = [];
  for (let index = 0; index < 14; index += 1) {
    const x = 34 + next() * 52;
    const y = 68 + next() * 20;
    const kind = index % 3;
    bits.push(
      kind === 0 ? (
        <ellipse key={index} cx={x} cy={y} rx={3.2} ry={2.2} fill="#c98b55" stroke="#9b6233" strokeWidth={0.6} />
      ) : kind === 1 ? (
        <ellipse key={index} cx={x} cy={y} rx={3.2} ry={1.3} fill="#5f8a2c" transform={`rotate(${next() * 180} ${x} ${y})`} />
      ) : (
        <circle key={index} cx={x} cy={y} r={1.8} fill="#f1c84b" />
      ),
    );
  }
  return (
    <g>
      <Squiggles colour={colour} seed={seed} count={14} width={2.2} />
      {bits}
    </g>
  );
}

const CHEVDO: [number, number, number][] = [
  [-8, -6, 2], [4, -9, 0], [8, -2, 2], [-2, 0, 1], [-10, 4, 0], [2, 6, 2],
  [10, 6, 1], [-4, 9, 2], [6, 0, 0], [-6, -2, 2], [0, -5, 1], [-1, 11, 0],
];

function Packet({ colour, slug }: { colour: string; slug: string }) {
  const crimp = Array.from({ length: 13 }, (_, index) => `L${34 + index * 4 + 2} ${index % 2 === 0 ? 22 : 28}`).join(" ");
  const chip = /banana/.test(slug) ? "#efe08a" : /chevdo/.test(slug) ? "#f1c84b" : "#f7d468";
  const spicy = /spicy|tikha/.test(slug);
  return (
    <g>
      <ellipse cx="60" cy="104" rx="34" ry="6" fill="#3a1d0d" opacity={0.16} />
      <path d={`M34 28 ${crimp} L86 28 L88 34 L34 34Z`} fill={shade(colour, 0.25)} />
      <path d="M34 32 L86 32 L90 100 Q60 107 30 100Z" fill={colour} />
      <rect x="34" y="40" width="53" height="7" fill={shade(colour, 0.22)} />
      <circle cx="60" cy="72" r="17" fill="#fffaf0" />
      {/chevdo/.test(slug) ? (
        <g>
          {CHEVDO.map(([dx, dy, kind], index) =>
            kind === 0 ? (
              <ellipse key={index} cx={60 + dx} cy={72 + dy} rx={3} ry={2} fill="#c98b55" />
            ) : kind === 1 ? (
              <ellipse key={index} cx={60 + dx} cy={72 + dy} rx={3} ry={1.2} fill="#5f8a2c" transform={`rotate(${dx * 9} ${60 + dx} ${72 + dy})`} />
            ) : (
              <path key={index} d={`M${60 + dx - 4} ${72 + dy} q 2 -2 4 0 t 4 0`} stroke={spicy ? "#d65a2b" : chip} strokeWidth={2} fill="none" strokeLinecap="round" />
            ),
          )}
        </g>
      ) : (
        <g>
          <ellipse cx="54" cy="68" rx="8" ry="6" fill={chip} stroke={shade(chip, 0.2)} strokeWidth={0.8} />
          <ellipse cx="66" cy="71" rx="8" ry="6" fill={light(chip, 0.15)} stroke={shade(chip, 0.2)} strokeWidth={0.8} />
          <ellipse cx="58" cy="79" rx="8" ry="6" fill={chip} stroke={shade(chip, 0.2)} strokeWidth={0.8} />
          {spicy ? (
            <g fill="#c8321b">
              <circle cx="52" cy="67" r="1" />
              <circle cx="68" cy="70" r="1" />
              <circle cx="60" cy="79" r="1" />
              <circle cx="63" cy="66" r="0.8" />
            </g>
          ) : null}
        </g>
      )}
      <path d="M40 38 L36 96" stroke="#fff" strokeWidth={3} opacity={0.3} strokeLinecap="round" />
    </g>
  );
}

function Plate() {
  return (
    <g>
      <ellipse cx="60" cy="94" rx="54" ry="18" fill="#b9b0a3" />
      <ellipse cx="60" cy="92" rx="54" ry="17" fill="#ebe7e0" />
      <ellipse cx="60" cy="92" rx="42" ry="12" fill="#d9d3c9" />
      <ellipse cx="60" cy="91" rx="40" ry="11" fill="#f4f1eb" />
      <path d="M17 87 Q 28 79 50 77" stroke="#fff" strokeWidth={2} opacity={0.8} fill="none" strokeLinecap="round" />
    </g>
  );
}

const VIEWBOX: Partial<Record<Shape, string>> = {
  packet: "8 16 104 96",
  mound: "12 38 96 70",
};

export function MithaiArt({ product, className }: { product: Product; className?: string }) {
  const { shape, colour, topping, seed } = mithaiLook(product);
  const tilt = (seed % 9) - 4;

  let body: ReactNode;
  switch (shape) {
    case "disc":
      body = TRIO.map(([x, y]) => <Disc key={`${x}-${y}`} x={x} y={y} colour={colour} topping={topping} />);
      break;
    case "slab":
    case "diamond":
      body = TRIO.map(([x, y]) => <Slab key={`${x}-${y}`} x={x} y={y - 2} colour={colour} topping={topping} flat={shape === "diamond"} />);
      break;
    case "ball":
      body = TRIO.map(([x, y]) => <Ball key={`${x}-${y}`} x={x} y={y - 2} colour={colour} topping={topping} />);
      break;
    case "roll":
      body = TRIO.map(([x, y]) => <Roll key={`${x}-${y}`} x={x} y={y - 2} colour={colour} topping={topping} />);
      break;
    case "mound":
      body = <Mound colour={colour} topping={topping} />;
      break;
    case "sticks":
      body = <Sticks colour={colour} seed={seed} />;
      break;
    case "sev":
      body = <Squiggles colour={colour} seed={seed} count={22} width={/fine/.test(product.slug) ? 1.6 : 3} />;
      break;
    case "mix":
      body = <Mix colour={colour} seed={seed} />;
      break;
    case "packet":
      body = <Packet colour={colour} slug={product.slug} />;
      break;
  }

  return (
    <svg viewBox={VIEWBOX[shape] ?? "4 48 112 66"} className={className} aria-hidden="true">
      {shape === "packet" || shape === "mound" ? null : <Plate />}
      {shape === "mound" ? <ellipse cx="60" cy="100" rx="40" ry="6" fill="#3a1d0d" opacity={0.14} /> : null}
      <g transform={shape === "packet" || shape === "mound" ? undefined : `rotate(${tilt} 60 80)`}>{body}</g>
    </svg>
  );
}
