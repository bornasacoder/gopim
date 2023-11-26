import React from "react";
import Link from "next/link";
export default function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <footer className="pt-4  bg-gradient-to-r from-[#272727] to-[#fd5b1c] mt-12">
      <div className="flex flex-col pl-4 sm:flex-row justify-around py-5">
        <div className="text-white">
          <imgLogo />
          Goopim
          <div>
            <h2>The best site to find a freelancer</h2>
          </div>
        </div>
        <div className="flex flex-col items-center sm:flex-row justify-around py-10">
          <div className="flex flex-col px-2">
            <h1 className="font-bold text-white">About</h1>
            <Link href="/"> Careers</Link>
            <Link href="/"> Press & News</Link>
            <Link href="/"> Partnerships</Link>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Service</Link>

            <Link href="/">Investor Relations</Link>
          </div>{" "}
          <div className="m-4">
            <h1 className="font-bold text-white">Support</h1>
            <div className="flex flex-col px-2">
              <Link href="/"> Careers</Link>
              <Link href="/"> Press & News</Link>
              <Link href="/"> Partnerships</Link>
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Terms of Service</Link>

              <Link href="/">Investor Relations</Link>
            </div>{" "}
          </div>{" "}
          <div>
            <h1 className="font-bold text-white">Community</h1>
            <div className="flex flex-col px-2">
              <Link href="/"> Careers</Link>
              <Link href="/"> Press & News</Link>
              <Link href="/"> Partnerships</Link>
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Terms of Service</Link>

              <Link href="/">Investor Relations</Link>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-white">
            <span className="mr-2 ">© {currentYear}</span>Goopim
          </h2>
        </div>
        <div className="flex justify-around text-white">
          <h3 className="px-1">Twitter</h3>
          <h3 className="px-1">Facebook</h3>
          <h3 className="px-1">Linkedin</h3>
        </div>
      </div>
    </footer>
  );
}
