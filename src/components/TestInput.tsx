import React from 'react';

interface TestInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TestInput({ value, onChange }: TestInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Test String</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter text to test..."
      />
    </div>
  );
}