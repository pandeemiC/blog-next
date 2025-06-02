import Link from "next/link";
import React from "react";
import { Github, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-black dark:border-white/20 font-sansation bg-background-300 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-2">
            <p className="text-sm text-black dark:text-white">
              © {new Date().getFullYear()} BlogNext. All Rights Reserved.
            </p>
            <p className="text-xs text-black dark:text-white">
              Powered by Next.js & Sanity
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/pandeemiC"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-white hover:text-accent-500 dark:text-white dark:hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-black/70 bg-black/80 dark:hover:bg-gray-700"
            >
              <Github className="size-6" />
            </Link>
            <Link
              href="https://youtube.com/@pandemictf228"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="text-white hover:text-red-600 dark:text-white dark:hover:text-red-500 transition-colors duration-300 p-2 rounded-full hover:bg-black/70 bg-black/80 dark:hover:bg-gray-700"
            >
              <Youtube className="size-6" />
            </Link>
            <Link
              href="https://linkedin.com/in/jeff-bezos-879307323"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-white hover:text-blue-600 dark:text-white dark:hover:text-blue-500 transition-colors duration-300 p-2 rounded-full hover:bg-black/70 bg-black/80 dark:hover:bg-gray-700"
            >
              <Linkedin className="size-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
