import React from "react";
import Link from "next/link";
export default function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <>
      {/* <footer className="w-full pt-4  bg-[#222222] mt-0 text-gray-300  font-roboto-condensed leading-8 tracking-normal">
        <div className="w-full flex flex-col items-center ">
          <div className="flex justify-between bg-[#222222] my-8 ">
            <Link href="" className="rounded-full">
              <img src="/facebook.svg" className="bg-white mx-2 rounded-full" />
            </Link>
            <Link href="" className="rounded-full">
              <img
                src="/twitter-round.svg"
                className="bg-white mx-2 rounded-full"
              />
            </Link>
            <Link href="" className="rounded-full">
              <img
                src="/instagram-f-svgrepo-com.svg"
                className="bg-white mx-2 rounded-full"
              />
            </Link>
            <Link href="" className="rounded-full">
              <img
                src="/youtube-round.svg"
                className="bg-white mx-2 rounded-full"
              />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center my-8 text-gray-300  font-roboto-condensed leading-8 tracking-normal ">
            <Link href="" className="text-gray-400 mx-1">
              Site map
            </Link>
            <Link href="" className="text-gray-400 mx-1">
              {" "}
              About
            </Link>
            <Link href="" className="text-gray-400 mx-1">
              Accessibility
            </Link>
            <Link href="" className="text-gray-400 mx-1">
              {" "}
              Privacy
            </Link>
            <Link href="" className="text-gray-400 mx-1">
              {" "}
              Terms of Use{" "}
            </Link>
            <Link href="" className="text-gray-400 mx-1">
              Advertising{" "}
            </Link>{" "}
            <Link href="" className="text-gray-400 mx-1">
              Jobs
            </Link>
          </div>
          <div className="flex justify-start mt-8 text-gray-400 mx-1">
            more info
          </div>
          <div className="flex flex-wrap justify-center text-gray-400 mx-1">
            {" "}
            <Link href="" className="text-gray-400 mx-1">
              Mashable
            </Link>
            <Link href="" className="text-gray-400 mx-1">
              {" "}
              PCMagt
            </Link>
            <Link href="" className="text-gray-400 mx-1">
              ExtremeTech
            </Link>
            <Link href="" className="text-gray-400 mx-1">
              {" "}
              AskMen
            </Link>
            <Link href="" className="text-gray-400 mx-1">
              {" "}
              Spiceworks{" "}
            </Link>
          </div>
          <div className="flex justify-center my-8 text-gray-400 mx-1">
            © {currentYear} Goopim, LLC. All Rights Reserved.
          </div>
        </div>
      </footer> */}

      <footer class="relative bg-blueGray-200 pt-8 pb-6 mt-16">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap text-left lg:text-left">
            <div class="w-full lg:w-6/12 px-4">
              <h4 class="text-3xl fonat-semibold text-blueGray-700">
                Let's keep in touch!
              </h4>
              <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div class="mt-6 lg:mb-0 mb-6">
                <button
                  class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <img
                    src="/facebook.svg"
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <img
                    src="/twitter-round.svg"
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <img
                    src="/instagram-f-svgrepo-com.svg"
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <img
                    src="/youtube-round.svg"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="flex flex-wrap items-top mb-6">
                <div class="w-full lg:w-4/12 px-4 ml-auto">
                  <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul class="list-unstyled">
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Free Products
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                  <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul class="list-unstyled">
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="#"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr class="my-6 border-blueGray-300" />
          <div class="flex flex-wrap items-center md:justify-between justify-center">
            <div class="w-full md:w-4/12 px-4 mx-auto text-center">
              <div class="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">{currentYear}</span>
                &nbsp; Goopim, LLC. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
