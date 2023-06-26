"use client";
import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import MenuIcon from "../Icons/MenuIcon";
import DashboardIcon from "../Icons/DashboardIcon";
import TransactionIcon from "../Icons/TransactionIcon";
import TagIcon from "../Icons/TagIcon";
import CloseIcon from "../Icons/CloseIcon";

const Sidebar = () => {
  const [size, setSize] = useState<"OPEN" | "CLOSE">("CLOSE");

  const handleMenuClose = () => {
    console.log("Close");
    setSize("CLOSE");
  };

  const handleMenuOpen = () => {
    setSize("OPEN");
  };

  return (
    <>
      <button
        className="z-1 absolute left-1 top-2 rounded-full border border-slate-300 bg-white md:hidden"
        onClick={handleMenuOpen}
      >
        <MenuIcon />
      </button>
      {size === "OPEN" && (
        <div
          className="z-2 absolute top-0 h-screen w-screen cursor-pointer bg-slate-900 opacity-80 md:hidden"
          onClick={handleMenuClose}
        />
      )}
      <nav
        className={`z-3 absolute top-0 flex h-screen w-60 flex-col bg-white px-8 md:relative md:z-0 md:h-[calc(100vh-48px)] md:flex-1 md:translate-x-0 ${
          size === "CLOSE" && "-translate-x-full"
        } transition-transform`}
      >
        <button
          className="absolute right-1 top-1 h-9 w-9 md:hidden"
          onClick={handleMenuClose}
        >
          <CloseIcon classname="fill-slate-400 hover:fill-slate-950" />
        </button>
        <SidebarItem href="/" title="Dashboard" icon={<DashboardIcon />} />
        <SidebarItem
          href="/transactions"
          title="Transactions"
          icon={<TransactionIcon />}
        />
        <SidebarItem href="/tags" title="Tags" icon={<TagIcon />} />
      </nav>
    </>
  );
};

export default Sidebar;
