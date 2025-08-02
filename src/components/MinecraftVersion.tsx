interface MinecraftVersionProps {
  version: string;
  type?: 'release' | 'snapshot' | 'beta' | 'alpha';
  supported?: boolean;
  children?: React.ReactNode;
}

export function MinecraftVersion({ version, type = 'release', supported = true, children }: MinecraftVersionProps) {
  const typeStyles = {
    release: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
    snapshot: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
    beta: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
    alpha: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300'
  };

  const typeIcons = {
    release: '🟢',
    snapshot: '🟡',
    beta: '🔵',
    alpha: '🔴'
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-sm ${typeStyles[type]} ${!supported ? 'opacity-50' : ''}`}>
      <span>{typeIcons[type]}</span>
      <span>{version}</span>
      {!supported && <span title="Non supporté">⚠️</span>}
      {children}
    </div>
  );
}