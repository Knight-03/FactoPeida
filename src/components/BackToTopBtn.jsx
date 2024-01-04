import React, { useState, useEffect } from "react";
import { LiaChevronCircleUpSolid } from "react-icons/lia";

const BackToTopBtn = () => {
  const [BackToTopBtn, setBackToTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopBtn(true);
      } else {
        setBackToTopBtn(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {BackToTopBtn && (
        <LiaChevronCircleUpSolid
          size={60}
          color="white"
          className="fixed bottom-12 right-12"
          onClick={scrollUp}
        />
      )}
    </div>
  );
};

export default BackToTopBtn;
