export default function SectionHeader({
  title,
  subtitle,
  accent = "gold",
  className = "",
}) {
  const accentMap = {
    gold: "text-brand-gold",
    magenta: "text-brand-magenta",
    teal: "text-brand-teal",
    purple: "text-brand-purple",
  };

  return (
    <div className={`flex items-baseline justify-between mb-3 ${className}`}>
      <h2 className={`text-lg font-bold ${accentMap[accent]}`}>{title}</h2>
      {subtitle && (
        <span className="text-xs text-brand-white/60">{subtitle}</span>
      )}
    </div>
  );
}
