import React from "react";

const Sidebar = ({ items, onItemClick, selectedItem }) => {
  return (
    <div className="w-1/5  lg:mr-4 shadow-xl lg:block min-h-full font-lato bg-white shaow-xl scroll-smooth">
      <div className="flex flex-col w-full justify-between overflow-x-auto ">
        <div className="smooth-scroll">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => onItemClick(index)}
              className={`flex  px-2 py-4 text-white cursor-pointer border-b border-gray-300 
              ${
                selectedItem.name === item.name ? "bg-primary" : " bg-gray-200 "
              }
            `}
            >
              <span className={`px-2 py-2 `}>{item.icon}</span>{" "}
              <span className={` font-bold py-2`}> {item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
