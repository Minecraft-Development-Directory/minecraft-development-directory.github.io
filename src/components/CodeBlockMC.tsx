interface CodeBlockMCProps {
  children: string;
  language?: 'java' | 'json' | 'gradle' | 'toml' | 'yaml' | 'mcfunction' | 'mcmeta';
  title?: string;
  mod?: 'forge' | 'fabric' | 'quilt' | 'neoforge';
  version?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

export function CodeBlockMC({ 
  children, 
  language = 'java', 
  title, 
  mod,
  version,
  showLineNumbers = false,
  highlightLines = []
}: CodeBlockMCProps) {
  const lines = children.split('\n');
  
  const modColors = {
    forge: 'bg-blue-600',
    fabric: 'bg-green-600', 
    quilt: 'bg-purple-600',
    neoforge: 'bg-orange-600'
  };

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      {(title || mod || version) && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {title && <span className="font-medium text-sm">{title}</span>}
            {mod && (
              <span className={`px-2 py-1 rounded text-xs text-white font-medium ${modColors[mod]}`}>
                {mod.charAt(0).toUpperCase() + mod.slice(1)}
              </span>
            )}
          </div>
          {version && (
            <span className="text-xs text-gray-500 font-mono">MC {version}</span>
          )}
        </div>
      )}
      <pre className="bg-gray-50 dark:bg-gray-900 p-4 overflow-x-auto">
        <code className={`language-${language} font-mono text-sm`}>
          {showLineNumbers ? (
            lines.map((line, index) => (
              <div 
                key={index}
                className={`flex ${highlightLines.includes(index + 1) ? 'bg-yellow-100 dark:bg-yellow-900/20' : ''}`}
              >
                <span className="mr-4 text-gray-400 select-none w-8 text-right">
                  {index + 1}
                </span>
                <span>{line}</span>
              </div>
            ))
          ) : (
            children
          )}
        </code>
      </pre>
    </div>
  );
}