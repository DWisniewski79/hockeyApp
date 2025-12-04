export default function Heading({
  children,
  level = 1,
  gradient = false,
  className = "",
}) {
  const Tag = `h${level}`;

  const base = "font-extrabold tracking-tight";

  const sizes = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
  };

  const gradientClasses =
    "bg-gradient-to-r from-brand-gold via-brand-retroYellow to-brand-magenta bg-clip-text text-transparent";

  return (
    <Tag
      className={`${base} ${sizes[level]} ${
        gradient ? gradientClasses : "text-brand-white"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
