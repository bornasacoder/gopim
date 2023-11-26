import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { BACKEND_URL } from "@/utils";
import DeliverablesTable from "../deliverables";
import MilestoneEscrowAccountsTable from "../milestoneescrowaccounts";
import QuotesTable from "../quotes";
import TimelineTable from "../timeline";

const ProjectDetails = () => {
  const { query } = useRouter();
  const { id } = query;
  console.log(query.id);
  const idVal = id.split("=");
  const projectId = idVal[1];
  const [deliverables, setDeliverables] = useState([]);
  const [milestoneEscrowAccounts, setMilestoneEscrowAccounts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [timelines, setTimelines] = useState([]);
  const [activeTab, setActiveTab] = useState("deliverables");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BACKEND_URL}/projects/${projectId}`);
      setDeliverables(response.data.deliverables);
      setMilestoneEscrowAccounts(response.data.milestone_escrow_accounts);
      setQuotes(response.data.quotes);
      setTimelines(response.data.timelines);
    };
    fetchData();
  }, [projectId]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 my-4">
        <button
          onClick={() => setActiveTab("deliverables")}
          className={`${
            activeTab === "deliverables" ? "bg-gray-200" : ""
          } py-2 px-4 rounded-md focus:outline-none`}
        >
          Deliverables
        </button>
        <button
          onClick={() => setActiveTab("milestoneEscrowAccounts")}
          className={`${
            activeTab === "milestoneEscrowAccounts" ? "bg-gray-200" : ""
          } py-2 px-4 rounded-md focus:outline-none`}
        >
          Milestone Escrow Accounts
        </button>
        <button
          onClick={() => setActiveTab("quotes")}
          className={`${
            activeTab === "quotes" ? "bg-gray-200" : ""
          } py-2 px-4 rounded-md focus:outline-none`}
        >
          Quotes
        </button>
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
        <DeliverablesTable deliverables={deliverables} />
      )}
      {activeTab === "milestoneEscrowAccounts" && (
        <MilestoneEscrowAccountsTable
          milestoneEscrowAccounts={milestoneEscrowAccounts}
        />
      )}
      {activeTab === "quotes" && <QuotesTable quotes={quotes} />}
      {activeTab === "timelines" && <TimelineTable timelines={timelines} />}
    </div>
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
