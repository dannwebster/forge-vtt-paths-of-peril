Bump the patch version of this Foundry VTT module and publish a new GitHub release.

Steps:
1. Read `paths-of-peril/module.json` and find the current `"version"` field (e.g. `"0.1.0"`).
2. Increment the patch number by 1 (e.g. `0.1.0` → `0.1.1`). Never change major or minor.
3. Write the new version string back into `paths-of-peril/module.json`.
4. Stage and commit: `git add paths-of-peril/module.json` then commit with message `Bump version to v{new_version}`.
5. Create a tag: `git tag v{new_version}`
6. Push the commit and the tag: `git push` then `git push origin v{new_version}`

The tag push triggers the GitHub Actions release workflow, which zips the module and publishes it automatically. Report the new version number when done.
