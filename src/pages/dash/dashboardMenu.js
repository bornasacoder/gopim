import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BACKEND_URL } from "@/utils";
export default function DashboardMenu(props) {
  const navigate = useRouter();
  const [activeMenu, setActiveMenu] = useState(1);

  var location = navigate.pathname;
  const [activeUrl, setActiveUrl] = useState(location.pathname);

  return (
    <div className="w-1/5  hidden lg:mr-4 shadow-xl lg:block min-h-full font-lato bg-[#3E4C67] shaow-xl scroll-smooth">
      <div className="flex flex-col w-full justify-between overflow-x-auto ">
        <div className="m-2 p-4 h-20">
          <img src="/s2alogo.PNG" alt="logo" />
        </div>
        <div className="smooth-scroll">
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/dashboard"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => props.setActiveMenu(1)}
          >
            <div className="mx-2 pt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 ${
                  location === "/dashboard" ? "#ffffff" : "#9CAAC4"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>

            <div
              className={`ml-2  ${
                activeUrl === "/dashboard" ? "text-[#1DC7E4]" : "text-white"
              }`}
            >
              Dashboard
            </div>
          </li>

          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/addcarrier"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
          >
            <div className="mx-2 pt-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${
                  activeUrl === "/addcarrier" ? "#ffffff" : "#9CAAC4"
                } w-6 h-6`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>
            <div
              className={`ml-2  ${
                activeUrl === "/addcarrier" ? "text-[#1DC7E4]" : "text-white"
              }`}
              onClick={() => props.setActiveMenu(2)}
            >
              Add Carriers
            </div>
          </li>
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/addplans"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => setActiveMenu(3)}
          >
            <div className="mx-2 pt-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
              {/*   color={`${location === "/addplans" ? "#ffffff" : "#9CAAC4"}`}
                size={14}
                /> */}
            </div>
            <div
              className={`ml-2  ${
                activeUrl === 3 ? "text-[#1DC7E4]" : "text-white"
              }`}
            >
              Add Plans
            </div>
          </li>
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/uploadsims"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => setActiveMenu(4)}
          >
            <div className="mx-2 pt-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
              {/*   color={`${activeUrl === "/uploadsims" ? "#ffffff" : "#9CAAC4"}`}
                size={14}
                /> */}
            </div>
            <div
              className={`ml-2  ${
                activeUrl === "/uploadsims" ? "text-[#1DC7E4]" : "text-white"
              }`}
            >
              Upload SIM
            </div>
          </li>
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/pendingrequests"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => setActiveMenu(5)}
          >
            <div className="mx-2 pt-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
              {/*   color=
                {`${activeUrl === "/pendingrequests" ? "#ffffff" : "#9CAAC4"}`}
                size={14}
                /> */}
            </div>
            <div
              className={`ml-2  ${
                activeUrl === "/pendingrequests"
                  ? "text-[#1DC7E4]"
                  : "text-white"
              }`}
            >
              Pending Requests
            </div>
          </li>

          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/activatedrequests"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => {
              setActiveMenu(6);
              props.mobileMenuToggle();
            }}
          >
            <div className="mx-2 pt-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
              {/*     color=
                {`${
                  activeUrl === "/activatedrequests" ? "#ffffff" : "#9CAAC4"
                }`}
                size={14}
                /> */}
            </div>
            <div
              className={`ml-2  ${
                activeUrl === "/activatedrequests"
                  ? "text-[#1DC7E4]"
                  : "text-white"
              }`}
            >
              Activated Requests
            </div>
          </li>
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/rejectedrequests"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => {
              setActiveMenu(7);
              props.mobileMenuToggle();
            }}
          >
            <div className="mx-2 pt-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
              {/*   color=
                {`${activeUrl === "/rejectedrequests" ? "#ffffff" : "#9CAAC4"}`}
                size={14}
                /> */}
            </div>
            <div
              className={`ml-2  ${
                activeUrl === "/rejectedrequests"
                  ? "text-[#1DC7E4]"
                  : "text-white"
              }`}
            >
              Rejected Requests
            </div>
          </li>

          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/uploadedsims"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => {
              setActiveMenu(8);
              props.mobileMenuToggle();
            }}
          >
            <div className="mx-2 pt-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
              {/*    color=
                {`${activeUrl === "/uploadedsims" ? "#ffffff" : "#9CAAC4"}`}
                size={14}
                /> */}
            </div>
            <div
              className={`ml-2  ${
                activeUrl === "/uploadedsims" ? "text-[#1DC7E4]" : "text-white"
              }`}
            >
              Uploaded Sims
            </div>
          </li>
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              props.active == 9
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
          >
            <div className="mx-2 pt-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
}
