import { useState } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import StarIcon from "@heroicons/react/20/solid";
import Countries from "@/commons/countries";

function ProviderSearch() {
  const [projectDescription, setProjectDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [providers, setProviders] = useState([]);
  const [resultIsAvailable, setResultIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [recipientUser, setRecipientUser] = useState("");
  const router = useRouter();
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
          toast.error(data.error);
        } else {
          router.push(`/chatcontainer`);
        }
      })
      .catch((error) => {
        toast.error(error.response.error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/providers`, {
        project_description: projectDescription,
        budget: budget,
      });
      setProviders(response.data.topproviders);
      toast.success("Done!");
      setResultIsAvailable(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleChatClick = (providerId) => {
    router.push(`/messages?providerId=${providerId}`);
  };
  const toggleResultIsAvailable = () => {
    setResultIsAvailable(false);
  };
  function getCountryValue(countryText) {
    const country = Countries.find((c) => c.text === countryText);
    return country ? country.value : "";
  }
  return (
    <div className=" flex flex-col p-4">
      <ToastContainer />
      <div className="flex flex-col justify-center text-center">
        <h1 className="font-bold text-xl text-white">
          Our AI matches you to the best freelancer for yourproject.
        </h1>
        <h1 className="font-bold text-2xl text-blue-500">Try it below</h1>
      </div>
      <div className="container mx-auto px-4">
        <ToastContainer />
        {!resultIsAvailable && <></>}
        <form onSubmit={handleSubmit}>
          <div
            className="flex flex-col justify-center align-middle flex-wrap -mx-3 mb-6"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="w-full align-middle sm:w-1/2 md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="projectDescription"
              >
                Project Description
              </label>
              <textarea
                name="project_description"
                rows={4}
                className="border rounded px-4 py-2 w-full"
                placeholder="Project description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                readOnly={resultIsAvailable ? true : false}
                required={true}
              />
            </div>
            {!resultIsAvailable && (
              <div className="w-full align-middle sm:w-1/2 md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="budget"
                >
                  Budget($USD)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="budget"
                  type="number"
                  placeholder="Enter budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required={true}
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            {!resultIsAvailable && (
              <button
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 hover:bg-blue-700 text-white font-bold"
                type="submit"
              >
                Search Providers
              </button>
            )}
            {resultIsAvailable && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => toggleResultIsAvailable()}
                type="button"
              >
                Edit
              </button>
            )}
          </div>
        </form>
        <div className="mt-8">
          {loading && (
            <div class="text-center">
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

          {resultIsAvailable && providers.length > 0 ? (
            <>
              {/*           <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Portfolio</th>
                    <th className="px-4 py-2">Rating</th>
                    <th className="px-4 py-2">Keywords</th>
                    <th className="px-4 py-2">Hourly rate</th>
                    <th className="px-4 py-2">Reason</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((provider) => (
                    <tr key={provider.id}>
                      <td className="border px-4 py-2">{provider.name}</td>
                      <td className="border px-4 py-2">{provider.portfolio}</td>
                      <td className="border px-4 py-2">{provider.rating}</td>
                      <td className="border px-4 py-2">{provider.keywords}</td>
                      <td className="border px-4 py-2">
                        {provider.hourly_rate}
                        {" USD"}
                      </td>
                      <td className="border px-4 py-2">{provider.reason}</td>
                      <td className="border px-4 py-2">
                        <Link href={`/chatcontainer/?provider=provider.id`}>
                          {" "}
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py
                      -2 px-4 rounded"
                            onClick={() => sendFirstMessage(provider.id)}
                          >
                            Message
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
              <div>
                <ul className="divide-y divide-gray-200">
                  {providers.map((provider) => (
                    <li
                      key={provider.id}
                      className="p-4 flex items-center hover:bg-blue-100"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 bg-blue-100 rounded-full"
                          src={provider.profile_url}
                          alt={provider.name}
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {provider.name}
                          <span className="text-gray-500 text-sm ml-2">
                            ({provider.rating})
                          </span>
                          <span className="text-gray-500 text-sm ml-2 mr-2">
                            {provider.hourly_rate} USD / hour
                          </span>
                          <span role="img" aria-label="Country Flag">
                            <ReactCountryFlag
                              countryCode={getCountryValue(provider.country)}
                              svg
                            />
                          </span>
                          <span className="text-sm ml-2">{provider.city}</span>
                        </h3>
                        <p className="text-gray-500">{provider.reason}</p>
                        <p className="text-gray-500">{provider.keywords}</p>
                        <div className="flex">
                          <span className="mx-1">Worked with:</span>
                          {provider.companies_worked_with?.map((company) => (
                            <Image
                              width={40}
                              height={20}
                              src={company.logo_url}
                              className=" h-8 w-8 mx-2"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="ml-3">
                        {" "}
                        <div className="mt-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => sendFirstMessage(provider.id)}
                          >
                            Message
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            "No providers found"
          )}
        </div>
      </div>
    </div>
  );
}

export default ProviderSearch;
