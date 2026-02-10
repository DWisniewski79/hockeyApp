export default function Card({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  const base =
    "rounded-xl p-4 shadow border transition";

  const variants = {
    default: "bg-brand-grey border-brand-greyLight",
    highlight: "bg-brand-grey border-brand-purple/50 hover:border-brand-magenta/60",
    gold: "bg-brand-grey border-brand-gold",
    subtle: "bg-brand-greyLight border-brand-grey",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
