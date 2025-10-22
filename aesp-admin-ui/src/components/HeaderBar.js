export default function HeaderBar() {
  return (
    <div
      style={{
        background: "#fff",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ margin: 0 }}>AESP Admin</h2>
      <span>Xin chào, Admin 👋</span>
    </div>
  );
}
