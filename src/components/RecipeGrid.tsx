interface RecipeItem {
  item: string;
  count?: number;
}

interface RecipeGridProps {
  recipe: (RecipeItem | null)[][];
  result: RecipeItem;
  type?: 'crafting' | 'smelting' | 'brewing';
}

export function RecipeGrid({ recipe, result, type = 'crafting' }: RecipeGridProps) {
  const renderItem = (item: RecipeItem | null) => {
    if (!item) {
      return <div className="w-8 h-8 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800"></div>;
    }
    
    return (
      <div className="w-8 h-8 border border-gray-300 dark:border-gray-600 bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xs font-mono relative">
        {item.item}
        {item.count && item.count > 1 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px]">
            {item.count}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800 my-4">
      <div className="space-y-1">
        {recipe.map((row, i) => (
          <div key={i} className="flex gap-1">
            {row.map((item, j) => (
              <div key={j}>{renderItem(item)}</div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-2xl">→</span>
        <div className="flex items-center gap-2">
          {renderItem(result)}
          <span className="font-mono text-sm">{result.item}</span>
          {result.count && result.count > 1 && (
            <span className="text-sm text-gray-600 dark:text-gray-400">×{result.count}</span>
          )}
        </div>
      </div>
    </div>
  );
}