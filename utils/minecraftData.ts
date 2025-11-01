/**
 * Minecraft mod loaders registry
 */
export const MOD_LOADERS = ["fabric", "forge", "neoforge"] as const;
export type ModLoader = (typeof MOD_LOADERS)[number];

/**
 * Minecraft versions registry
 * Organized by major version for easier maintenance
 */
export const MINECRAFT_VERSIONS = {
  "1.21": ["1.21.3", "1.21.2", "1.21.1", "1.21"],
  "1.20": ["1.20.6", "1.20.5", "1.20.4", "1.20.3", "1.20.2", "1.20.1", "1.20"],
  "1.19": ["1.19.4", "1.19.3", "1.19.2", "1.19.1", "1.19"],
  "1.18": ["1.18.2", "1.18.1", "1.18"],
  "1.17": ["1.17.1", "1.17"],
  "1.16": ["1.16.5", "1.16.4", "1.16.3", "1.16.2", "1.16.1", "1.16"],
} as const;

/**
 * Flattened array of all Minecraft versions
 */
export const ALL_MINECRAFT_VERSIONS = Object.values(MINECRAFT_VERSIONS).flat();
export type MinecraftVersion = (typeof ALL_MINECRAFT_VERSIONS)[number];

/**
 * Helper to check if a mod loader is valid
 */
export function isValidModLoader(loader: string): loader is ModLoader {
  return MOD_LOADERS.includes(loader as ModLoader);
}

/**
 * Helper to check if a Minecraft version is valid
 */
export function isValidMinecraftVersion(
  version: string
): version is MinecraftVersion {
  return ALL_MINECRAFT_VERSIONS.includes(version as MinecraftVersion);
}
