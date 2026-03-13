This is a bun monorepo with workspaces.
Run commands from root with bun run --filter (filter) or from specific package directories.
Before pushing: bun run build && bun run typecheck && bun run lint && bun run test.
Always build packages before running dependent packages.
