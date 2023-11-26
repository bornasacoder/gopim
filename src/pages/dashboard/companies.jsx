import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { BACKEND_URL } from "@/utils";

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/companies`);
      setCompanies(response.data.all_companies);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/companies`, formData);
      console.log(response.data);
      setFormData({ name: "", logoUrl: "" });
      fetchCompanies();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCompany = async (companyId) => {
    setIsEditing(true);
    setEditCompanyId(companyId);
    // Display a modal or form to edit the company details
    // Retrieve the current company details using the companyId
    try {
      const response = await axios.get(`${BACKEND_URL}/company/${companyId}`);
      console.log(response.data);
      setFormData({
        name: response.data.name,
        logoUrl: response.data.logo_url,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveCompany = async () => {
    // Save the edited company details
    setIsEditing(false);

    try {
      const response = await axios.put(
        `${BACKEND_URL}/companies/${editCompanyId}`,
        formData
      );
      console.log(response.data);
      setFormData({ name: "", logoUrl: "" });
      fetchCompanies();
    } catch (error) {
      console.error(error);
    }
    setEditCompanyId(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditCompanyId(null);
  };

  const handleDeleteCompany = async (companyId) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        const response = await axios.delete(
          `${BACKEND_URL}/companies/${companyId}`
        );
        console.log(response.data);
        fetchCompanies();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="mt-20">
      <h1 className="p-2">Company Management</h1>

      {/* Company Form */}
      <form onSubmit={handleCreateCompany} className="p-4">
        <input
          type="text"
          name="name"
          className="p-2"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="logoUrl"
          className="p-2 ml-2"
          placeholder="Logo URL"
          value={formData.logoUrl}
          onChange={handleFormChange}
        />
        <button className="bg-primary p-2 ml-2 rounded-md" type="submit">
          Create
        </button>
      </form>

      {/* Company List */}
      {companies.length > 0 ? (
        <ul>
          {companies.map((company) => (
            <li key={company.id} className="flex p-2 border-b-2 border-primary">
              <h3>{company.name}</h3>

              <Image
                src={company.logo_url}
                alt={`${company.name} logo`}
                width={60}
                height={60}
              />
              <button
                className="bg-primary px-2  ml-2 rounded-md h-10"
                onClick={() => handleEditCompany(company.id)}
              >
                Edit
              </button>
              <button
                className="bg-secondary p-2 ml-2 rounded-md h-10"
                onClick={() => handleDeleteCompany(company.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No companies available.</p>
      )}

      {/* Edit Company Modal */}
      {isEditing && (
        <div>
          {/* Display a modal or form for editing the company details */}
          <h2>Edit Company - {editCompanyId}</h2>
          <form onSubmit={handleSaveCompany}>
            <input
              type="text"
              name="name"
              placeholder="Company Name"
              value={formData.name}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="logoUrl"
              placeholder="Logo URL"
              value={formData.logoUrl}
              onChange={handleFormChange}
            />
            <button type="button" onClick={handleSaveCompany}>
              Save
            </button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;
