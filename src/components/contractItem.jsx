import ContractForm from "@/pages/createcontract";
import EditContractForm from "@/pages/editcotract";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
const ContractItem = (props) => {
  const [isFreelancer, setIsFreelancer] = useLocalStorage("freelancer", "");
  const [isEmployer, setIsEmployer] = useLocalStorage("employer", "");
  const [contractPopup, setContractPopup] = useState(false);
  const closePopup = () => {
    setContractPopup(false);
  };
  const openPopup = () => {
    setContractPopup(true);
  };

  return (
    <>
      <div className="flex flex-col text-center items-center my-2 p-1 border-2">
        <p
          className={` rounded w-26 p-1 my-1 ${
            props.contract.contract_status == "ACCEPTED" ? "bg-green-200" : ""
          }${
            props.contract.contract_status == "CANCELLED" ? "bg-red-200" : ""
          }${
            props.contract.contract_status == "PENDING" ? "bg-yellow-200" : ""
          }`}
        >
          <span>Contract status:</span>{" "}
          <psan className="ml-2 text-lower">
            {props.contract.contract_status}
          </psan>
        </p>
        <div className="flex justify-center">
          {" "}
          {isEmployer && (
            <img
              src={props.contract.freelancer_profile_image_url}
              className="w-20 h-20 rounded-full"
            />
          )}
          {isFreelancer && (
            <img
              src={props.contract.employer_profile_image_url}
              className="w-20 h-20 rounded-full"
            />
          )}
        </div>
        {isEmployer && (
          <p className="p-1 my-1 font-bold">
            {" "}
            {props.contract.freelancer_name}
          </p>
        )}
        {isFreelancer && (
          <p className="p-1 my-1 font-bold"> {props.contract.employer_name}</p>
        )}

        {props.contract.contract_status == "PENDING" && isEmployer && (
          <div className="flex justify-center ">
            <button
              className="p-2 bg-green-600 text-white mr-2 rounded px-1  w-24  sm:mr-2 mb-1"
              onClick={() => {
                props.rejectContract(props.contract.id);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-primary hover:bg-primary text-white font-bold px-1 rounded w-24  sm:mr-2 mb-1"
              onClick={() => {
                openPopup();
              }}
            >
              Edit
            </button>
          </div>
        )}
        {props.contract.contract_status == "PENDING" && isFreelancer && (
          <div className="flex justify-center my-2">
            <button
              className="p-2 bg-green-600 text-white mr-2  px-1 rounded w-24  sm:mr-2 mb-1"
              onClick={() => props.acceptContract(props.contract.id)}
            >
              Accept
            </button>
            <button
              className="p-2 bg-red-600 text-white  px-1 rounded w-24  sm:mr-2 mb-1"
              onClick={() => props.rejectContract(props.contract.id)}
            >
              Reject
            </button>
          </div>
        )}
        <div className="bg-gray-100 p-4 rounded mt-4">
          {" "}
          <p className="p-1 my-1 font-bold">
            Contract title {props.contract.contract_title}
          </p>
          <p className="p-1 my-1">
            Contact details {props.contract.contract_details}
          </p>
        </div>
      </div>

      <>
        {contractPopup && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <EditContractForm
                  closePopup={closePopup}
                  contractTitle="Edit Cotract"
                  contractId={props.contract.id}
                  contractButtonText="Update"
                ></EditContractForm>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default ContractItem;
