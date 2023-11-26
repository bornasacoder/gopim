import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useLocalStorage from "use-local-storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";

import ContractItem from "@/components/contractItem";

const MyContracts = () => {
  const { query } = useRouter();
  const router = useRouter();
  //const { id } = query;
  console.log(query.id);
  //const idVal = id.split("=");
  const projectId = query.id;
  const [deliverables, setDeliverables] = useState([]);
  const [milestoneEscrowAccounts, setMilestoneEscrowAccounts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [timelines, setTimelines] = useState([]);
  const [isFreelancer, setIsFreelancer] = useLocalStorage("freelancer", "");
  const [isEmployer, setIsEmployer] = useLocalStorage("employer", "");
  const [contracts, setContracts] = useState([]);
  const [filteredContract, setFilteredContracts] = useState([]);
  const [activeTab, setActiveTab] = useState("milestoneEscrowAccounts");
  const [refresh, setRefresh] = useState(false);
  const [editeContract, setEditContract] = useState(false);
  const [contractPopup, setContractPopup] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("ACCEPTED");
  const closePopup = () => {
    setContractPopup(false);
  };
  const openPopup = () => {
    setContractPopup(true);
  };
  /*   const openPopup = () => {
    setRateUser(true);
  }; */
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BACKEND_URL}/users_contract`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setContracts(response.data.contracts);
      setFilteredContracts(
        response.data.contracts.filter(
          (contract) => contract.contract_status === currentStatus
        )
      );
    };
    fetchData();
    //handleTabChange()
  }, [refresh]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = [
    {
      label: "Accepted",
      contracts: contracts.filter(
        (contract) => contract.contract_status === "ACCEPTED"
      ),
    },
    {
      label: "Pending",
      contracts: contracts.filter(
        (contract) => contract.contract_status === "PENDING"
      ),
    },
    {
      label: "Cancelled",
      contracts: contracts.filter(
        (contract) => contract.contract_status === "CANCELLED"
      ),
    },
  ];

  const handleTabChange = (index) => {
    if (index === 0) {
      setCurrentStatus("ACCEPTED");
    }
    if (index === 1) {
      setCurrentStatus("PENDING");
    }
    if (index === 2) {
      setCurrentStatus("CANCELLED");
    }
    setActiveTabIndex(index);
    const filteredContracts = tabs[index].contracts;
    setFilteredContracts(filteredContracts);
  };
  const acceptContract = (contractId) => {
    // make a POST request to your Flask backend to accept the contract
    console.log("accepted contract", contractId);
    //socket.emit("join_conversation", { conversationId });
    axios
      .put(
        `${BACKEND_URL}/contracts/${contractId}/edit`,
        {
          conversation_id: contractId,
          contract_status: "ACCEPTED",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        toast.success("Contract Accepted and project created!");
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectContract = (contractId) => {
    // make a POST request to your Flask backend to reject the contract
    //socket.emit("join_conversation", { conversationId });
    axios
      .put(
        `${BACKEND_URL}/contracts/${contractId}/edit`,
        {
          conversation_id: contractId,
          contract_status: "CANCELLED",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("Contract rejected! ");
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.error);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="mt-20">
        <div className="flex space-x-4 my-4 justify-center">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`py-2 px-4 rounded-md focus:outline-none ${
                activeTabIndex === i ? "bg-gray-200" : ""
              }`}
              onClick={() => handleTabChange(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>
          <div className=" sm:flex flex-wrap">
            {filteredContract.map((contract) => (
              <div
                key={contract.id}
                className="bg-white p-2 shadow-lg m-2 sm:w-1/4 sm:p-2"
              >
                <ContractItem
                  contract={contract}
                  rejectContract={rejectContract}
                  acceptContract={acceptContract}
                  setContractPopup={setContractPopup}
                  closePopup={closePopup}
                  openPopup={openPopup}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyContracts;
