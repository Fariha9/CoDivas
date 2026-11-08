import React, { useEffect, useState } from 'react';
import Course from './Course';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Cleaned up unused Navigate, Route, Router imports
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const Courses = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // Standardized to lowercase 'navigate' to avoid component name conflicts
    const [courses, setCourses] = useState([]); // Fixed: Lowercase 'courses' prevents collisions with component name
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);
    
    // TRACK KEYBOARD SELECTION STATE
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleChange = e => {
      setSearch(e.target.value);
      setFocusedIndex(-1); // Reset highlight when typing changes
    };

    const handleClose = () => {
      setSearch("");
      setSearchData([]);
      setFocusedIndex(-1);
    };

    // ARROW KEYS & ENTER KEY HANDLING LOGIC
    const handleKeyDown = (e) => {
      // Only run keyboard navigation logic if suggestions are showing
      if (search && searchData.length > 0) {
        const totalItems = Math.min(searchData.length, 4); // Based on your .slice(0,4)

        if (e.key === "ArrowDown") {
          e.preventDefault(); // Stop webpage from scrolling down
          setFocusedIndex((prevIndex) => (prevIndex + 1) % totalItems);
        } else if (e.key === "ArrowUp") {
          e.preventDefault(); // Stop webpage from scrolling up
          setFocusedIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
        } else if (e.key === "Enter") {
          // If a suggestion item is highlighted, execute redirect navigation 
          if (focusedIndex >= 0 && focusedIndex < totalItems) {
            e.preventDefault();
            navigate(searchData[focusedIndex].page);
          }
        } else if (e.key === "Escape") {
          handleClose();
        }
      }
    };

    useEffect(() => {

  fetch("http://localhost:5001/api/courses")
    .then(res => res.json())
    .then(data => {
      setCourses(data);
    })
    .catch(err => {
      console.error("Error fetching courses:", err);
    });

}, []);
    // CHANGED: Now fetching directly from your Express backend API instead of the local json file
   useEffect(() => {

  const keyword = searchParams.get("search");

  if(keyword){
    setSearch(keyword);
  }

}, [searchParams]);

    useEffect(() => {
      if (search.trim() === "") {
        setSearchData([]);
      } else {
        const newFilterData = courses.filter(item => {
                return (
                item.name && item.name.toLowerCase().includes(search.toLowerCase())
                );
            });
        setSearchData(newFilterData);
      }
    }, [search, courses]);

    return (
     <div className="bg-[#0d0d0f] text-black">
        <div className="min-h-screen">
          <h1 className="text-2xl pt-5 sm:text-3xl lg:text-4xl font-bold text-white text-center mb-5">Learn Without Limits</h1>
          <h1 className="text-lg sm:text-lg lg:text-lg font-bold text-white text-center mb-6">Upskill, transform, and succeed with expert-led online courses</h1>
      
      <section className="py-5 w-full flex flex-col items-center relative">
    <div className="bg-white border border-gray-200 rounded-full w-[650px] h-12 flex items-center justify-between relative">
        <input
            type="text"
            className="flex-1 px-5 text-[18px] bg-transparent outline-none border-none"
            placeholder="Search..."
            autoComplete="off"
            onChange={handleChange}
            onKeyDown={handleKeyDown} // TRIGGER KEYBOARD CAPTURING FUNCTIONS HERE
            value={search}
        />
        <div className="bg-[#e3e3e3] px-[25px] h-full flex items-center justify-center cursor-pointer rounded-r-full">
            {
              search === "" ? (
              <IoIosSearch size={23}/>
            ) : (
              <IoCloseOutline size={25} onClick={handleClose} />
            )
            }
            
        </div>

        {search && searchData.length > 0 && (
            <div className="bg-white absolute left-0 top-[52px] w-[calc(100%-73px)] rounded-xl shadow-2xl border border-gray-200 overflow-y-auto max-h-[250px] [&::-webkit-scrollbar]:hidden z-50">
                {
                  searchData.slice(0, 4).map((data, index) => {
                    return (
                      <a 
                        href={data.page} 
                        key={data._id || data.id || index} // CHANGED: Compatible with MongoDB unique keys
                        className={`px-5 py-2.5 cursor-pointer text-[18px] block transition-colors ${
                          focusedIndex === index ? 'bg-[#e3e3e3]' : 'hover:bg-[#e3e3e3]'
                        }`}
                        onMouseEnter={() => setFocusedIndex(index)} // Sync index if mouse moves over items
                      >
                        {data.name}
                      </a>
                    );
                  })
                }       
            </div>
        )}
    </div>

</section>
        
      <div className="container mx-auto px-4 py-5 sm:px-6 lg:px-25 lg:py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {courses.map (course => (
            // CHANGED: Uses MongoDB's unique _id field as the primary key configuration
            <Course key={course._id || course.id} Courses={course} />
          ))}
        </div>
      </div>
    </div>
     </div>
    );
};

export default Courses;