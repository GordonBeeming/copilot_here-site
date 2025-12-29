import { useState } from 'react';
import { Terminal, Shield, Zap, Globe, Copy, Check, Github, Box, Lock, Cpu, Settings } from 'lucide-react';
import './App.css';

function App() {
  const [copied, setCopied] = useState(false);

  const installCommandLinux = "curl -fsSL https://github.com/GordonBeeming/copilot_here/releases/download/cli-latest/install.sh | $SHELL";
  const installCommandWindows = "iex ([System.Text.Encoding]::UTF8.GetString((iwr -UseBasicParsing 'https://github.com/GordonBeeming/copilot_here/releases/download/cli-latest/install.ps1').Content))";

  const [activeTab, setActiveTab] = useState('linux');
  const [installCommand, setInstallCommand] = useState(installCommandLinux);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setInstallCommand(tab === 'linux' ? installCommandLinux : installCommandWindows);
  };

  // Detect OS on mount
  useState(() => {
    if (typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Windows') !== -1) {
      handleTabChange('windows');
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ExternalLink = ({ href, children, className }) => {
    const isTrusted = href.includes('gordonbeeming.com');
    const rel = isTrusted ? "noopener noreferrer" : "noopener noreferrer nofollow";
    
    return (
      <a 
        href={href} 
        target="_blank" 
        rel={rel}
        className={className}
      >
        {children}
      </a>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-primary)] sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <Terminal className="text-[var(--accent-secondary)]" />
            <span>copilot_here</span>
          </div>
          <div className="flex items-center gap-3">
            <ExternalLink 
              href="https://github.com/GordonBeeming/copilot_here/stargazers" 
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://img.shields.io/github/stars/GordonBeeming/copilot_here?style=social" 
                alt="GitHub Stars"
                className="h-6"
              />
            </ExternalLink>
            <ExternalLink 
              href="https://github.com/GordonBeeming/copilot_here" 
              className="text-[var(--text-secondary)] hover:text-white transition-colors"
            >
              <Github size={24} />
            </ExternalLink>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 text-center">
          <div className="container">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"></span>
              <span className="text-[var(--text-secondary)]">New: Airlock Network Isolation + Custom Docker Flags</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Your GitHub Copilot CLI, <br />
              <span className="gradient-text">Securely Sandboxed.</span>
            </h1>
            
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
              Run the GitHub Copilot CLI inside a secure Docker container. 
              Isolated from your system, authenticated with your existing credentials.
            </p>

            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex justify-center gap-4 mb-4">
                <button 
                  onClick={() => handleTabChange('linux')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'linux' ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-white'}`}
                >
                  Linux / macOS
                </button>
                <button 
                  onClick={() => handleTabChange('windows')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'windows' ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-white'}`}
                >
                  Windows (PowerShell)
                </button>
              </div>

              <div className="code-block text-left flex items-start justify-between group">
                <code className="text-sm md:text-base break-all pr-8 text-[var(--accent-secondary)]">
                  {installCommand}
                </code>
                <button 
                  onClick={copyToClipboard}
                  className="text-[var(--text-secondary)] hover:text-white transition-colors p-1"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={20} className="text-[var(--accent-primary)]" /> : <Copy size={20} />}
                </button>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-2 text-center">
                Works on Linux, macOS (Intel/Apple Silicon), and Windows (WSL/PowerShell)
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <ExternalLink href="https://github.com/GordonBeeming/copilot_here" className="btn btn-primary">
                <Github size={20} />
                View on GitHub
              </ExternalLink>
              <a href="#features" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why use copilot_here?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center mb-4 text-[var(--accent-secondary)]">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Isolation</h3>
                <p className="text-[var(--text-secondary)]">
                  Runs in a Docker container that only sees your current directory. 
                  Protect your SSH keys and system files from accidental modification.
                </p>
              </div>

              <div className="card">
                <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center mb-4 text-purple-400">
                  <Cpu size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Network Airlock</h3>
                <p className="text-[var(--text-secondary)]">
                  Advanced network isolation that routes all traffic through an allowlist-enforcing proxy. 
                  Control exactly what endpoints the AI can access on the network.
                </p>
              </div>

              <div className="card">
                <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center mb-4 text-yellow-400">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">YOLO Mode</h3>
                <p className="text-[var(--text-secondary)]">
                  Trust the sandbox? Use <code>copilot_yolo</code> to auto-approve all commands 
                  for a lightning-fast, uninterrupted workflow.
                </p>
              </div>

              <div className="card">
                <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center mb-4 text-blue-400">
                  <Settings size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Custom Sandbox Flags</h3>
                <p className="text-[var(--text-secondary)]">
                  Pass custom Docker flags via <code>SANDBOX_FLAGS</code> for networking, resource limits, and more. 
                  Compatible with <ExternalLink href="https://geminicli.com/docs/cli/sandbox/#custom-sandbox-flags" className="text-[var(--accent-secondary)] hover:underline">Gemini CLI spec</ExternalLink>.
                </p>
              </div>

              <div className="card">
                <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center mb-4 text-[var(--accent-primary)]">
                  <Lock size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Auto-Authentication</h3>
                <p className="text-[var(--text-secondary)]">
                  Seamlessly uses your host machine's <code>gh</code> CLI credentials. 
                  No need to re-login or manage separate tokens.
                </p>
              </div>

              <div className="card">
                <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center mb-4 text-green-400">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Cross-Platform</h3>
                <p className="text-[var(--text-secondary)]">
                  Consistent experience across Linux, macOS, and Windows. 
                  Includes PowerShell Core integration for cross-platform scripting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Available Images Section */}
        <section className="bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Available Images</h2>
            
            {/* Primary Images */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card bg-[var(--bg-tertiary)] border-2 border-[var(--accent-secondary)]">
                <h3 className="text-xl font-bold mb-2 text-white">Base</h3>
                <code className="text-sm block mb-3 text-[var(--accent-secondary)]">latest</code>
                <p className="text-sm text-[var(--text-secondary)]">
                  Node.js 20, Git, essential tools
                </p>
              </div>
              <div className="card bg-[var(--bg-tertiary)] border-2 border-[var(--accent-primary)]">
                <h3 className="text-xl font-bold mb-2 text-white">.NET</h3>
                <code className="text-sm block mb-3 text-[var(--accent-secondary)]">dotnet / dotnet-8 / dotnet-9 / dotnet-10</code>
                <p className="text-sm text-[var(--text-secondary)]">
                  .NET 8, 9 & 10 SDKs (or individual)
                </p>
              </div>
              <div className="card bg-[var(--bg-tertiary)] border-2 border-blue-400">
                <h3 className="text-xl font-bold mb-2 text-white">Playwright</h3>
                <code className="text-sm block mb-3 text-[var(--accent-secondary)]">playwright</code>
                <p className="text-sm text-[var(--text-secondary)]">
                  Browser automation with Chromium
                </p>
              </div>
              <div className="card bg-[var(--bg-tertiary)] border-2 border-orange-400">
                <h3 className="text-xl font-bold mb-2 text-white">Rust</h3>
                <code className="text-sm block mb-3 text-[var(--accent-secondary)]">rust</code>
                <p className="text-sm text-[var(--text-secondary)]">
                  Rust toolchain with cargo & rustc
                </p>
              </div>
            </div>

            {/* Compound Images */}
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-[var(--text-secondary)]">Compound Images</h3>
              <p className="text-sm text-[var(--text-secondary)]">Combine multiple environments in one image</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
                <code className="text-sm block mb-2 text-[var(--accent-secondary)]">dotnet-playwright</code>
                <p className="text-xs text-[var(--text-secondary)]">All .NET SDKs + Playwright browsers</p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
                <code className="text-sm block mb-2 text-[var(--accent-secondary)]">dotnet-rust</code>
                <p className="text-xs text-[var(--text-secondary)]">All .NET SDKs + Rust toolchain</p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-secondary)] transition-colors">
                <div className="text-sm font-semibold mb-2 text-white">Need something else?</div>
                <p className="text-xs text-[var(--text-secondary)]">
                  Have a different toolchain combination? <ExternalLink href="https://github.com/GordonBeeming/copilot_here" className="text-[var(--accent-secondary)] hover:underline">Send us a PR</ExternalLink> to add a new variant!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Flexible Mounts Section */}
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-6 text-center">Flexible Mounts & Configuration</h2>
                <p className="text-lg text-[var(--text-secondary)] mb-6">
                  Need access to more than just the current directory? Securely mount additional paths with granular control.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="text-[var(--accent-primary)] mt-1 flex-shrink-0" size={20} />
                    <span className="text-[var(--text-secondary)]">
                      <strong className="text-white">Read-Only by Default:</strong> Standard mounts are read-only. Use <code>--mount-rw</code> for write access.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[var(--accent-primary)] mt-1 flex-shrink-0" size={20} />
                    <span className="text-[var(--text-secondary)]">
                      <strong className="text-white">Persistent Config:</strong> Use <code>--save-mount</code> or <code>--save-mount-global</code> to persist mounts across runs.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-[var(--accent-primary)] mt-1 flex-shrink-0" size={20} />
                    <span className="text-[var(--text-secondary)]">
                      <strong className="text-white">Unified Help:</strong> Run <code>copilot_here --help</code> to see both the wrapper options and the native Copilot CLI help in one place.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full">
                <div className="code-block text-sm">
                  <div className="text-[var(--text-secondary)] mb-2"># Mount a directory read-only (default)</div>
                  <div className="text-white mb-4">copilot_here --mount ~/documents/notes</div>
                  
                  <div className="text-[var(--text-secondary)] mb-2"># Mount with write access</div>
                  <div className="text-white mb-4">copilot_here --mount-rw ~/logs</div>
                  
                  <div className="text-[var(--text-secondary)] mb-2"># Save a global mount (available everywhere)</div>
                  <div className="text-white mb-4">copilot_here --save-mount-global ~/scripts</div>

                  <div className="text-[var(--text-secondary)] mb-2"># Mount .git read-only for safety</div>
                  <div className="text-white">copilot_here --mount .git</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-6 text-center">How it works</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center font-bold border border-[var(--border-color)]">1</div>
                  <div>
                    <h4 className="font-bold mb-1">You run the command</h4>
                    <p className="text-[var(--text-secondary)]">
                      <code>copilot_here -p "explain this code"</code>
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center font-bold border border-[var(--border-color)]">2</div>
                  <div>
                    <h4 className="font-bold mb-1">Container Starts</h4>
                    <p className="text-[var(--text-secondary)]">
                      A lightweight Docker container spins up, mounting <strong>only</strong> your current directory to <code>/work</code>.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center font-bold border border-[var(--border-color)]">3</div>
                  <div>
                    <h4 className="font-bold mb-1">Magic Happens</h4>
                    <p className="text-[var(--text-secondary)]">
                      Copilot analyzes your code and executes commands safely inside the container. 
                      If it tries to delete everything, your system stays safe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-[var(--bg-secondary)] p-8 rounded-lg border border-[var(--border-color)] font-mono text-sm">
              <div className="text-[var(--text-secondary)] mb-2"># Interactive Session</div>
              <div className="text-green-400">$ copilot_here</div>
              <div className="text-blue-400 my-2">
                Welcome to Copilot Here!<br/>
                Running in: /Users/gordon/projects/my-app<br/>
                Image: ghcr.io/gordonbeeming/copilot_here:latest
              </div>
              <div className="text-[var(--text-primary)]">
                &gt; How do I list all files larger than 10MB?
              </div>
              <div className="text-[var(--text-secondary)] mt-4 mb-2"># Copilot suggests:</div>
              <div className="bg-[var(--bg-primary)] p-3 rounded border border-[var(--border-color)]">
                find . -type f -size +10M
              </div>
              <div className="text-yellow-400 mt-2">
                ? Execute this command? (Y/n)
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Supported Systems */}
        <section className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">💻 Supported Systems</h2>
            <div className="max-w-4xl mx-auto bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
                  <tr>
                    <th className="px-6 py-3 text-left">Operating System</th>
                    <th className="px-6 py-3 text-left">Shell</th>
                    <th className="px-6 py-3 text-center">Supported</th>
                    <th className="px-6 py-3 text-center">Tested</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  <tr>
                    <td className="px-6 py-4 font-medium">macOS</td>
                    <td className="px-6 py-4">Zsh</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">macOS</td>
                    <td className="px-6 py-4">Bash</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="px-6 py-4 text-center"></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Linux</td>
                    <td className="px-6 py-4">Bash</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="px-6 py-4 text-center"></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Linux</td>
                    <td className="px-6 py-4">Zsh</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="px-6 py-4 text-center"></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Windows 10/11</td>
                    <td className="px-6 py-4">PowerShell 5.1</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Windows 10/11</td>
                    <td className="px-6 py-4">PowerShell 7+</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-6 max-w-3xl mx-auto">
              <strong>Note:</strong> "Tested" represents systems personally tested. The tool likely works on other compatible systems too—if you successfully use it on an untested configuration, please let us know!
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-12">From the Blog</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <blockquote className="bg-[var(--bg-primary)] p-6 rounded-lg border border-[var(--border-color)] text-left flex flex-col h-full">
                <p className="text-lg mb-4 italic flex-grow">
                  "November 2025 is a massive release... Native ARM64 support for Apple Silicon, 
                  .NET 10 SDKs, PowerShell Core integration, plus the game-changing Airlock network isolation feature."
                </p>
                <footer className="text-[var(--text-secondary)] mt-4">
                  <ExternalLink 
                    href="https://gordonbeeming.com/blog/2025-11-28/copilot-cli-in-docker-november-2025-updates-arm64-dotnet-10-and-flexible-mounts"
                    className="text-[var(--accent-secondary)] hover:underline"
                  >
                    — November Updates (Nov 2025)
                  </ExternalLink>
                </footer>
              </blockquote>

              <blockquote className="bg-[var(--bg-primary)] p-6 rounded-lg border border-[var(--border-color)] text-left flex flex-col h-full">
                <p className="text-lg mb-4 italic flex-grow">
                  "October 2025 brought a wave of improvements... Auto-Updating Scripts, Quick Install Method, 
                  and Argument Pass-Through for native Copilot features."
                </p>
                <footer className="text-[var(--text-secondary)] mt-4">
                  <ExternalLink 
                    href="https://gordonbeeming.com/blog/2025-10-28/copilot-cli-in-docker-october-2025-updates-auto-updates-cross-platform-support-and-more"
                    className="text-[var(--accent-secondary)] hover:underline"
                  >
                    — October Updates (Oct 2025)
                  </ExternalLink>
                </footer>
              </blockquote>

              <blockquote className="bg-[var(--bg-primary)] p-6 rounded-lg border border-[var(--border-color)] text-left flex flex-col h-full">
                <p className="text-lg mb-4 italic flex-grow">
                  "I wanted the power of Copilot without giving it the keys to my entire kingdom. 
                  The goal was to use powerful features like --allow-all-tools with more confidence."
                </p>
                <footer className="text-[var(--text-secondary)] mt-4">
                  <ExternalLink 
                    href="https://gordonbeeming.com/blog/2025-10-03/taming-the-ai-my-paranoid-guide-to-running-copilot-cli-in-a-secure-docker-sandbox"
                    className="text-[var(--accent-secondary)] hover:underline"
                  >
                    — Taming the AI (Oct 2025)
                  </ExternalLink>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--border-color)] text-center text-[var(--text-secondary)]">
        <div className="container">
          <p className="mb-4">
            Built with ❤️ by <ExternalLink href="https://github.com/GordonBeeming" className="text-[var(--accent-secondary)] hover:underline">Gordon Beeming</ExternalLink>
          </p>
          <div className="flex justify-center gap-6">
            <ExternalLink href="https://github.com/GordonBeeming/copilot_here" className="hover:text-white transition-colors">GitHub</ExternalLink>
            <ExternalLink href="https://gordonbeeming.com" className="hover:text-white transition-colors">Blog</ExternalLink>
            <ExternalLink href="https://github.com/features/copilot/cli" className="hover:text-white transition-colors">Copilot CLI</ExternalLink>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
