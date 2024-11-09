import React, { useState, useMemo } from 'react';
import { Code2 } from 'lucide-react';
import { RegexInput } from './components/RegexInput';
import { TestInput } from './components/TestInput';
import { RegexResults } from './components/RegexResults';
import { CommonPatterns } from './components/CommonPatterns';

const commonPatterns = [
  { 
    name: 'Email', 
    pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
    description: 'Matches valid email addresses'
  },
  { 
    name: 'URL', 
    pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    description: 'Matches URLs'
  },
  { 
    name: 'Phone (US)', 
    pattern: '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$',
    description: 'Matches US phone numbers'
  },
  { 
    name: 'Strong Password', 
    pattern: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$',
    description: 'Minimum 8 characters, at least one letter, one number, and one special character'
  }
];

function App() {
  const [pattern, setPattern] = useState('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
  const [testString, setTestString] = useState('test@example.com');
  const [flags, setFlags] = useState('g');

  const { isValid, matches, error } = useMemo(() => {
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [...testString.matchAll(regex)];
      return { isValid: true, matches, error: null };
    } catch (e) {
      return { isValid: false, matches: [], error: (e as Error).message };
    }
  }, [pattern, testString, flags]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Code2 className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Regex Checker</h1>
          </div>

          <div className="space-y-6">
            <RegexInput
              pattern={pattern}
              flags={flags}
              onPatternChange={setPattern}
              onFlagsChange={setFlags}
            />
            <TestInput value={testString} onChange={setTestString} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegexResults
            isValid={isValid}
            error={error}
            matches={matches}
            testString={testString}
          />
          <CommonPatterns
            patterns={commonPatterns}
            onSelect={setPattern}
          />
        </div>
      </div>
    </div>
  );
}

export default App;