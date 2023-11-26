import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/store/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";
import axios from "axios";
import Login from "@/auth/login";
import Register from "@/auth/register";

const navigation = [
  { name: "Projects", href: "/myprojects" },
  { name: "Messages", href: "/message" },
  { name: "Contract", href: "/mycontract" },
];

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [myCompanies, setMyCompanies] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [registerView, setRegisterView] = useState(true);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenLoginModal = () => {
    setShowModal(true);
    closeMobileMenu();
    setRegisterView(true);
  };

  const handleOpenRegisterModal = () => {
    setShowModal(true);
    closeMobileMenu();
    setRegisterView(false);
  };

  const handleRegisterViewChange = () => {
    setRegisterView(!registerView);
  };

  useEffect(() => {
    // Check if user is logged in by checking if there's a token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    dispatch(setAuthState(!!token));
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/myprofile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(response.data.myprofile);
        setMyCompanies(response.data.pastcompany);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch profile");
      }
    };

    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/balance`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // replace with your authorization header
          },
        });
        setBalance(response.data.balance);
        console.log(response.data.balance);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    if (isLoggedIn) {
      fetchProfile();
      fetchBalance();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Remove token from localStorage and redirect to homepage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    dispatch(setAuthState(false));
    router.push("/");
  };

  const handleChildClick = (e) => {
    e.stopPropagation();
    console.log("child");
  };

  return (
    <>
      <header className="top-0 fixed w-full left-0 z-50">
        <nav
          /* className="flex items-center justify-between p-6 lg:px-8 fixed top-0 w-full z-50 bg-inherit shadow" */
          href="/landingpage"
          className={`text-sm font-semibold leading-6 cursor-pointer transition duration-300 ease-in-out ${
            router.pathname === "/landingpage"
              ? "flex items-center justify-between px-6 py-3 lg:px-8 fixed top-0 w-full"
              : "flex items-center justify-between px-6 py-3 lg:px-8 fixed top-0 w-full"
          } ${isScrolled ? "" : "bg-transparent"}
        `}
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 cursor-pointer">
              <span className="sr-only">GOOPIM</span>
              <img
                className="h-8 w-auto"
                src={isScrolled ? "/logo-light.png" : "/logo-light.png"}
                alt="GOOPIM"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div
            className="hidden lg:flex lg:gap-x-12"
            onClick={() => setMobileMenuOpen(false)}
          >
            {!isLoggedIn && (
              <>
                <Link
                  href="/about"
                  className={`text-sm uppercase font-semibold leading-6 cursor-pointer text-white`}
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className={`text-sm uppercase font-semibold leading-6 cursor-pointer text-white`}
                >
                  Contact Us
                </Link>

                <Link
                  href="/blogs"
                  className={`text-sm uppercase font-semibold leading-6 cursor-pointer text-white`}
                >
                  Blogs
                </Link>
              </>
            )}

            {isLoggedIn &&
              navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm uppercase font-semibold leading-6 cursor-pointer ${
                    router.pathname === item.href
                      ? "text-[#fd5b1c] border-b-2 border-[#fd5b1c]"
                      : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {!isLoggedIn && (
              <>
                <div
                  onClick={() => handleOpenLoginModal()}
                  className={`text-sm capitalize font-semibold leading-6 rounded  px-5 py-4 cursor-pointer text-white mr-3`}
                >
                  LOG IN
                </div>

                <div
                  onClick={() => handleOpenRegisterModal()}
                  className={`text-sm capitalize leading-6 px-5 py-2 flex justify-center items-center cursor-pointer bg-white`}
                >
                  <img
                    className="h-10 w-auto mr-2"
                    src="/bankid.svg"
                    alt="GOOPIM"
                  />
                  GET STARTED
                </div>
              </>
            )}
            {isLoggedIn && (
              // <button
              //   className="inline-block rounded bg-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              //   onClick={() => handleLogout()}
              // >
              //   Logout
              // </button>

              <>
                <div className="peer relative py-2">
                  <div className="flex justify-center items-center">
                    {profile && profile.profile_img_url && (
                      <img
                        className="rounded object-cover mr-2 h-10 w-10"
                        src={profile.profile_img_url}
                      />
                    )}
                    {!profile ||
                      (!profile.profile_img_url && (
                        <img
                          width="34px"
                          className="rounded mr-2"
                          height="34px"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAMFBMVEWzs7P///+tra2ysrK4uLjDw8Po6Ojv7+/Pz8/Ly8v39/fT09Pg4OC7u7v7+/vs7OwxTUw0AAAAnklEQVQ4jc2TyxKDIAxFuQmICJb//9vWqUhsE+nK6dlyJiEv5/4XJuJrgwqmcClRiACitx2qeBMshyY0Vt3h9TAwka7MXXkYSh4rP0RJXVkMBYJZLemkZFURbQGMvvAojywp6r/dUsVdsefYRpBs47Ut+4T0kplcaX+pnpj5893nCkEsyclY7MuCb2rfLLkoZ47KONykbPelM7i6+3kCAfsDzUAlbWUAAAAASUVORK5CYII="
                        />
                      ))}
                    <div>
                      {profile && (
                        <p className="text-white truncate max-w-48">
                          @{profile.username}
                        </p>
                      )}
                      <p className="text-white">{balance.toFixed(2)} USD</p>
                    </div>
                  </div>
                </div>

                <div
                  className="hidden peer-hover:flex hover:flex
                w-[200px] absolute top-[70px]
                flex-col bg-white drop-shadow-lg"
                >
                  <Link
                    className="px-5 py-3 hover:bg-gray-200 uppercase"
                    href="/myprofile"
                  >
                    My Profile
                  </Link>
                  <Link
                    className="px-5 py-3 hover:bg-gray-200 uppercase"
                    href="/finance"
                  >
                    Finance
                  </Link>
                  <a
                    className="px-5 py-3 hover:bg-gray-200 uppercase"
                    onClick={() => handleLogout()}
                  >
                    Log out
                  </a>
                </div>
              </>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={closeMobileMenu}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#272727] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">GOOPIM</span>
                <img
                  className="h-8 w-auto cursor-pointer"
                  src="/logo-light.png"
                  alt="GOOPIM"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {!isLoggedIn && (
                    <>
                      <Link
                        href="/about"
                        className={`-mx-3 block rounded-lg uppercase px-3 py-2 text-base font-bold leading-7 text-white cursor-pointer`}
                      >
                        About Us
                      </Link>

                      <Link
                        href="/contact"
                        className={`-mx-3 block rounded-lg uppercase px-3 py-2 text-base font-bold leading-7 text-white cursor-pointer`}
                      >
                        Contact Us
                      </Link>

                      <Link
                        href="/blogs"
                        className={`-mx-3 block rounded-lg uppercase px-3 py-2 text-base font-bold leading-7 text-white cursor-pointer`}
                      >
                        Blogs
                      </Link>
                    </>
                  )}

                  {isLoggedIn && (
                    <>
                      <div className="flex justify-start items-center mb-6">
                        {profile && profile.profile_img_url && (
                          <img
                            className="rounded object-cover mr-2 h-12 w-12"
                            src={profile.profile_img_url}
                          />
                        )}
                        {!profile ||
                          (!profile.profile_img_url && (
                            <img
                              width="34px"
                              className="rounded mr-2"
                              height="34px"
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAMFBMVEWzs7P///+tra2ysrK4uLjDw8Po6Ojv7+/Pz8/Ly8v39/fT09Pg4OC7u7v7+/vs7OwxTUw0AAAAnklEQVQ4jc2TyxKDIAxFuQmICJb//9vWqUhsE+nK6dlyJiEv5/4XJuJrgwqmcClRiACitx2qeBMshyY0Vt3h9TAwka7MXXkYSh4rP0RJXVkMBYJZLemkZFURbQGMvvAojywp6r/dUsVdsefYRpBs47Ut+4T0kplcaX+pnpj5893nCkEsyclY7MuCb2rfLLkoZ47KONykbPelM7i6+3kCAfsDzUAlbWUAAAAASUVORK5CYII="
                            />
                          ))}
                        <div>
                          {profile && (
                            <p className="text-white truncate max-w-48">
                              @{profile.username}
                            </p>
                          )}
                          <p className="text-white">{balance.toFixed(2)} USD</p>
                        </div>
                      </div>

                      <Link
                        href="/myprofile"
                        className={`-mx-3 block rounded-lg uppercase px-3 py-2 text-base font-bold leading-7 text-white cursor-pointer`}
                      >
                        My Profile
                      </Link>

                      <Link
                        href="/finance"
                        className={`-mx-3 block rounded-lg uppercase px-3 py-2 text-base font-bold leading-7 text-white cursor-pointer`}
                      >
                        Finance
                      </Link>

                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => closeMobileMenu()}
                          className={`-mx-3 block rounded-lg uppercase px-3 py-2 text-base font-bold leading-7 cursor-pointer ${
                            router.pathname === item.href
                              ? "text-[#fd5b1c] border-b-2 border-[#fd5b1c]"
                              : "text-white"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
                <div className="py-6">
                  {!isLoggedIn && (
                    <>
                      <div
                        onClick={() => handleOpenLoginModal()}
                        className={`-mx-3 block uppercase rounded-lg px-3 py-2 text-base font-bold leading-7 cursor-pointer text-white`}
                      >
                        Log in
                      </div>

                      <div
                        onClick={() => handleOpenRegisterModal()}
                        className={`text-sm mt-5 capitalize leading-6 px-5 py-2 flex justify-center items-center cursor-pointer bg-white`}
                      >
                        <img
                          className="h-10 w-auto mr-2"
                          src="/bankid.svg"
                          alt="GOOPIM"
                        />
                        GET STARTED
                      </div>
                    </>
                  )}
                  {isLoggedIn && (
                    <button
                      className="inline-block text-sm mt-5 leading-6 px-5 py-2 uppercase justify-center items-center cursor-pointer bg-white"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {showModal && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 rounded-lg"
          onClick={handleCloseModal}
        >
          <section
            className="h-[500px] max-h-[500px] w-[900px] relative bg-white rounded-lg"
            onClick={handleChildClick}
          >
            <div className="flex justify-end absolute right-0 top-0">
              <button
                className="bg-transparent border-none p-0 mt-3 me-3"
                onClick={handleCloseModal}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="h-full ">
              {/* <!-- Left column container with background--> */}
              <div className="g-0 flex  items-center justify-center lg:justify-between ">
                <div className=" hidden md:block flex-[2]">
                  <img
                    src="/draw2.webp"
                    className="w-full "
                    alt="Sample image"
                  />
                </div>

                {/* <!-- Right column container --> */}
                <div className="mb-12 md:mb-0 md:w-6/12 lg:w-6/12 xl:w-6/12 flex-[2]">
                  {registerView ? (
                    <Login
                      setIsLoggedIn={setIsLoggedIn}
                      gotoRegisterView={handleRegisterViewChange}
                      handleCloseModal={handleCloseModal}
                    />
                  ) : (
                    <Register gotoLoginView={handleRegisterViewChange} />
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Navbar;
