export function Spinner({ size = 22 }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="border-2 border-ink-line border-t-aura rounded-full animate-spin"
    />
  );
}

export default function Loader({ label = "Memuat..." }) {
  return (
    <div className="flex items-center gap-3 text-mist text-sm py-10 justify-center">
      <Spinner size={18} />
      {label}
    </div>
  );
}

export function LoaderBaris({ tinggi = 56 }) {
  return (
    <div
      className="animasi-loading rounded-lg w-full"
      style={{ height: tinggi }}
    />
  );
}
