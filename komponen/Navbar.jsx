export default function Navbar() {
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      <div className="w-8 h-8 rounded-full overflow-hidden border border-aura/50 bg-black">
        <img src="/logo/logo-ikon.png" alt="Aura Sports Club" className="w-full h-full object-cover" />
      </div>
      <span className="font-display font-bold text-paper tracking-wide">AURA</span>
      <span className="text-aura text-[10px] font-mono tracking-[0.25em] uppercase">Sports Club</span>
    </div>
  );
}
