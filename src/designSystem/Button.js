export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-full font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-brand-gold text-brand-black hover:bg-brand-retroYellow focus:ring-brand-gold",
    secondary:
      "border border-brand-teal text-brand-teal hover:bg-brand-greyLight hover:text-brand-retroYellow transition focus:ring-brand-teal",
    danger:
      "bg-brand-magenta text-white hover:bg-brand-purple focus:ring-brand-magenta",
    subtle:
      "bg-brand-greyLight text-brand-white hover:bg-brand-grey focus:ring-brand-greyLight",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}