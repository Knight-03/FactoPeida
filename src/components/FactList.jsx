import React from "react";
import { BsArrowRepeat } from "react-icons/bs";
import axios from "axios";

const FactList = ({ FactsToAdd, setFacts }) => {
  const getCategoryColor = (category) => {
    // Define a mapping of category to background color
    const categoryColors = {
      Life: "#14b8a6",
      Self_Improvement: "#06b6d4",
      Work: "#0ea5e9",
      Technology: "#60a5fa",
      Software_Development: "#818cf8",
      Media: "#a78bfa",
      Society: "#f87171",
      Culture: "#86efac",
      World: "#ec4899",
    };

    return categoryColors[category] || "#E2E8F0"; // Default color if category is not found
  };

  const handleLikeClick = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/facts/${id}/?action=likes`
      );

      setFacts((prevFacts) =>
        prevFacts.map((prevFact) =>
          prevFact._id === id
            ? { ...prevFact, likes: response.data.data.updatedFact.likes }
            : prevFact
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleRepeatClick = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/facts/${id}/?action=repeats`
      );

      setFacts((prevFacts) =>
        prevFacts.map((prevFact) =>
          prevFact._id === id
            ? { ...prevFact, repeats: response.data.data.updatedFact.repeats }
            : prevFact
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDisputedClick = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/facts/${id}/?action=disputed`
      );
      // console.log( response.data.data.updatedFact.disputed )
      setFacts((prevFacts) =>
        prevFacts.map((prevFact) =>
          prevFact._id === id
            ? { ...prevFact, disputed: response.data.data.updatedFact.disputed }
            : prevFact
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const insertLineBreaks = (text) => {
    const maxLength = 70;
    let result = "";
    for (let i = 0; i < text.length; i += maxLength) {
      result += text.slice(i, i + maxLength) + "\n";
    }
    return result.trim();
  };

  return (
    <div className="flex flex-col py-6 items-start justify-center gap-6">
      {FactsToAdd &&
        FactsToAdd.map((fact, index) => (
          <div
            key={index}
            className="flex flex-col justify-between p-3 items-center bg-sky-900 rounded-xl w-11/12 font-mono xl:flex-row max-md:items-start max-md:w-full max-lg:w-full"
          >
            <p className="text-white text-2xl w-full xl:w-8/12 mb-4 xl:mb-0 max-md:w-auto">
              {insertLineBreaks(fact.fact)}
            </p>
            <div className="flex flex-row gap-2 items-center justify-start w-full xl:w-auto max-md:flex-row max-md:items-center max-sm:flex-col max-sm:items-start ">
              <p
                className="rounded-full text-black px-2 text-sm font-thin"
                style={{
                  background: getCategoryColor(fact.category),
                }}
              >
                {fact.category}
              </p>
              <div className="flex flex-row gap-3 h-8 max-md:gap-1">
                <button
                  className={`bg-slate-600 text-white rounded-full border-2 border-white px-2`}
                  onClick={() => handleLikeClick(fact._id)}
                >
                  👍 {fact.likes}
                </button>
                <button
                  className={`flex flex-row gap-2 items-center bg-slate-600 text-white rounded-full border-2 border-white px-2`}
                  onClick={() => handleRepeatClick(fact._id)}
                >
                  <BsArrowRepeat size={18} /> {fact.repeats}
                </button>
                <button
                  className={`bg-slate-600 text-white rounded-full border-2 border-white px-2`}
                  onClick={() => handleDisputedClick(fact._id)}
                >
                  ⛔ {fact.disputed}
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FactList;
