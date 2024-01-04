import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";

const AddFact = ({ facts, setFacts, openAddFact, setOpenAddFact }) => {
  const [getText, setText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const maxCharacters = 200;
  const minCharacters = 5;

  const topics = [
    { value: "Life", label: "Life", color: "#14b8a6" },
    { value: "Self_Improvement", label: "Self Improvement", color: "#06b6d4" },
    { value: "Work", label: "Work", color: "#0ea5e9" },
    { value: "Technology", label: "Technology", color: "#60a5fa" },
    {
      value: "Software_Development",
      label: "Software Development",
      color: "#818cf8",
    },
    { value: "Media", label: "Media", color: "#a78bfa" },
    { value: "Society", label: "Society", color: "#f87171" },
    { value: "Culture", label: "Culture", color: "#86efac" },
    { value: "World", label: "World", color: "#ec4899" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: selectedCategory?.color || "#E2E8F0",
    }),
  };
  const handleTextOnAdd = async (e) => {
    e.preventDefault();
    if (getText && selectedCategory) {
      const newFact = {
        fact: getText,
        category: selectedCategory.value,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}api/v1/facts`,
          newFact
        );
        setFacts([...facts, response.data.data.newFact]);
        // console.log(response);
      } catch (err) {
        console.log(err.message);
      }
      setText("");
      setSelectedCategory(null);
      setOpenAddFact(false)
    }
  };

  const getRemainingCharacters = () => maxCharacters - getText.length;

  return (
    <>
      {openAddFact && (
        <div className="flex flex-row items-center justify-between min-h-16 w-full mt-6 h-full max-md:flex-col max-xl:flex-col">
          <textarea
            className={`h-16 w-2/3 px-4 py-4 rounded-2xl resize-y font-mono text-gray-100 text-xl bg-gray-600 overflow-hidden max-md:w-full max-md:px-2 max-xl:w-full`}
            placeholder="Share Your Thought..."
            value={getText}
            onChange={(e) => {
              setText(e.target.value);
            }}
            style={{ maxHeight: "7rem", minHeight: "4rem" }}
            maxLength={maxCharacters}
            minLength={minCharacters}
          /> 
          <p className="text-lg text-white max-md:w-full max-md:text-end max-xl:w-full max-xl:text-end">
            {getRemainingCharacters()}
          </p>
          <div className="flex flex-row gap-12 items-center max-md:gap-6 max-xl:gap-8 max-xl:w-full ">
            <Select
              options={topics}
              value={selectedCategory}
              onChange={(selectedOption) => setSelectedCategory(selectedOption)}
              placeholder="Category..."
              className="w-48 font-semibold text-lg font-italic font-mono max-md:w-36"
              styles={customStyles}
              required
            />
            <button
              className="px-6 py-2 bg-sky-900 items-center text-2xl font-semibold font-mono rounded-lg text-white duration-300 ease-in-out hover:bg-sky-700"
              onClick={handleTextOnAdd}
            >
              Share
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFact;
