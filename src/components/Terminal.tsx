"use client";

import { useState } from "react";

type TabKey = "curl" | "fedora" | "arch" | "homebrew" | "source";

const installCommands: Record<TabKey, { label: string; commands: string[] }> = {
  curl: {
    label: "curl",
    commands: ["curl -fsSL https://fortsh.musicsian.com/install.sh | bash"],
  },
  fedora: {
    label: "Fedora/RHEL",
    commands: [
      "sudo dnf config-manager --add-repo https://repos.musicsian.com/musicsian.repo",
      "sudo dnf install fortsh",
    ],
  },
  arch: {
    label: "Arch (AUR)",
    commands: ["yay -S fortsh", "# or: paru -S fortsh"],
  },
  homebrew: {
    label: "Homebrew",
    commands: ["brew install FortranGoingOnForty/tap/fortsh"],
  },
  source: {
    label: "Source",
    commands: [
      "git clone https://github.com/fortrangoingonforty/fortsh.git",
      "cd fortsh && make && sudo make install",
    ],
  },
};

export default function Terminal() {
  const [activeTab, setActiveTab] = useState<TabKey>("curl");

  const copyToClipboard = () => {
    const commands = installCommands[activeTab].commands
      .filter((cmd) => !cmd.startsWith("#"))
      .join("\n");
    navigator.clipboard.writeText(commands);
  };

  return (
    <div className="terminal text-left">
      {/* Terminal header with tabs */}
      <div className="terminal-header">
        <div className="flex gap-1.5">
          <span className="terminal-dot bg-red-500" />
          <span className="terminal-dot bg-yellow-500" />
          <span className="terminal-dot bg-green-500" />
        </div>
        <div className="flex-1 flex gap-1 ml-4 overflow-x-auto">
          {(Object.keys(installCommands) as TabKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeTab === key
                  ? "bg-surface-700 text-surface-100"
                  : "text-surface-400 hover:text-surface-200 hover:bg-surface-800"
              }`}
            >
              {installCommands[key].label}
            </button>
          ))}
        </div>
        <button
          onClick={copyToClipboard}
          className="text-surface-400 hover:text-surface-200 text-xs px-2"
          title="Copy to clipboard"
        >
          Copy
        </button>
      </div>

      {/* Terminal content */}
      <div className="terminal-content">
        {installCommands[activeTab].commands.map((cmd, i) => (
          <div key={i} className="flex">
            {!cmd.startsWith("#") && (
              <span className="text-green-500 mr-2 select-none">$</span>
            )}
            <code
              className={
                cmd.startsWith("#") ? "text-surface-500" : "text-surface-100"
              }
            >
              {cmd}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}
