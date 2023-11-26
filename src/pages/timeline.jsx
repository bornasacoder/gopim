import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatetimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import { BACKEND_URL } from "@/utils";

const CreateTimeline = ({ projectId, setTimelines }) => {
  //const [projectID, setProjectID] = useState("");
  //const [providerID, setProviderID] = useState("");
  const [description, setDescription] = useState("");
  const [timelineTime, setTimelineTime] = useState(new Date());

  const handleCreateTimeline = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/timelines`,
        {
          timeline_description: description,
          timeline_time: timelineTime,
          project_id: projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("successfully!");
      setDescription("");
      setTimelineTime(new Date());
      // Get all timelines after creating
      const gettimelinesResponse = await axios.get(
        `${BACKEND_URL}/projects/${projectId}/timelines`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTimelines(gettimelinesResponse.data.timelines);
    } catch (error) {
      console.error("Error creating timeline:", error);
    }
  };

  return (
    <div className="bg-blue-100 p-1 border-grey-500 mb-4">
      <div className="flex justify-center mt-2 py-2">
        {" "}
        <h2>Create New Timeline</h2>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-center bg-blue-100 p-1 border-grey-500 mb-8 sm:mb-1 py-2">
        <div className="flex flex-col sm:flex-row sm:justify-center">
          <label className="px-2 ">
            Description:
            <input
              className="ml-1 mb-2"
              placeholder="time description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div className="px-1">
            <span className="mr-1">Set date and time:</span>
            <DatetimePicker
              className={"border border-gray-300 rounded-md p-1 "}
              value={timelineTime}
              onChange={setTimelineTime}
              format="yyyy-MM-dd HH:mm:ss"
            />
          </div>

          <button
            onClick={handleCreateTimeline}
            className="bg-primary  p-1 mt-2 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
const TimelineTable = ({ timelines, projectId, setTimelines }) => {
  const DateTimeDisplay = (datestring) => {
    const dateObj = new Date(datestring);
    const time = dateObj.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const date = dateObj.toLocaleDateString([], {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });

    return <div>{`${time} ${date}`}</div>;
  };
  return (
    <div className="w-full m-h-100">
      <CreateTimeline projectId={projectId} setTimelines={setTimelines} />
      <div className="my-1 flex justify-center">
        <h2>Timeline list</h2>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Id
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
            >
              Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-secondary">
          {timelines.map((timeline, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-secondary ${
                index % 2 == 0 ? "" : "bg-blue-100"
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-black">
                  {index + 1}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-black">
                  {timeline.timeline_description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-black">
                  {DateTimeDisplay(timeline.timeline_time)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimelineTable;
