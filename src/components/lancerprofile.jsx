import React from "react";

const FreelancerProfile = (props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden mr-0 md:mr-8">
            <img
              src={props.profile_img_url}
              className="w-full h-full object-cover rounded-full border-2 border-gray-200 bg-blue-100"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">{props.first_name}</h2>
            <h3 className="text-lg font-medium mb-2">{"Goopim member"}</h3>
            <p className="text-gray-500">{props.hourly_rate}</p>
          </div>
          <div className="flex items-end">
            <button>Start</button>
          </div>
        </div>
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-2">About Me</h4>
          <p className="text-gray-500">{props.description}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 ">Skills</h4>
          {/*         <ul className="flex flex-wrap">
            {props.keyword.map((skill, index) => (
              <li
                key={index}
                className="px-2 py-1 rounded bg-blue-100 text-gray-600 mr-2 mb-2"
              >
                {skill}
              </li>
            ))}
          </ul> */}
        </div>
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-2">Portfolio</h4>
          <p className="text-gray-500">{props.portfolio}</p>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
