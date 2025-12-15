import React from "react";
import { Link } from "react-router-dom";

function UnderConstruction() {
  return (
    <div className="min-h-screen bg-black dark:bg-gray-900 flex items-center justify-center text-white relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/30 via-black to-cyan-900/30 blur-3xl" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.05)_96%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.05)_96%)] bg-size:40px_40px" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-12">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">
          System Status
        </p>

        <h1 className="mt-4 text-5xl md:text-7xl font-extrabold bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          UNDER CONSTRUCTION
        </h1>

        <p className="mt-6 max-w-xl mx-auto text-gray-400 text-lg">
          This sector of the universe is still being engineered. Our developers are bending spacetime to finish it.
        </p>

        {/* Fake terminal */}
        <div className="mt-8 mx-auto max-w-md bg-black/60 border border-cyan-500/30 rounded-lg p-4 text-left font-mono text-sm text-cyan-300">
          <p>&gt; initializing modules...</p>
          <p>&gt; compiling reality.js</p>
          <p>&gt; status: <span className="text-yellow-400">in progress</span></p>
        </div>

        {/* Actions */}
        <div className="mt-10 flex justify-center gap-6">
          <Link
            to="/"
            className="px-6 py-3 rounded-md bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
          >
            Go Home
          </Link>

          <Link
            to="/subscriptions"
            className="px-6 py-3 rounded-md border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black transition"
          >
            Subscriptions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnderConstruction;
