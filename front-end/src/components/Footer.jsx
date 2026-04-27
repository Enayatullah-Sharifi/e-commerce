import React from "react";

const Footer = () => {
  const date = new Date(Date.now()).getFullYear();
  return (
    <div className="w-full uppercase text-center p-3 font-bold bg-white mt-14 dark:bg-black dark:text-slate-400">copyright &copy; {date}</div>
  );
};

export default Footer;
