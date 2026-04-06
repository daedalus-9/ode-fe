"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-grey text-gray-200">
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-10">
        {/* Main Grid */}
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Address Section */}

          {/* Telephone Section */}
          {/* <ul className="flex flex-col items-center gap-1 sm:items-start">
            <li className="text-lg font-semibold uppercase">Telephone</li>
            <li>
              <a href="tel:01633441457" className="underline hover:text-white">
                Call Us
              </a>
            </li>
          </ul>

          Email Section
          <ul className="flex flex-col items-center gap-1 sm:items-start">
            <li className="text-lg font-semibold uppercase">Email</li>
            <li>
              <a
                href="mailto:traffic@logic-freight.co.uk"
                className="underline hover:text-white"
              >
                Email Us
              </a>
            </li>
          </ul> */}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Owner Driver Exchange. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
