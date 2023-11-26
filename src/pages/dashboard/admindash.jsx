import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../store/slices/authSlice";
import { BACKEND_URL } from "@/utils";

import { Col, Row } from "react-grid-system";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [paymentAccounts, setPaymentAccounts] = useState([]);
  const [milestoneAccounts, setMilestoneAccounts] = useState([]);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const usersResponse = await axios.get(`${BACKEND_URL}/admin/users`, {
        headers,
      });
      setUsers(usersResponse.data.users);

      const projectsResponse = await axios.get(
        `${BACKEND_URL}/admin/projects`,
        {
          headers,
        }
      );
      setProjects(projectsResponse.data.projects);

      const transactionsResponse = await axios.get(
        `${BACKEND_URL}/admin/transactions`,
        {
          headers,
        }
      );
      setTransactions(transactionsResponse.data.transactions);

      const paymentAccountsResponse = await axios.get(
        `${BACKEND_URL}/admin/payment-accounts`,
        {
          headers,
        }
      );
      setPaymentAccounts(paymentAccountsResponse.data.payment_accounts);

      const milestoneAccountsResponse = await axios.get(
        `${BACKEND_URL}/admin/milestone_escrow_accounts`,
        {
          headers,
        }
      );
      setMilestoneAccounts(
        milestoneAccountsResponse.data.milestone_escrow_accounts
      );

      const milestonesResponse = await axios.get(
        `${BACKEND_URL}/admin/milestones`,
        {
          headers,
        }
      );
      setMilestones(milestonesResponse.data.milestones);
    };

    fetchAllData();
  }, []);

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex ">
        <Link
          href="/dashboard/admindash"
          className="text-xl font-semibold mb-4 px-4 py-2 rounded-lg bg-gray-200 text-white mr-4"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/withdrawals"
          className="text-xl font-semibold mb-4 px-4 py-2 rounded-lg bg-gray-200 text-white"
        >
          Withdrawals
        </Link>
      </div>
      <Row>
        <Col xs={12} md={6} lg={4}>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-medium mb-2">Users</h3>
            <ul>
              {users.map((user, index) => (
                <li
                  key={user.id}
                  className={`rounded-lg shadow-md p-4 mb-4 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <span className="text-lg font-medium">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="text-gray-500"> ({user.email})</span>
                  {user.is_an_employer && (
                    <span className="text-green-500"> (Employer)</span>
                  )}
                  {user.is_freelancer && (
                    <span className="text-blue-500"> (Freelancer)</span>
                  )}
                  {user.is_controller && (
                    <span className="text-red-500"> (ADMIN)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-medium mb-2">Projects</h3>
            <p className="flex justify-between">
              <span>Project id</span>
              <span>Employer</span>
              <span>Freelancer</span>
              <span>Amount</span>
            </p>

            <ul>
              {projects.map((project, index) => (
                <li
                  key={project.id}
                  className={`flex justify-between rounded-lg shadow-md p-4 mb-4 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <span className="">{project.id}</span>
                  <span className="text-gray-500">{project.user_id}</span>
                  <span className="text-gray-500">{project.provider_id}</span>
                  <span className="text-gray-500">
                    {project.contract_amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-medium mb-2">Transactions</h3>
            {transactions.map((transaction) => (
              <p key={transaction.id}>{transaction.amount}</p>
            ))}
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-medium mb-2">Payment Accounts</h3>
            <p className="flex justify-between">
              <span>Payment Account id</span>
              <span>Balance</span>
            </p>
            <ul>
              {paymentAccounts.map((paymentAccount, index) => (
                <li
                  key={paymentAccount.id}
                  className={`flex justify-between rounded-lg shadow-md p-4 mb-4 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <span className="">{paymentAccount.id}</span>{" "}
                  <span className="">{paymentAccount.balance}</span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-medium mb-2">Milestone Accounts</h3>
            <p className="flex justify-between">
              <span>Id</span>
              <span>Project Id</span>
              <span>Amount</span>
              <span>Status</span>
            </p>
            <ul>
              {milestoneAccounts.map((milestoneAccount, index) => (
                <li
                  key={milestoneAccount.id}
                  className={`flex justify-between rounded-lg shadow-md p-4 mb-4 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <span className="">{milestoneAccount.id}</span>{" "}
                  <span className="">{milestoneAccount.project_id}</span>
                  <span className="">{milestoneAccount.amount}</span>
                  {milestoneAccount.completed ? (
                    <span className="bg-green-500">Completed</span>
                  ) : (
                    <span className="bg-yellow-300">Pending</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-medium mb-2">Milestones</h3>
            <p className="flex justify-between">
              <span>Id</span>
              <span>Description</span>
              <span>Amount</span>
              <span>Freelancer</span>
              <span>Employer</span>
            </p>
            {milestones.map((milestone, index) => (
              <li
                key={milestone.id}
                className={`flex justify-between rounded-lg shadow-md p-4 mb-4 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <span className="">{milestone.id}</span>{" "}
                <span className="">{milestone.milestone_description}</span>
                <span className="">{milestone.milestone_amount}</span>
                <span className="">{milestone.provider_id}</span>
                <span className="">{milestone.user_id}</span>
              </li>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
