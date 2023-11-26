import React from "react";
import Withrawal from "../withdrawal";
import WithdrawalComponent from "../dashboard/withdrawals";
import Users from "./users";
import Projects from "./projects";
import PaymentAccount from "./paymentaccount";
import Milestones from "./milestone";
import UserCreatedMilestones from "./usercreatedmilestones";
import Dashboard from "./dashboard";
import SearchLogsComponent from "./seachlog";
const ViewPanel = ({ selectedItem }) => {
  return (
    <div className="w-4/5">
      {selectedItem.name === "Dashboard" ? <Dashboard /> : null}
      {selectedItem.name === "Users" ? (
        <div>
          <Users />
        </div>
      ) : null}
      {selectedItem.name === "Projects" ? (
        <div>
          <Projects />
        </div>
      ) : null}
      {selectedItem.name === "Withdrawals" ? (
        <div>
          <WithdrawalComponent />
        </div>
      ) : null}
      {selectedItem.name === "Paymentaccount" ? (
        <div>
          <PaymentAccount />{" "}
        </div>
      ) : null}
      {selectedItem.name === "Milestones" ? (
        <div>
          <Milestones />{" "}
        </div>
      ) : null}
      {selectedItem.name === "UserCreatedMilestones" ? (
        <div>
          <UserCreatedMilestones />
        </div>
      ) : null}
      {selectedItem.name === "SearchLogComponent" ? (
        <div>
          <SearchLogsComponent />
        </div>
      ) : null}
    </div>
  );
};

export default ViewPanel;
