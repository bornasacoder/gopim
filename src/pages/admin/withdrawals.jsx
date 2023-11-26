import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/utils";
function AdminWithdrawals() {
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [processingWithdrawals, setProcessingWithdrawals] = useState([]);
  const [completedWithdrawals, setCompletedWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("pending");
  const gotoTab = (tabVal) => {
    setTab(tabVal);
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/admin/withdrawals/pending`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MzAxNzk5NSwianRpIjoiOGU2MWYyYmQtZmQyYi00YWFhLTk2MTgtMDkwZWI4NGFhNWJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MTAsImVtYWlsIjoidWdib3Jqb2huMjBAZ21haWwuY29tIiwicHVibGljX2lkIjoiMGZhNjI0MmItNmI0NS00NzkyLTg0ZjEtMmI1ZjM5MzQyY2QxIiwiaXNfcHJvdmlkZXIiOmZhbHNlLCJpc191c2VyIjpmYWxzZX0sIm5iZiI6MTY4MzAxNzk5NSwiZXhwIjoxNjgzMTA0Mzk1fQ.HO-O-r-z5vIM_-CdMq6scVMSSeChYuN0J4OJB_HBh18",
        },
      })
      .then((response) =>
        setPendingWithdrawals(response.data.pending_withdrawals)
      )
      .catch((error) => console.error(error));

    axios
      .get(`${BACKEND_URL}/admin/withdrawals/processing`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MzAxNzk5NSwianRpIjoiOGU2MWYyYmQtZmQyYi00YWFhLTk2MTgtMDkwZWI4NGFhNWJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MTAsImVtYWlsIjoidWdib3Jqb2huMjBAZ21haWwuY29tIiwicHVibGljX2lkIjoiMGZhNjI0MmItNmI0NS00NzkyLTg0ZjEtMmI1ZjM5MzQyY2QxIiwiaXNfcHJvdmlkZXIiOmZhbHNlLCJpc191c2VyIjpmYWxzZX0sIm5iZiI6MTY4MzAxNzk5NSwiZXhwIjoxNjgzMTA0Mzk1fQ.HO-O-r-z5vIM_-CdMq6scVMSSeChYuN0J4OJB_HBh18",
        },
      })
      .then((response) =>
        setProcessingWithdrawals(response.data.processing_withdrawals)
      )
      .catch((error) => console.error(error));

    axios
      .get(`${BACKEND_URL}/admin/withdrawals/completed`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MzAxNzk5NSwianRpIjoiOGU2MWYyYmQtZmQyYi00YWFhLTk2MTgtMDkwZWI4NGFhNWJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MTAsImVtYWlsIjoidWdib3Jqb2huMjBAZ21haWwuY29tIiwicHVibGljX2lkIjoiMGZhNjI0MmItNmI0NS00NzkyLTg0ZjEtMmI1ZjM5MzQyY2QxIiwiaXNfcHJvdmlkZXIiOmZhbHNlLCJpc191c2VyIjpmYWxzZX0sIm5iZiI6MTY4MzAxNzk5NSwiZXhwIjoxNjgzMTA0Mzk1fQ.HO-O-r-z5vIM_-CdMq6scVMSSeChYuN0J4OJB_HBh18",
        },
      })
      .then((response) =>
        setCompletedWithdrawals(response.data.completed_withdrawals)
      )
      .catch((error) => console.error(error));
  }, []);

  const handleStatusChange = (withdrawalId, newStatus) => {
    axios
      .put(
        `${BACKEND_URL}/admin/withdrawals/${withdrawalId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MzAxNzk5NSwianRpIjoiOGU2MWYyYmQtZmQyYi00YWFhLTk2MTgtMDkwZWI4NGFhNWJhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MTAsImVtYWlsIjoidWdib3Jqb2huMjBAZ21haWwuY29tIiwicHVibGljX2lkIjoiMGZhNjI0MmItNmI0NS00NzkyLTg0ZjEtMmI1ZjM5MzQyY2QxIiwiaXNfcHJvdmlkZXIiOmZhbHNlLCJpc191c2VyIjpmYWxzZX0sIm5iZiI6MTY4MzAxNzk5NSwiZXhwIjoxNjgzMTA0Mzk1fQ.HO-O-r-z5vIM_-CdMq6scVMSSeChYuN0J4OJB_HBh18",
          },
        }
      )
      .then((response) => {
        // update the corresponding withdrawal in the state
        const updatedWithdrawal = response.data;
        switch (newStatus) {
          case "pending":
            setPendingWithdrawals((withdrawals) =>
              withdrawals.map((withdrawal) =>
                withdrawal.id === updatedWithdrawal.id
                  ? updatedWithdrawal
                  : withdrawal
              )
            );
            break;
          case "processing":
            setProcessingWithdrawals((withdrawals) =>
              withdrawals.map((withdrawal) =>
                withdrawal.id === updatedWithdrawal.id
                  ? updatedWithdrawal
                  : withdrawal
              )
            );
            break;
          case "completed":
            setCompletedWithdrawals((withdrawals) =>
              withdrawals.map((withdrawal) =>
                withdrawal.id === updatedWithdrawal.id
                  ? updatedWithdrawal
                  : withdrawal
              )
            );
            break;
          default:
            break;
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Withdrawals</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => gotoTab("pending")}
          className="py-2 px-4 bg-gray-200 rounded-md text-gray-600 font-semibold focus:outline-none"
        >
          Pending Withdrawals ({pendingWithdrawals.length})
        </button>
        <button
          onClick={() => gotoTab("processing")}
          className="py-2 px-4 bg-gray-200 rounded-md text-gray-600 font-semibold focus:outline-none"
        >
          Processing Withdrawals ({processingWithdrawals.length})
        </button>
        <button
          onClick={() => gotoTab("completed")}
          className="py-2 px-4 bg-gray-200 rounded-md text-gray-600 font-semibold focus:outline-none"
        >
          Completed Withdrawals ({completedWithdrawals.length})
        </button>
      </div>
      <div className="border border-gray-200 rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 font-bold text-sm text-gray-600">
              <th className="p-2">#</th>
              <th className="p-2">User ID</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Creation Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Render pending withdrawals */}
            {pendingWithdrawals.length > 0 && tab === "pending" && (
              <>
                {pendingWithdrawals.map((withdrawal, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 text-sm text-gray-600"
                  >
                    <td className="p-2">1</td>
                    <td className="p-2">{withdrawal.userId}</td>
                    <td className="p-2">{withdrawal.amount}</td>
                    <td className="p-2">{withdrawal.status}</td>
                    <td className="p-2">
                      {new Date(withdrawal.created_date).toLocaleString()}
                    </td>
                    <td className="p-2">
                      <select
                        className="py-1 px-2 rounded-md bg-gray-200 text-gray-600 font-medium focus:outline-none"
                        onChange={(e) =>
                          handleStatusChange(withdrawal.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </>
            )}
            {/* Render processing withdrawals */}
            {processingWithdrawals.length > 0 && tab === "processing" && (
              <>
                {processingWithdrawals.map((withdrawal, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 text-sm text-gray-600"
                  >
                    <td className="p-2">1</td>
                    <td className="p-2">{withdrawal.userId}</td>
                    <td className="p-2">{withdrawal.amount}</td>
                    <td className="p-2">{withdrawal.status}</td>
                    <td className="p-2">
                      {new Date(withdrawal.created_date).toLocaleString()}
                    </td>
                    <td className="p-2">
                      <select
                        className="py-1 px-2 rounded-md bg-gray-200 text-gray-600 font-medium focus:outline-none"
                        onChange={(e) =>
                          handleStatusChange(withdrawal.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </>
            )}

            {/* Render completed withdrawals */}
            {completedWithdrawals.length > 0 && tab === "completed" && (
              <>
                {completedWithdrawals.map((withdrawal, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 text-sm text-gray-600"
                  >
                    <td className="p-2">1</td>
                    <td className="p-2">{withdrawal.userId}</td>
                    <td className="p-2">{withdrawal.amount}</td>
                    <td className="p-2">{withdrawal.status}</td>
                    <td className="p-2">
                      {new Date(withdrawal.created_date).toLocaleString()}
                    </td>
                    <td className="p-2">
                      <select
                        className="py-1 px-2 rounded-md bg-gray-200 text-gray-600 font-medium focus:outline-none"
                        onChange={(e) =>
                          handleStatusChange(withdrawal.id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminWithdrawals;
