import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../store/slices/authSlice";
import { BACKEND_URL } from "@/utils";

import { Col, Row } from "react-grid-system";

const Dashboard = () => {
  const [pendingWithdrawalCount, setPendingWithdrawalCount] = useState(0);
  const [processingWithdrawalCount, setProcessingWithdrawalCount] = useState(0);
  const [completedWithdrawalCount, setCompletedWithdrawalCount] = useState(0);
  const [totalAccountBalance, setTotalAccountBalance] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalContractAmount, setTotalContractAmount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [acceptedContractCount, setAcceptedContractCount] = useState(0);
  const [rejectedContractCount, setRejectedContractCount] = useState(0);
  const [pendingContractCount, setPendingContractCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const dashboardResponse = await axios.get(
        `${BACKEND_URL}/admindashboard`,
        {
          headers,
        }
      );
      setPendingWithdrawalCount(
        dashboardResponse.data.pending_withdrawal_count
      );
      setProcessingWithdrawalCount(
        dashboardResponse.data.processing_withdrawal_count
      );
      setCompletedWithdrawalCount(
        dashboardResponse.data.completed_withdrawal_count
      );
      setTotalAccountBalance(dashboardResponse.data.total_account_balance);
      setTotalProjects(dashboardResponse.data.total_projects);
      setTotalContractAmount(dashboardResponse.data.total_contract_amount);
      setTotalUsers(dashboardResponse.data.total_users);
      setAcceptedContractCount(dashboardResponse.data.accepted_contract_count);
      setRejectedContractCount(dashboardResponse.data.rejected_contract_count);
      setPendingContractCount(dashboardResponse.data.pending_contract_count);
      setLoading(false);
    };

    fetchAllData();
  }, []);
  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      {loading && (
        <div class="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-secondary"
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

      <Row>
        <Col xs={12} md={12} lg={12}>
          <div className=" m-2 md:flex w-full items-center flex-wrap lg:flex-row sm:flex-wrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap lg:mx-6 font-lato justify-around mt-4">
            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary ">
                  Total users
                </p>
                <p className="text-center">{totalUsers}</p>
              </div>
            </div>

            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary">
                  Total project
                </p>
                <p className="text-center">{totalProjects}</p>
              </div>
            </div>
            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary">
                  Account balance
                </p>
                <p className="text-center">
                  {" "}
                  <span className="font-bold ">$</span>
                  {totalAccountBalance}
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <div className=" m-2 md:flex w-full items-center flex-wrap lg:flex-row sm:flex-wrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap lg:mx-6 font-lato justify-around mt-4">
            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary ">
                  Total accepted contract
                </p>
                <p className="text-center">{acceptedContractCount}</p>
              </div>
            </div>

            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary">
                  Total pending contract
                </p>
                <p className="text-center">{pendingContractCount}</p>
              </div>
            </div>
            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary">
                  Total rejected contact
                </p>
                <p className="text-center">{rejectedContractCount}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <div className=" m-2 md:flex w-full items-center flex-wrap lg:flex-row sm:flex-wrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap lg:mx-6 font-lato justify-around mt-4">
            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary ">
                  Pending withdrawals
                </p>
                <p className="text-center">{pendingWithdrawalCount}</p>
              </div>
            </div>

            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary">
                  Processing withdrawals
                </p>
                <p className="text-center">{processingWithdrawalCount}</p>
              </div>
            </div>
            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary">
                  Completed withdrawal
                </p>
                <p className="text-center">{completedWithdrawalCount}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <div className=" m-2 md:flex w-full items-center flex-wrap lg:flex-row sm:flex-wrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap lg:mx-6 font-lato justify-around mt-4">
            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary ">
                  Total contract amount
                </p>
                <p className="text-center">
                  {" "}
                  <span className="font-bold ">$</span>
                  {totalContractAmount}
                </p>
              </div>
            </div>

            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary">
                  Total withdrawal requests
                </p>
                <p className="text-center ">
                  {pendingWithdrawalCount +
                    processingWithdrawalCount +
                    completedWithdrawalCount}
                </p>
              </div>
            </div>
            <div className=" m-2 md:w-1/3 flex flex-wrap items-center lg:flex-nowrap lg:w-3/12 bg-white shadow-xl p-4 justify-center">
              <div className="lg:m-1"></div>
              <div className="flex ml-1 flex-col lg:ml-3">
                <p className="text-sm font-bold capitalize text-primary">
                  Total contracts
                </p>
                <p className=" text-center">
                  {pendingContractCount +
                    rejectedContractCount +
                    acceptedContractCount}
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
