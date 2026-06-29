export default function COPInput({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Ej: $ 390.000"}
        className="border rounded-lg px-3 py-2 w-full"
      />
    </div>
  );
}
