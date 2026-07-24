export default function Card({
  title,
  value,
  children,
}) {
  return (
    <div className="card">

      {title && (
        <h3 className="card-title">
          {title}
        </h3>
      )}

      {value && (
        <h2 className="card-value">
          {value}
        </h2>
      )}

      {children}

    </div>
  );
}