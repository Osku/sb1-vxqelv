import React from 'react';
import { Copy } from 'lucide-react';

interface RegexInputProps {
  pattern: string;
  flags: string;
  onPatternChange: (value: string) => void;
  onFlagsChange: (value: string) => void;
}

export function RegexInput({ pattern, flags, onPatternChange, onFlagsChange }: RegexInputProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pattern);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pattern</label>
        <div className="relative">
          <input
            type="text"
            value={pattern}
            onChange={(e) => onPatternChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter regex pattern..."
          />
          <button
            onClick={handleCopy}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
        {copied && (
          <span className="text-sm text-green-600 mt-1">Copied to clipboard!</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Flags</label>
        <input
          type="text"
          value={flags}
          onChange={(e) => onFlagsChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="g, i, m, s, u, y"
        />
      </div>
    </div>
  );
}