import React, { useEffect } from "react";
import "./TextAnimation.css";

const TextAnimation = () => {
  const text = "FactoPedia";

  useEffect(() => {
    const letters = document.querySelectorAll(".animated-letter");
    letters.forEach((letter, index) => {
      letter.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.2}s`;
    });
  }, []);

  return (
    <div className="text-animation text-[#75cbb5]">
      {text.split("").map((char, index) => (
        <span key={index} className="animated-letter">
          {char}
        </span>
      ))}
    </div>
  );
};

export default TextAnimation;
