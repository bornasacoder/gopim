import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BeakerIcon } from "@heroicons/react/24/solid";
import { TrophyIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import HomepageProviderSearch from "@/components/homeprovidersearch";
import LandingPageSections from "@/components/landingpagesections";
import NewHomepage from "@/components/newhomepage";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchbarExpand = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <div className="bg-white">
      <NewHomepage></NewHomepage>
      {/* <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="signup-space">
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
          <div className="signup-stars"></div>
        </div>
        <HomepageProviderSearch />
        <div className="mx-auto max-w-2xl py-32 sm:py-5 lg:py-10">
        

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="text-[#42b5d3]">Find the right</span>{" "}
              <span className="text-[#fd5b1c]">freelancer using AI</span>
            </h1>
            <TrophyIcon className="h-10 w-10 text-[#42b5d3] mx-auto mt-6" />

            <div className="mt-10 flex items-center justify-center gap-x-6"></div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div> 
    */}
      <LandingPageSections />
    </div>
  );
}
