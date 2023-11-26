import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";
import { toFlagEmoji } from "react-emoji-render";
import Select from "react-select";
import Countries from "@/commons/countries";
import ReactCountryFlag from "react-country-flag";

const AddressCreate = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [formData, setFormData] = useState({
    country: "",
    city: "",
    street1: "",
    street2: "",
  });
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: selectedOption ? selectedOption.label : "",
    }));
  };
  const countryOptions = Countries.map((country) => ({
    value: country.text,
    label: country.text,
  }));
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/users/address`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setFormData({
        country: "",
        city: "",
        street1: "",
        street2: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create Address</h2>
        <form onSubmit={handleCreateAddress} className="space-y-4">
          {/*           <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleFormChange}
            className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-primary focus:border-primary"
          /> */}
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={countryOptions}
            isSearchable={true}
            placeholder="Select a country"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleFormChange}
            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
          />
          <input
            type="text"
            name="street1"
            placeholder="Street 1"
            value={formData.street1}
            onChange={handleFormChange}
            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
          />
          <input
            type="text"
            name="street2"
            placeholder="Street 2"
            value={formData.street2}
            onChange={handleFormChange}
            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
          />
          <button
            type="submit"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export const AddressUpdate = ({ address }) => {
  const [contryFlag, setContryFlag] = useState("");
  useEffect(() => {
    setFormData({
      country: address.country,
      city: address.city,
      street1: address.street1,
      street2: address.street2,
    });
  }, []);
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    street1: "",
    street2: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${BACKEND_URL}/users/address`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setFormData({
        country: "",
        city: "",
        street1: "",
        street2: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Address</h2>
        <form onSubmit={handleUpdateAddress} className="space-y-4">
          <div className="flex items-center">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleFormChange}
              readOnly="true"
              className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full cursor-not-allowed"
            />
          </div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleFormChange}
            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
          />
          <input
            type="text"
            name="street1"
            placeholder="Street 1"
            value={formData.street1}
            onChange={handleFormChange}
            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
          />
          <input
            type="text"
            name="street2"
            placeholder="Street 2"
            value={formData.street2}
            onChange={handleFormChange}
            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
          />
          <button
            type="submit"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

const GoopimUserAddress = () => {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/users/address`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAddress(response.data.address);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddress();
  }, []);

  return (
    <div className="container mx-auto px-1 md:px-4 mt-5">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full p-5 mb-6 shadow-xl rounded-lg">
        {address ? <AddressUpdate address={address} /> : <AddressCreate />}
      </div>
    </div>
  );
};

export default GoopimUserAddress;
