export default function SkorPage() {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold text-paper mb-8">
        Skor Live
      </h2>

      <div className="bg-ink-soft border border-ink-line rounded-2xl p-8">

        <div className="grid grid-cols-3 items-center text-center">

          <div>
            <h3 className="text-paper font-semibold">
              Tim A
            </h3>

            <div className="text-6xl font-bold text-paper mt-3">
              0
            </div>
          </div>

          <div className="text-mist">
            VS
          </div>

          <div>
            <h3 className="text-paper font-semibold">
              Tim B
            </h3>

            <div className="text-6xl font-bold text-paper mt-3">
              0
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}