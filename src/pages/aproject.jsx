import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";
import DeliverablesTable from "./deliverables";
import MilestoneEscrowAccountsTable from "./milestoneescrowaccounts";
import QuotesTable from "./quotes";
import TimelineTable from "./timeline";
import CreateReview from "./rateandreview";

const ProjectDetails = () => {
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
  const [activeTab, setActiveTab] = useState("milestoneEscrowAccounts");
  const [rateUser, setRateUser] = useState(false);
  const closePopup = () => {
    setRateUser(false);
  };
  const openPopup = () => {
    setRateUser(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BACKEND_URL}/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDeliverables(response.data.deliverables);
      setMilestoneEscrowAccounts(response.data.milestone_escrow_accounts);
      setQuotes(response.data.quotes);
      setTimelines(response.data.timelines);
    };
    fetchData();
  }, [projectId]);

  return (
    <>
      <ToastContainer />
      <div className="flex justify-start mt-12 mb-10 m-h-100">
        {" "}
        <button
          type="button"
          className="bg-primary rounded-md p-1 ml-2"
          onClick={() => router.back()}
        >
          Go back
        </button>
      </div>
      <div className="flex flex-col items-center mt-2">
        <div className="flex space-x-4 my-4">
          <button
            onClick={() => setActiveTab("milestoneEscrowAccounts")}
            className={`${
              activeTab === "milestoneEscrowAccounts" ? "bg-gray-200" : ""
            } py-2 px-4 rounded-md focus:outline-none`}
          >
            Milestones
          </button>
          <button
            onClick={() => setActiveTab("deliverables")}
            className={`${
              activeTab === "deliverables" ? "bg-gray-200" : ""
            } py-2 px-4 rounded-md focus:outline-none`}
          >
            Deliverables
          </button>
          {/*    <button
          onClick={() => setActiveTab("quotes")}
          className={`${
            activeTab === "quotes" ? "bg-gray-200" : ""
          } py-2 px-4 rounded-md focus:outline-none`}
        >
          Quotes
        </button> */}
          <button
            onClick={() => setActiveTab("timelines")}
            className={`${
              activeTab === "timelines" ? "bg-gray-200" : ""
            } py-2 px-4 rounded-md focus:outline-none`}
          >
            Timelines
          </button>
        </div>
        {activeTab === "deliverables" && (
          <DeliverablesTable
            deliverables={deliverables}
            projectId={projectId}
            setDeliverables={setDeliverables}
          />
        )}
        {activeTab === "milestoneEscrowAccounts" && (
          <MilestoneEscrowAccountsTable
            milestoneEscrowAccounts={milestoneEscrowAccounts}
            openPopup={openPopup}
          />
        )}
        {/*       {activeTab === "quotes" && <QuotesTable quotes={quotes} />} */}
        {activeTab === "timelines" && (
          <TimelineTable
            timelines={timelines}
            projectId={projectId}
            setTimelines={setTimelines}
          />
        )}
      </div>
      {rateUser && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <CreateReview closePopup={closePopup} projectId={projectId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query, // pass query object to page props
    },
  };
}
