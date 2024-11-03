import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between w-screen p-4 bg-indigo-700 border ">
      <div className="logo">
        <h1 className="text-4xl font-semibold text-white lg:ml-28">BTodo</h1>
      </div>

      <ul className="flex gap-9">
        <li className="font-mono text-white cursor-pointer hover:font-bold transform-all">
          Home
        </li>
        <li className="font-mono text-white cursor-pointer hover:font-bold transform-all">
          Your Task
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
