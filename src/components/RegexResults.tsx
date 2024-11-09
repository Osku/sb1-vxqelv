import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface RegexResultsProps {
  isValid: boolean;
  error: string | null;
  matches: RegExpMatchArray[];
  testString: string;
}

export function RegexResults({ isValid, error, matches, testString }: RegexResultsProps) {
  const highlightMatches = () => {
    if (!isValid || error || matches.length === 0) return testString;

    let result = testString;
    let offset = 0;

    matches.forEach((match) => {
      if (match.index === undefined) return;
      
      const start = match.index + offset;
      const end = start + match[0].length;
      const highlighted = `<mark class="bg-green-200 rounded px-1">${match[0]}</mark>`;
      
      result = result.slice(0, start) + highlighted + result.slice(end);
      offset += highlighted.length - match[0].length;
    });

    return result;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        {isValid ? (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        ) : (
          <AlertCircle className="w-6 h-6 text-red-500" />
        )}
        <h2 className="text-xl font-semibold text-gray-800">Results</h2>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-700">{error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Matches Found: {matches.length}</h3>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: highlightMatches() }}
            />
          </div>
          
          {matches.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Match Details:</h3>
              <div className="space-y-2">
                {matches.map((match, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Match {index + 1}:</p>
                    <p className="font-mono text-sm">{JSON.stringify(match, null, 2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}