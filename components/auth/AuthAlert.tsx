type AuthAlertProps = {
  tone: "error" | "success";
  children: React.ReactNode;
};

export default function AuthAlert({ tone, children }: AuthAlertProps) {
  const isError = tone === "error";

  return (
    <p
      role={isError ? "alert" : "status"}
      className={`border px-4 py-3 text-sm leading-6 ${
        isError
          ? "border-red-700/25 bg-red-700/8 text-red-800"
          : "border-gold-line bg-ivory-soft text-ink"
      }`}
    >
      {children}
    </p>
  );
}
