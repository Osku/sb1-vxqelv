import React from 'react';
import { BookOpen } from 'lucide-react';

interface Pattern {
  name: string;
  pattern: string;
  description: string;
}

interface CommonPatternsProps {
  patterns: Pattern[];
  onSelect: (pattern: string) => void;
}

export function CommonPatterns({ patterns, onSelect }: CommonPatternsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Common Patterns</h2>
      </div>
      <div className="grid gap-3">
        {patterns.map((pattern, index) => (
          <button
            key={index}
            onClick={() => onSelect(pattern.pattern)}
            className="text-left p-3 rounded-lg hover:bg-indigo-50 transition-colors border border-gray-200 hover:border-indigo-200"
          >
            <h3 className="font-medium text-gray-800">{pattern.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{pattern.description}</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">{pattern.pattern}</code>
          </button>
        ))}
      </div>
    </div>
  );
}