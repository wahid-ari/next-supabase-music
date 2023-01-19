import Link from "next/link";

export default function PlaylistItem({ href = "#", title = "Genre", index, ...props }) {
  const colors = ["#36b9cc", "#1cc88a", "#6f42c1", "#e74a3b", "#fd7e14", "#f6c23e", "#84cc16", "#22c55e", "#2563eb", "#f43f5e", "#8b5cf6", "#ea580c", "#facc15"];
  const color = Math.random().toString(16).substr(-6)

  return (
    <Link href={href} className="group focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded" {...props}>
      {/* <div style={{ backgroundColor: "#" + color }} className={`brightness-90 group-hover:brightness-110 transition-all duration-500 h-40 rounded flex items-center justify-center mb-2`}> */}
      {/* <div style={{ backgroundColor: colors[index] }} className={`brightness-90 group-hover:brightness-110 shadow-lg transition-all duration-500 h-32 rounded flex items-center justify-center mb-2`}> */}
      <div
        style={{ background: `linear-gradient(${colors[index]}, #${color})` }}
        className={`brightness-90 group-hover:brightness-110 shadow-lg transition-all duration-500 h-32 rounded flex items-center justify-center p-4 text-center`}>
        <p className="text-xl font-medium text-white">{title}</p>
      </div>
    </Link>
  )
}