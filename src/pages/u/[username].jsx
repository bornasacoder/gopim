import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/utils";
import { NewProfilePage } from "../myprofile";
const UserPage = () => {
  const router = useRouter();
  const { username } = router.query; // Extract the dynamic username from the query object
  const [userData, setUserData] = useState(null);
  const [userDare, setProfile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/u/${username}`);
        const userData = await response.json();
        setUserData(userData.public_profile);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  return (
    <div className="mx-auto p-0  bg-[#f2f5f8]">
      {userData ? (
        /*  <div className="bg-white rounded-lg shadow-lg p-4">
          <div>
            <div className="flex flex-col items-center justify-center bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl w-full">
                <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
                  <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden mr-0 md:mr-8">
                    <img
                      src={userData.profile_img_url}
                      className="w-full h-full object-cover rounded-full border-2 border-gray-200 bg-blue-100"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-2">
                      {userData.first_name}
                    </h2>
                    <h3 className="text-lg font-medium mb-2">
                      {"Goopim member"}
                    </h3>
                    <p className="text-gray-500">
                      ${userData.hourly_rate}
                      <span className="px-2">usd/hr</span>
                    </p>
                  </div>
                </div>
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-2">About Me</h4>
                  <p className="text-gray-500">{userData.description}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 ">Skills</h4>
                  <ul className="flex flex-wrap">
                    {userData && userData.keyword ? (
                      userData.keyword.split(", ").map((skill, index) => (
                        <li
                          key={index}
                          className="px-2 py-1 rounded bg-blue-100 text-gray-600 mr-2 mb-2"
                        >
                          {!!skill ? skill : "Edit and update your userData"}
                        </li>
                      ))
                    ) : (
                      <li className="px-2 py-1 rounded bg-blue-100 text-gray-600 mr-2 mb-2">
                        Edit and update your userData
                      </li>
                    )}
                  </ul>
                </div>
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-2">Portfolio</h4>
                  <p className="text-gray-500">{userData.portfolio}</p>
                </div>
              </div>
            </div>
          </div>
        </div> */
        <NewProfilePage
          profileImage={userData.profile_img_url}
          profileCoverImage={userData.profile_cover_url}
          hourly_rate={userData.hourly_rate}
          description={userData.description}
          keyword={userData.keyword}
          portfolio={userData.portfolio}
          name={userData.first_name + " " + userData.last_name}
          isFreelancer={userData.is_freelancer}
          isEmployer={userData.is_an_employer}
          isAdmin={userData.is_controller}
          username={userData.username}
          city={userData.address_city}
          country={userData.address_country}
          number_of_reviews={userData.number_of_reviews}
          rating={userData.rating}
          joined={userData.joined}
          public_id={userData.public_id}
          id={userData.id}
          isPublic={true}
        />
      ) : (
        <p>Loading userData...</p>
      )}
    </div>
  );
};

export default UserPage;
