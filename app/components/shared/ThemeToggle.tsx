export function ThemeToggle({ dark = false }: { dark?: boolean }) {
  return (
    <div className={dark ? "radio-btn" : "radio-btn-light"}>
      <div className={dark ? "radio-inner" : "radio-inner-light"}></div>
    </div>
  );
}
