import { useContext, useEffect, useState } from "react";

import Image from "next/image";
import StarRating from "@/components/starrating";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";
import { AuthContext } from "./_app";
import FreelancerProfile from "@/components/lancerprofile";
import { useSelector } from "react-redux";
import Select from "react-select";
import { selectAuthUser, selectAuthState } from "../store/slices/authSlice";
import ImageUploader from "@/components/imageuloader";
import ReactCountryFlag from "react-country-flag";
import Countries from "@/commons/countries";
import CloudinaryUploader from "@/components/profileimageupload";
import GoopimUserAddress from "@/components/usersaddress";
import ProfileCoverUploader from "@/components/profilecoveruploader";
import useLocalStorage from "use-local-storage";
import NewContract from "./newcontract";
import { auth } from "@/auth/auth";

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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/myprofile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(response.data.myprofile);
        setMyCompanies(response.data.pastcompany);
        setLoading(false);
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
    <div className="mx-auto p-0 mt-0 bg-[#f2f5f8]">
      {loading && (
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {profile ? (
        <>
          <NewProfilePage
            profileImage={profile.profile_img_url}
            profileCoverImage={profile.profile_cover_url}
            hourly_rate={profile.hourly_rate}
            description={profile.description}
            keyword={profile.keyword}
            portfolio={profile.portfolio}
            name={profile.first_name + " " + profile.last_name}
            isFreelancer={profile.is_freelancer}
            isEmployer={profile.is_an_employer}
            isAdmin={profile.is_controller}
            username={profile.username}
            city={profile.address_city}
            country={profile.address_country}
            number_of_reviews={profile.number_of_reviews}
            rating={profile.rating}
            joined={profile.joined}
            public_id={profile.public_id}
            id={profile.id}
            editProfile={handleEditProfile}
            loading={loading}
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
                  <div className="flex justify-center mt-4">
                    <p className="font-bold">Update profile</p>
                  </div>
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
                                src="/home/bg.jpg"
                                className="center h-60 w-full"
                              />
                              <div className="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <ProfileCoverUploader
                                  setFormData={setFormData}
                                />
                              </div>
                              <div className="absolute rounded-full bottom-0 left-1/2 transform -translate-x-1/2">
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
                          <div className="mt-24">
                            <label htmlFor="description" className="font-bold">
                              Description about yourself:
                            </label>

                            <textarea
                              className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                              id="description"
                              name="description"
                              rows={10}
                              type="text"
                              value={formData.description}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>

                          {/*   <div className="mb-4">
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
 */}
                          <div className="mt-5">
                            <label htmlFor="description" className="font-bold">
                              Hourly Rate:($USD)
                            </label>
                            <input
                              className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                              id="hourly_rate"
                              name="hourly_rate"
                              type="text"
                              value={formData.hourly_rate}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mt-5">
                            <label htmlFor="description" className="font-bold">
                              Keyword:
                            </label>
                            <input
                              className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                              id="keyword"
                              name="keyword"
                              type="text"
                              value={formData.keyword}
                              onChange={handleInputChange}
                            />
                          </div>
                          {/*          <div className="mt-5">
                            <label htmlFor="description" className="font-bold">
                              Portfolio description:
                            </label>
                            <textarea
                              className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                              id="portfolio"
                              name="portfolio"
                              rows={5}
                              type="text"
                              value={formData.portfolio}
                              onChange={handleInputChange}
                            >
                              {" "}
                            </textarea>
                          </div> 
                          <div className="mt-5">
                            <Select
                              options={formOptions}
                              onChange={handleSelect1}
                              name="company1"
                              className="mb-4"
                            />
                            <Select
                              options={formOptions}
                              onChange={handleSelect2}
                              name="company2"
                              className="mb-4"
                            />
                            <Select
                              options={formOptions}
                              onChange={handleSelect3}
                              name="company2"
                              className="mb-4"
                            />
                          </div>*/}
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
                              className="inline-block rounded bg-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                              type="button"
                              onClick={() => setIsEditing(false)}
                            >
                              Close
                            </button>

                            <button
                              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                              type="submit"
                            >
                              Save
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

export const NewProfilePage = (props) => {
  const router = useRouter();
  const authId = Cookies.get("userId");

  const [messageText, setMessageText] = useState("");
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contractPopup, setContractPopup] = useState(false);

  useEffect(() => {
    if (!!localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    window.CometChat = require("@cometchat-pro/chat").CometChat;
  }, []);
  const closePopup = () => {
    setContractPopup(false);
  };
  const openPopup = () => {
    setContractPopup(true);
  };

  function formatDate(dateString) {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    return `${year}-${month}-${day}`;
  }
  function getCountryValue(countryText) {
    const country = Countries.find((c) => c.text === countryText);
    return country ? country.value : "";
  }
  const sendFirstMessage = (receiver_id) => {
    //emit conversation id and current-loggen user in and the other user id
    //then run a check before joining the conversation room

    const data = {
      sender_id: userId,
      receiver_id: receiver_id,

      text: messageText,
      type: "normal",
    };
    console.log("authUserId", userId);

    fetch(`${BACKEND_URL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!!data.error) {
          console.log("data.error");
          console.log(data.error);
          toast.error(data.error);
        } else {
          router.push(`/chatcontainer`);
        }
      })
      .catch((error) => {
        toast.error(error.response.error);
      });
  };

  const handleChatButtonClick = (receiver_id) => {
    if (isLoggedIn) {
      let receiverID = receiver_id;

      let receiverType = CometChat.RECEIVER_TYPE.USER;
      let messageText = "Hi, I want to hire you for me project";

      const message = new CometChat.TextMessage(
        receiver_id,
        messageText,
        receiverType
      );
      // Code to handle the action when the user is logged in
      CometChat.sendMessage(message).then(
        (message) => {
          router.push("/message");
        },
        (error) => {
          // Handle message sending error
          console.log("error sending msg", error);
        }
      );
      //dispatch(setReceiverId(receiver_id));
      //window.CometChatWidget.chatWithUser(receiver_id);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="relative block h-[500px]">
        <img className="center w-full h-full object-cover" src="/home/bg.jpg" />
        {/* src={props.profileCoverImage} */}
      </div>

      <section className="relative py-16">
        <div className="container mx-auto px-1 md:px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-3 md:px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    {props.profileImage == null ? (
                      <img
                        alt="..."
                        src="/placeholder_avatar.png"
                        className="shadow-xl rounded-full h-[150px] align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] min-w-[150px] object-cover"
                      />
                    ) : (
                      <img
                        alt="..."
                        src={props.profileImage}
                        className="shadow-xl rounded-full h-[150px] align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] min-w-[150px] object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-0 md:px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-0 md:px-4 sm:mt-0 flex justify-between lg:justify-end align-middle">
                    {props.isPublic && props.isFreelancer ? (
                      <>
                        <button
                          className="bg-[#038428] hover:bg-[#2b9f4ce1] text-white font-bold py-1 px-1  sm:mr-2 mb-1  rounded-md w-24"
                          type="button"
                          onClick={() => {
                            setContractPopup(true);
                          }}
                        >
                          Hire me
                        </button>

                        <button
                          className="bg-[#2448c6] hover:bg-[#4865cc] text-white font-bold py-1 px-1 rounded-md w-24  sm:mr-2 mb-1"
                          type="button"
                          onClick={() => {
                            handleChatButtonClick(props.public_id);
                          }}
                        >
                          Message
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                    {props.isPublic ? (
                      ""
                    ) : (
                      <button
                        className="text-white text-xs py-2 px-4 uppercase rounded bg-orange-500 active:bg-orange-600 hover:bg-orange-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 sm:mr-2 mb-1 "
                        type="button"
                        onClick={() => {
                          props.editProfile();
                        }}
                      >
                        Edit
                      </button>
                    )}
                    {/* <button 
                      className="text-white text-xs py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 sm:mr-2 mb-1" type="button"
                      onClick={() => {
                        router.push('/message')
                      }}
                    >
                      Chat
                    </button> */}
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    {/*      <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {props.rating}/{props.number_of_reviews}
                      </span>
                      <span className="text-sm text-blueGray-400">Reviews</span>
                    </div> */}
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block tracking-wide text-blueGray-600">
                        {props.isFreelancer ? (
                          <>
                            {" "}
                            <span className="px-1">{props.hourly_rate}$</span>
                          </>
                        ) : (
                          "-"
                        )}
                      </span>
                      <span className="text-sm text-blueGray-400">Rate</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block tracking-wide text-blueGray-600">
                        @{props.username}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Username
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {props.name}
                  {props.isFreelancer ? (
                    <>
                      {" "}
                      <sup className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                        Freelancer
                      </sup>
                    </>
                  ) : props.isEmployer ? (
                    <>
                      {" "}
                      <sup className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">
                        Employer
                      </sup>
                    </>
                  ) : props.isAdmin ? (
                    <>
                      {" "}
                      <sup className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                        Administrator
                      </sup>
                    </>
                  ) : (
                    ""
                  )}
                </h3>

                {/*          <div className="flex mt-2 justify-center">
                  <div className="flex flex-col">
                    {props.number_of_reviews == 0 ? (
                      <span>No reviews yet</span>
                    ) : (
                      <>
                        <span className="p-1">{props.rating}</span>
                        <StarRating rating={props.rating} />
                      </>
                    )}
                  </div>
                </div> */}

                <div className="flex justify-center align-middle">
                  {/*  <Image src="/location-pin.svg" width={40} height={40} /> */}

                  {props.country != "" && props.country != null ? (
                    <span
                      role="img"
                      aria-label="Country Flag"
                      className="ml-2 py-2"
                    >
                      <ReactCountryFlag
                        countryCode={getCountryValue(props.country)}
                        svg
                      />
                      &nbsp;&nbsp;
                    </span>
                  ) : (
                    <span
                      role="img"
                      aria-label="Country Flag"
                      className="ml-2 py-2"
                    >
                      <ReactCountryFlag
                        countryCode={getCountryValue("Sweden")}
                        svg
                      />
                      &nbsp;&nbsp;
                    </span>
                  )}
                  <span className="py-2">{props.city}</span>
                  {/* <Link href={`localhost:3000/u/${props.username}`} className="p-2">
                    @{props.username}
                  </Link> */}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  Joined: {formatDate(props.joined)}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <h4 className="text-lg mt-5 font-semibold mb-2 ">About Me</h4>
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-0 text-lg leading-relaxed text-blueGray-700">
                      {props.description}
                    </p>
                  </div>
                </div>

                <h4 className="text-lg mt-10 font-semibold mb-2 ">Skills</h4>
                <ul className="flex flex-wrap justify-center">
                  {props && props.keyword ? (
                    props.keyword.split(", ").map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 capitalize text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
                      >
                        {!!skill ? skill : "Edit and update your profile"}
                      </span>
                    ))
                  ) : (
                    <li className="px-2 py-1 rounded bg-blue-100 text-gray-600 mr-2 mb-2">
                      Edit and update your profile
                    </li>
                  )}
                </ul>

                {/*      <h4 className="text-lg mt-10 font-semibold mb-2 ">Portfolio</h4>
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {props.portfolio}
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <NewContract
          currentUser={authId}
          recipientUser={props.id}
          closePopup={closePopup}
          openPopup={openPopup}
          contractPopup={contractPopup}
        />
      </section>
    </div>
  );
};
export default MyProfile;
