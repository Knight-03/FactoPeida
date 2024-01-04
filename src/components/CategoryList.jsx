import React from "react";
import Select from "react-select";

const CategoryList = ({ selectedCategory, setSelectedCategory }) => {
  const topics = [
    { value: "All", label: "All", color: "#10b981" },
    { value: "Life", label: "Life", color: "#14b8a6" },
    { value: "Self_Improvement", label: "Self Improvement", color: "#06b6d4" },
    { value: "Work", label: "Work", color: "#0ea5e9" },
    { value: "Technology", label: "Technology", color: "#60a5fa" },
    { value: "Software_Development", label: "Software Development", color: "#818cf8" },
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
  return (
    <div className="flex justify-start">
      <Select
        options={topics}
        onChange={(selectedOption) => setSelectedCategory(selectedOption)}
        placeholder="Filter By..."
        className="w-48 mt-10 font-semibold text-lg font-italic font-mono"
        styles={customStyles}
        required
      />
    </div>
  );
};
export default CategoryList;
