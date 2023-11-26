import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

export default function MobileDashboardMenu(props) {
  const navigate = useRouter();

  var location = navigate.pathname;
  const [activeUrl, setActiveUrl] = useState(location.pathname);
  const Camera = (
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
  );
  var location = navigate.pathname;
  const [activeMenu, setActiveMenu] = useState(1);

  return (
    <div className="w-1/2 sm:hidden absolute  bg-[#3E4C67] shaow-xl z-10 h-full font-lato ">
      <div className="w-full bg-[#3E4C67] ">
        <div className="flex justify-around">
          <div className="m-2 pl-2">
            <img src="/s2alogo.PNG" alt="logo" />
          </div>
          <div className="pt-2 pl-2" onClick={() => props.mobileMenuToggle()}>
            <img
              width={40}
              height={40}
              src="/menu-close-icon.svg"
              alt="mobile menu close"
            />
          </div>
        </div>

        <div>
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/dashboard"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => setActiveMenu(1)}
          >
            <Link href="/dashboard" className="no-underline text-white flex">
              <div className="mx-2 pt-1">
                {" "}
                <Camera
                  color={`${location === "/nd" ? "#ffffff" : "#9CAAC4"}`}
                  size={14}
                />
              </div>

              <div
                className={`ml-2  ${
                  activeUrl === "/nd" ? "text-[#1DC7E4]" : "text-white"
                }`}
              >
                Dashboard
              </div>
            </Link>
          </li>

          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/addcarrier"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
          >
            <Link href="/addcarrier" className="no-underline text-white flex">
              <div className="mx-2 pt-1">
                {" "}
                <Camera
                  color={`${
                    activeUrl === "/addcarrier" ? "#ffffff" : "#9CAAC4"
                  }`}
                  size={14}
                />
              </div>
              <div
                className={`ml-2  ${
                  activeUrl === "/addcarrier" ? "text-[#1DC7E4]" : "text-white"
                }`}
                onClick={() => setActiveMenu(2)}
              >
                Add Carriers
              </div>
            </Link>
          </li>
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/addplans"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => setActiveMenu(3)}
          >
            <Link href="/addplans" className="no-underline text-white flex">
              <div className="mx-2 pt-1">
                {" "}
                <Camera
                  color={`${location === "/addplans" ? "#ffffff" : "#9CAAC4"}`}
                  size={14}
                />
              </div>
              <div
                className={`ml-2  ${
                  activeUrl === 3 ? "text-[#1DC7E4]" : "text-white"
                }`}
              >
                Add Plans
              </div>
            </Link>
          </li>
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/uploadsims"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => setActiveMenu(4)}
          >
            <Link href="/uploadsims" className="no-underline text-white flex">
              <div className="mx-2 pt-1">
                {" "}
                <Camera
                  color={`${
                    activeUrl === "/uploadsims" ? "#ffffff" : "#9CAAC4"
                  }`}
                  size={14}
                />
              </div>
              <div
                className={`ml-2  ${
                  activeUrl === "/uploadsims" ? "text-[#1DC7E4]" : "text-white"
                }`}
              >
                Upload SIM
              </div>
            </Link>
          </li>
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/pendingrequests"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => setActiveMenu(5)}
          >
            <Link
              href="/pendingrequests"
              className="no-underline text-white flex"
            >
              <div className="mx-2 pt-1">
                {" "}
                <Camera
                  color={`${
                    activeUrl === "/pendingrequests" ? "#ffffff" : "#9CAAC4"
                  }`}
                  size={14}
                />
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
            </Link>
          </li>

          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/activatedrequests"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => {
              props.mobileMenuToggle();
            }}
          >
            <Link
              href="/activatedrequests"
              className="no-underline text-white flex"
            >
              <div className="mx-2 pt-1">
                {" "}
                <Camera
                  color={`${
                    activeUrl === "/activatedrequests" ? "#ffffff" : "#9CAAC4"
                  }`}
                  size={14}
                />
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
            </Link>
          </li>

          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/rejectedrequests"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => {
              props.mobileMenuToggle();
            }}
          >
            <Link
              href="/rejectedrequests"
              className="no-underline text-white flex"
            >
              <div className="mx-2 pt-1">
                {" "}
                <Camera
                  color={`${
                    activeUrl === "/rejectedrequests" ? "#ffffff" : "#9CAAC4"
                  }`}
                  size={14}
                />
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
            </Link>
          </li>
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0  ${
              activeUrl === "/uploadedsims"
                ? "bg-[#323F55] border-l-4 border-[#1CC5E9]"
                : ""
            }`}
            onClick={() => {
              props.mobileMenuToggle();
            }}
          >
            <Link href="/uploadedsims" className="no-underline text-white flex">
              <div className="mx-2 pt-1">
                {" "}
                <Camera
                  color={`${
                    activeUrl === "/uploadedsims" ? "#ffffff" : "#9CAAC4"
                  }`}
                  size={14}
                />
              </div>
              <div
                className={`ml-2  ${
                  activeUrl === "/uploadedsims"
                    ? "text-[#1DC7E4]"
                    : "text-white"
                }`}
              >
                Uploaded Sims
              </div>
            </Link>
          </li>
          <li
            className={`flex  p-2 my-4 cursor-pointer  w-full ml-0 
              
                 "bg-[#323F55]  "
               
            `}
          >
            <div className="mx-2 pt-1">
              {" "}
              <Camera />
            </div>
          </li>
        </div>
      </div>
    </div>
  );
}
