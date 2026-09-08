/** @format */

const Button = ({
  children,
  backgroundColor,
  borderColor,
  textColor,
  fullWidth,
  icon,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-brand px-5 py-2.5 text-sm font-semibold tracking-wide transition duration-brand ease-brand focus-visible:shadow-focus disabled:opacity-60';

  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-deep',
    secondary:
      'border border-black/10 bg-transparent text-ink hover:border-brand hover:text-brand dark:border-white/15 dark:text-white',
    onDark:
      'border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10',
    ghost: 'bg-transparent text-ink-muted hover:text-ink dark:text-gray-300'
  };

  const legacy =
    backgroundColor &&
    `${backgroundColor} ${borderColor || ''} ${textColor || ''} border hover:opacity-90`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${legacy || variants[variant] || variants.primary} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="h-4 w-4 rounded-full object-contain"
        />
      )}
    </button>
  );
};

export default Button;
