import { Octokit } from "octokit"

const owner = "minecraft-development-directory"
const repo = "minecraft-development-directory.github.io"

export interface Module {
  stats: {
    downloads: number
    stars: number
  }
  contributors: Array<{ username: string }>
}

export default defineCachedEventHandler(
  async () => {
    const octokit = new Octokit()

    const res = await octokit.rest.repos.listContributors({
      owner,
      repo,
      per_page: 100,
    })

    const contributors = res.data.map(contributor => ({
      username: contributor.name || contributor.login,
    }))

    return {
      contributors,
    }
  },
  {
    maxAge: 60 * 60, // 1 hour
    getKey: () => "module",
  },
)
