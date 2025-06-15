
import React from "react";

// Helper to split string into array (preserve dashes and spaces)
function verticalTextChars(str: string): string[] {
  return str.split("");
}

interface VerticalTextProps {
  text: string;
  className?: string;
}

const VerticalText: React.FC<VerticalTextProps> = ({ text, className = "" }) => {
  return (
    <span
      className={`text-white font-semibold tracking-widest select-none ${className}`}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 0, marginBottom: 0 }}
    >
      {verticalTextChars(text).map((char, idx) => (
        <span
          key={idx}
          style={{
            display: 'block',
            margin: char === " " ? "0.3em" : "0.05em",
            opacity: char === " " ? 0 : 1, // Blank for spaces
            height: "1em",
            width: "auto",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default VerticalText;
