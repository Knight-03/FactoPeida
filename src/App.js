// import React, { useState } from 'react';

// const App = () => {
//   const [selectedRole, setSelectedRole] = useState('');
//   const [selectedDomain, setSelectedDomain] = useState('');
//   const [selectedBranch, setSelectedBranch] = useState('');
//   const [selectedField, setSelectedField] = useState('');
//   const [selectedSkills, setSelectedSkills] = useState([]);

//   const roles = ['Student', 'Working Professional', 'Government'];
//   const domains = ['Engineering', 'Pharmacy', 'Management'];
//   const branches = ['CE', 'CSE', 'IT', 'Pharmacy', 'Management'];
//   const fields = ['ML', 'Web Development', 'iOS Development', 'Android Development'];

//   const skillsByField = {
//     'Web Development': ['HTML', 'CSS', 'JavaScript', 'React', '...other skills'],
//     // Add more skills for other fields
//   };

//   const handleRoleChange = (role) => {
//     setSelectedRole(role);
//   };

//   const handleDomainChange = (domain) => {
//     setSelectedDomain(domain);
//   };

//   const handleBranchChange = (branch) => {
//     setSelectedBranch(branch);
//   };

//   const handleFieldChange = (field) => {
//     setSelectedField(field);
//     setSelectedSkills(skillsByField[field] || []);
//   };

//   return (
//     <div>
//       <h1>Job Questionnaire</h1>
//       <div>
//         <p>1 Select your role:</p>
//         {roles.map((role, index) => (
//           <label key={index}>
//             <input
//               type="radio"
//               value={role}
//               checked={selectedRole === role}
//               onChange={() => handleRoleChange(role)}
//             />
//             {role}
//           </label>
//         ))}
//       </div>
//       <div>
//         <p>2 Select your domain:</p>
//         {domains.map((domain, index) => (
//           <label key={index}>
//             <input
//               type="radio"
//               value={domain}
//               checked={selectedDomain === domain}
//               onChange={() => handleDomainChange(domain)}
//             />
//             {domain}
//           </label>
//         ))}
//       </div>
//       <div>
//         <p>3 Select your branch:</p>
//         {branches.map((branch, index) => (
//           <label key={index}>
//             <input
//               type="radio"
//               value={branch}
//               checked={selectedBranch === branch}
//               onChange={() => handleBranchChange(branch)}
//             />
//             {branch}
//           </label>
//         ))}
//       </div>
//       <div>
//         <p>4 Select your field:</p>
//         {fields.map((field, index) => (
//           <label key={index}>
//             <input
//               type="radio"
//               value={field}
//               checked={selectedField === field}
//               onChange={() => handleFieldChange(field)}
//             />
//             {field}
//           </label>
//         ))}
//       </div>
//       <div>
//         <p>5 Select what you know:</p>
//         {selectedSkills.map((skill, index) => (
//           <label key={index}>
//             <input type="checkbox" value={skill} />
//             {skill}
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AddFact from "./components/AddFact";
import FactList from "./components/FactList";
import CategoryList from "./components/CategoryList";
import BackToTopBtn from "./components/BackToTopBtn";
import axios from "axios";


function App() {
  const [facts, setFacts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ value: "All" });
  const [openAddFact, setOpenAddFact] = useState(false);

  const gradientStyle = {
    background:
      "radial-gradient(circle, rgba(27,31,73,1) 0%, rgba(27,31,73,1) 40%, rgba(20,16,68,1) 60%, rgba(7,20,43,1) 100%)",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${process.env.REACT_APP_BACKEND_URL}api/v1/facts/?category=${selectedCategory.value}`;

        if (selectedCategory.value === "All") {
          url = `${process.env.REACT_APP_BACKEND_URL}api/v1/facts`;
        }
        // console.log(selectedCategory);
        const response = await axios.get(url);
        // console.log(response.data.data.fact)
        const data = response.data.data.fact;
        // console.log(data);
        setFacts(data);
      } catch (err) {
        console.error("There is an error fetching the API", err);
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div
      className="container px-4 py-4 min-h-screen min-w-full"
      style={gradientStyle}
    >
      <Navbar openAddFact={openAddFact} setOpenAddFact={setOpenAddFact} />
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <AddFact
        facts={facts}
        setFacts={setFacts}
        openAddFact={openAddFact}
        setOpenAddFact={setOpenAddFact}
      />
      <FactList FactsToAdd={facts} setFacts={setFacts} />
      <BackToTopBtn />
    </div>
  );
}

export default App;
