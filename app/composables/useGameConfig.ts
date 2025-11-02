import {
  MINECRAFT_VERSIONS,
  MOD_LOADERS,
  type MinecraftVersion,
  type ModLoader,
} from "~~/utils/minecraftData"

export const useGameConfig = () => {
  const gameVersion = useCookie<MinecraftVersion>("mc-game-version", {
    default: () => "1.21.3",
  })
  const modLoader = useCookie<ModLoader>("mc-mod-loader", {
    default: () => "forge",
  })

  const gameVersions = computed(() => MINECRAFT_VERSIONS)
  const modLoaders = computed(() => MOD_LOADERS)

  return {
    gameVersion,
    gameVersions,

    modLoader,
    modLoaders,
  }
}
