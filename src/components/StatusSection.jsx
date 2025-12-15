export default function StatusSection({ status }) {
  return (
    <section className="status-section block">
      <div className="status-badge">
        <span className="status-dot"></span>
        <span>{status}</span>
      </div>
    </section>
  );
}
