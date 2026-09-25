type AuthButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

export default function AuthButton({ children, loading, disabled }: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="inline-flex min-h-12 w-full items-center justify-center bg-charcoal px-7 text-[0.72rem] tracking-[0.2em] text-ivory-soft uppercase transition-colors hover:bg-champagne-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}
