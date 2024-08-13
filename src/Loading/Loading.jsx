import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center">
      <img className="w-48 h-48 -mb-12" src="/load10.gif" alt="Loading" />
      <span>Loading Weather info for your location . .</span>
    </div>
  );
}

export default Loading;
