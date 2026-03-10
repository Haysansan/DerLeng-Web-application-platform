// OTPInput.jsx (or inside Register.jsx)
import { useRef } from "react";

export default function OTPInput({ value, onChange, error }) {
  const inputsRef = useRef([]);

const handleChange = (e, index) => {
  let val = e.target.value;
  if (val && /\D/.test(val)) return;
  const newValue = value.split("");
  newValue[index] = val; 
  onChange(newValue.join(""));

  if (val && index < inputsRef.current.length - 1) {
    inputsRef.current[index + 1].focus();
  }
    };
    

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newValue = value.split("");
      newValue[index] = "";
      onChange(newValue.join(""));

      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          ref={el => inputsRef.current[i] = el}
          type="text"
          maxLength={1}
          value={value[i] || ""}
          onChange={e => handleChange(e, i)}
          onKeyDown={e => handleBackspace(e, i)}
          className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#008A3D] text-lg"
        />
      ))}
      {error && <p className="text-red-500 text-xs mt-1 absolute bottom-[-24px]">{error}</p>}
    </div>
  );
}