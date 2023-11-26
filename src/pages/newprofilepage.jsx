import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import StarRating from "@/components/starrating";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";
import { AuthContext } from "../pages/_app";
import FreelancerProfile from "@/components/lancerprofile";
import { useSelector } from "react-redux";
import Select from "react-select";
import { selectAuthUser, selectAuthState } from "../store/slices/authSlice";
import ImageUploader from "@/components/imageuloader";
import CloudinaryUploader from "@/components/profileimageupload";
import GoopimUserAddress from "@/components/usersaddress";
import ProfileCoverUploader from "@/components/profilecoveruploader";
function MyProfile() {
  //const { isAuthenticated, user } = useContext(AuthContext);
  const authStatus = useSelector(selectAuthState);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profileCoverImage, setProfileCoverImage] = useState("");
  const [myCompanies, setMyCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    hourly_rate: "",
    keyword: "",
    portfolio: "",
    profile_img_url: profileImage,
    profile_cover_url: profileCoverImage,

    company1: selectedCompanies[0],
    company2: selectedCompanies[1],
    company3: selectedCompanies[2],
  });

  /*   const formatOptions = (options) => {
    return options.map((option) => ({
      label: option.name,
      value: option.id,
    }));
  };
 */
  const formOptions = companies
    .filter((company) => !selectedCompanies.includes(company.id))
    .map((company) => ({
      value: company.id,
      label: company.name,
    }));
  const handleSelect1 = (selectedOption, selectIndex) => {
    /*    setSelectedCompanies((prevSelectedCompanies) => {
      const updatedCompanies = [...prevSelectedCompanies];
      updatedCompanies[selectIndex] = selectedOption.value;
      return updatedCompanies;
    }); */
    setSelectedCompanies([...selectedCompanies, selectedOption.value]);

    setFormData((prevFormData) => ({
      ...prevFormData,
      company1: selectedOption.value,
    }));
  };

  const handleSelect2 = (selectedOption, selectIndex) => {
    /*     setSelectedCompanies((prevSelectedCompanies) => {
      const updatedCompanies = [...prevSelectedCompanies];
      updatedCompanies[selectIndex] = selectedOption.value;
      return updatedCompanies;
    }); */
    setSelectedCompanies([...selectedCompanies, selectedOption.value]);

    setFormData((prevFormData) => ({
      ...prevFormData,
      company2: selectedOption.value,
    }));
  };
  const handleSelect3 = (selectedOption, selectIndex) => {
    /*     setSelectedCompanies((prevSelectedCompanies) => {
      const updatedCompanies = [...prevSelectedCompanies];
      updatedCompanies[selectIndex] = selectedOption.value;
      return updatedCompanies;
    }); */
    setSelectedCompanies([...selectedCompanies, selectedOption.value]);

    setFormData((prevFormData) => ({
      ...prevFormData,
      company3: selectedOption.value,
    }));
  };

  /*  const handleSelect = (selectedOption) => {
    setSelectedCompanies([...selectedCompanies, selectedOption.value]);
    console.log(selectedOption);

  }; */
  /*   const options1 = formatOptions(
    selectedCompanies.length === 0
      ? companies
      : companies.filter((company) => !selectedCompanies.includes(company.id))
  );
  const options2 = formatOptions(
    selectedCompanies.length === 0
      ? companies
      : companies.filter((company) => !selectedCompanies.includes(company.id))
  );
  const options3 = formatOptions(
    selectedCompanies.length === 0
      ? companies
      : companies.filter((company) => !selectedCompanies.includes(company.id))
  );
 */
  /*   const handleSelect1 = (selectedOption) => {
    setSelectedCompanies((prevSelectedCompanies) => [
      ...prevSelectedCompanies,
      selectedOption.id,
    ]);
  };

  const handleSelect2 = (selectedOption) => {
    setSelectedCompanies((prevSelectedCompanies) => [
      ...prevSelectedCompanies,
      selectedOption.id,
    ]);
  }; */

  /*  const handleSelect3 = (selectedOption) => {
    setSelectedCompanies((prevSelectedCompanies) => [
      ...prevSelectedCompanies,
      selectedOption.id,
    ]);
  };
  const selectedOptions1 = options1.filter((option) =>
    selectedCompanies.includes(option.id)
  );
  const selectedOptions2 = options2.filter((option) =>
    selectedCompanies.includes(option.id)
  );
  const selectedOptions3 = options3.filter((option) =>
    selectedCompanies.includes(option.id)
  ); */

  const freelancer = {
    name: "John Doe",
    title: "Web Developer",
    location: "New York, NY",
    imageUrl: "https://example.com/image.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis, odio vitae varius rhoncus, libero dolor bibendum augue, in laoreet eros sapien eu lectus. Praesent quis sapien neque. Integer vitae consequat velit. Sed sit amet justo augue. ",
    skills: ["React", "JavaScript", "HTML", "CSS"],
  };
  const router = useRouter();
  if (!authStatus) {
    router.push("/login");
  }

  function handleRefreshClick() {
    router.reload();
  }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/myprofile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(response.data.myprofile);
        setMyCompanies(response.data.pastcompany);
      } catch (error) {
        toast.error("Failed to fetch profile");
      }
    };

    const fetchAllCompanies = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/companies`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCompanies(response.data.all_companies);
      } catch (error) {
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
    fetchAllCompanies();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setFormData({
      description: profile.description || "",
      hourly_rate: profile.hourly_rate || "",
      keyword: profile.keyword || "",
      portfolio: profile.portfolio || "",
      profile_img_url: profile.profile_img_url || "",
      profile_cover_url: profile.profile_cover_url || "",
      company1: selectedCompanies[0] || "",
      company2: selectedCompanies[1] || "",
      company3: selectedCompanies[2] || "",
    });
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/users/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      setIsEditing(false);
      handleRefreshClick();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleUsernameInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.toLowerCase(),
    }));

    if (name === "goopim_username" && value.length >= 4) {
      // Make the API request to check the availability of the username
      fetch(`${BACKEND_URL}/check_username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ goopim_username: value }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.exists) {
            // Username is taken
            setIsUsernameAvailable(false);
          } else {
            // Username is available
            setIsUsernameAvailable(true);
          }
        })
        .catch((error) => {
          console.error("Error checking username availability:", error);
        });
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-4 mt-12">
      {profile ? (
        <>
          {/*    <div className="bg-white rounded-lg shadow-lg p-4">
            <div>
              <div className="flex flex-col items-center justify-center bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full">
                  <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
                    <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden mr-0 md:mr-8">
                      <img
                        src={profile.profile_img_url}
                        className="w-full h-full object-cover rounded-full border-2 border-gray-200 bg-blue-100"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-2">
                        {profile.first_name}
                      </h2>
                      <h3 className="text-lg font-medium mb-2">
                        {"Goopim member"}
                      </h3>
                      <p className="text-gray-500">
                        ${profile.hourly_rate}
                        <span className="px-2">usd/hr</span>
                      </p>
                    </div>
                    <div className="flex items-end">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleEditProfile}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-2">About Me</h4>
                    <p className="text-gray-500">{profile.description}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 ">Skills</h4>
                    <ul className="flex flex-wrap">
                      {profile && profile.keyword ? (
                        profile.keyword.split(", ").map((skill, index) => (
                          <li
                            key={index}
                            className="px-2 py-1 rounded bg-blue-100 text-gray-600 mr-2 mb-2"
                          >
                            {!!skill ? skill : "Edit and update your profile"}
                          </li>
                        ))
                      ) : (
                        <li className="px-2 py-1 rounded bg-blue-100 text-gray-600 mr-2 mb-2">
                          Edit and update your profile
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-2">Portfolio</h4>
                    <p className="text-gray-500">{profile.portfolio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <NewProfilePage
            profileImage={profile.profile_img_url}
            profileCoverImage={profile.profile_cover_url}
            hourly_rate={profile.hourly_rate}
            description={profile.description}
            keyword={profile.keyword}
            portfolio={profile.portfolio}
            name={profile.first_name}
            isFreelancer={profile.is_freelancer}
            isEmployer={profile.is_an_employer}
            isAdmin={profile.isAdmin}
            username={profile.username}
            city={profile.address_city}
            country={profile.address_country}
            public_id={profile.public_id}
            id={profile.id}
            editProfile={handleEditProfile}
            isPublic={false}
          />
        </>
      ) : (
        <p>Loading profile...</p>
      )}

      <>
        {isEditing && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="text sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-text shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <form onSubmit={handleSubmit} className="w-full p-1">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 justify-center items-center">
                    <div className="sm:flex sm:items-center">
                      <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 justify-center items-center sm:text-center">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-headline"
                        >
                          Edit Profile
                        </h3>
                        <div className="mt-2 ">
                          <div className="mb-16 relative">
                            <div className="w-full border-2 border-dashed bg-secondary relative flex justify-center">
                              <img
                                src={formData.profile_cover_url}
                                className="center h-60 w-full"
                              />
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <ProfileCoverUploader
                                  setFormData={setFormData}
                                />
                              </div>
                              <div className="absolute rounded-full bottom-0 left-1/4 transform -translate-x-1/2">
                                <div className="rounded-full bg-white border-4 border-2 border-white -mb-16 z-20">
                                  <img
                                    src={formData.profile_img_url}
                                    className="w-40 h-40 rounded-full border-2 border-gray-200 bg-blue-100"
                                  />
                                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    {" "}
                                    <CloudinaryUploader
                                      setFormData={setFormData}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="absolute rounded-full bottom-0 right-1/4 transform -translate-x-1/2">
                                <div className=" -mb-16 z-20">
                                  <span className="text-5xl pt-0 text-white cursor-pointer  h-10   rounded-full">
                                    ...
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-32">
                            <label htmlFor="description" className="font-bold">
                              Description about yourself:
                            </label>

                            <textarea
                              className="shadow h-40 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="description"
                              name="description"
                              type="text"
                              value={formData.description}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>

                          <div className="mb-4">
                            <label htmlFor="username" className="font-bold">
                              Username
                            </label>
                            <input
                              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                                formData?.goopim_username?.length >= 4
                                  ? isUsernameAvailable
                                    ? "border-green-500"
                                    : "border-red-500"
                                  : ""
                              }`}
                              id="goopim_username"
                              name="goopim_username"
                              type="text"
                              value={formData.goopim_username}
                              onChange={handleUsernameInputChange}
                              onBlur={handleUsernameInputChange}
                            />
                            {formData?.goopim_username?.length >= 4 ? (
                              isUsernameAvailable ? (
                                <p className="text-green-500">
                                  Username is available
                                </p>
                              ) : (
                                <p className="text-red-500">
                                  Username is taken
                                </p>
                              )
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="mb-4">
                            <label htmlFor="description" className="font-bold">
                              Hourly Rate:($USD)
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="hourly_rate"
                              name="hourly_rate"
                              type="text"
                              value={formData.hourly_rate}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="description" className="font-bold">
                              Keyword:
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="keyword"
                              name="keyword"
                              type="text"
                              value={formData.keyword}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="description" className="font-bold">
                              Portfolio description:
                            </label>
                            <textarea
                              className="shadow h-40 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="portfolio"
                              name="portfolio"
                              type="text"
                              value={formData.portfolio}
                              onChange={handleInputChange}
                            >
                              {" "}
                            </textarea>
                          </div>
                          <div className="mb-4">
                            <Select
                              options={formOptions}
                              onChange={handleSelect1}
                              name="company1"
                            />
                            <Select
                              options={formOptions}
                              onChange={handleSelect2}
                              name="company2"
                            />
                            <Select
                              options={formOptions}
                              onChange={handleSelect3}
                              name="company2"
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="profile_img_url"
                              name="profile_img_url"
                              type="hidden"
                              value={profileImage}
                              /*   onChange={handleInputChange} */
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Save
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                              onClick={() => setIsEditing(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
      <GoopimUserAddress />
    </div>
  );
}

const NewProfilePage = (props) => {
  return (
    <div className="">
      <div className="w-full border-2 border-dashed bg-secondary relative flex justify-center">
        <img src={props.profileCoverImage} className="center w-full h-60" />

        <div className="absolute rounded-full bottom-0 left-1/4 transform -translate-x-1/2">
          <div className="rounded-full bg-white border-4 border-2 border-white -mb-16 z-20">
            <img
              src={props.profileImage}
              className="w-40 h-40 rounded-full border-2 border-gray-200 bg-blue-100"
            />
          </div>
        </div>
        <div className="absolute rounded-full bottom-0 right-1/4 transform -translate-x-1/2">
          <div className="  -mb-24 sm:-mb-16 z-20 ">
            <span
              onClick={() => {
                props.editProfile();
              }}
              className="text-5xl  leading-{0.1} sm: leading-{1} sm:pt-0 text-primary cursor-pointer  h-10 w-10   rounded-full"
            >
              ...
            </span>
          </div>
        </div>
      </div>
      <div className="flex mt-8 sm:mt-1 pt-2 justify-center h-40 bg-blue-100 ">
        {" "}
        <div className="flex flex-col">
          <div className="flex justify-center mt-2 ">
            {" "}
            <span className="semi-bold px-6 font-bold text-xl">
              {props.name}
            </span>
          </div>
          <div className="flex justify-center mt-2 ">
            <p className="text-sm p-2">
              {props.isFreelancer ? (
                <>
                  {" "}
                  <span> Freelancer</span>
                  <span className="px-1">($20/hr)</span>
                </>
              ) : (
                ""
              )}
            </p>
            <p className="text-sm p-2">
              {props.isEmployer ? (
                <>
                  {" "}
                  <span> Employer</span>
                </>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="flex">
            <Image src="/location-pin.svg" width={40} height={40} />
            <span className="pt-2">
              {props.city}, {props.country}
            </span>
            <Link href={`localhost:3000/u/${props.username}`} className="p-2">
              @{props.username}
            </Link>
          </div>
        </div>
      </div>

      <div className=" flex flex-col sm:flex-row px-4 sm:mx-16  py-4">
        <div className="sm:w-1/3">
          <button className=" w-1/2 bg-white hover:bg-grey  font-bold py-2 px-4 rounded-3xl flex justify-center items-center text-white">
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.3121 23.3511C17.4463 23.0228 16.7081 22.5979 16.1266 22.1995C14.8513 22.7159 13.4578 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 14.2788 22.306 16.3983 21.1179 18.1551C21.0425 19.6077 21.8054 20.9202 22.5972 22.0816C23.2907 23.0987 23.1167 23.9184 21.8236 23.9917C21.244 24.0245 19.9903 23.9874 18.3121 23.3511ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 13.9503 20.3808 15.7531 19.328 17.2262C18.8622 17.8782 19.1018 19.0998 19.2616 19.8011C19.4167 20.4818 19.7532 21.2051 20.0856 21.8123C19.7674 21.7356 19.4111 21.6288 19.0212 21.481C18.1239 21.1407 17.3824 20.6624 16.8594 20.261C16.5626 20.0332 16.1635 19.9902 15.825 20.1494C14.6654 20.6947 13.3697 21 12 21C7.02944 21 3 16.9706 3 12ZM7 13.5C7.82843 13.5 8.5 12.8284 8.5 12C8.5 11.1716 7.82843 10.5 7 10.5C6.17157 10.5 5.5 11.1716 5.5 12C5.5 12.8284 6.17157 13.5 7 13.5ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12ZM17 13.5C17.8284 13.5 18.5 12.8284 18.5 12C18.5 11.1716 17.8284 10.5 17 10.5C16.1716 10.5 15.5 11.1716 15.5 12C15.5 12.8284 16.1716 13.5 17 13.5Z"
                  fill="#42b5d3"
                ></path>{" "}
              </g>
            </svg>
            <span className="text-primary p-1">Chat </span>
          </button>
          <div className="flex mt-2">
            <span className="p-1">0.0</span>
            <div className="flex flex-col">
              {" "}
              <StarRating rating={4.5} />
              <span>No review yet</span>
            </div>
          </div>
          <div className="flex mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
            <span className="px-2">Joined June 13,2023</span>
          </div>
        </div>
        <div className="sm:w-2/3 bg-white p-4 rounded-t-md">
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2">About Me</h4>
            <p className="text-gray-500">{props.description}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 ">Skills</h4>
            <ul className="flex flex-wrap">
              {props && props.keyword ? (
                props.keyword.split(", ").map((skill, index) => (
                  <li
                    key={index}
                    className="px-2 py-1 rounded bg-blue-100 text-gray-600 mr-2 mb-2"
                  >
                    {!!skill ? skill : "Edit and update your profile"}
                  </li>
                ))
              ) : (
                <li className="px-2 py-1 rounded bg-blue-100 text-gray-600 mr-2 mb-2">
                  Edit and update your profile
                </li>
              )}
            </ul>
          </div>
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2">Portfolio</h4>
            <p className="text-gray-500">{props.portfolio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
