export const useGameConfig = () => {
  const gameVersion = useCookie("mc-game-version", { default: () => "latest" });
  const modLoader = useCookie("mc-mod-loader", { default: () => "null" });

  const gameVersions = computed(() => []);
  const modLoaders = computed(() => []);

  return {
    gameVersion,
    gameVersions,

    modLoader,
    modLoaders,
  };
};
