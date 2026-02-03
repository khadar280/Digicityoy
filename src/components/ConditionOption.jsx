export default function ConditionOption({
  label,
  options,
  value,
  onChange
}) {
  return (
    <div className="section">
      <label>{label}</label>

      <div className="options">
        {options.map(option => (
          <div
            key={option.value}
            className={`option ${value === option.value ? "active" : ""}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
