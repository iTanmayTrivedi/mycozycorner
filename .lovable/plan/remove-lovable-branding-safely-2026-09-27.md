# Remove Lovable branding safely

## Scope
- Remove every case-insensitive `Lovable` reference from source, comments, filenames, documentation, configuration, and dependency metadata.
- Preserve the portfolio’s appearance, interactions, error handling, development preview, and production build behavior.

## Changes
1. Rename the branded error-reporting module, types, and function to generic telemetry names while retaining the existing platform event hook through computed property access so error reporting still works without a branded identifier in the source.
2. Replace the branded Vite preset with equivalent standard TanStack Start, React, Tailwind, path-alias, and deployment configuration; remove its package and supply-chain exceptions.
3. Remove branded repository metadata and ignore entries, and replace the README live-site URL with the project’s custom portfolio domain. No visual content or application design will change.
4. Regenerate dependency metadata, then scan filenames and file contents to ensure no references remain.
5. Validate the build, inspect runtime diagnostics, and open the portfolio at desktop and mobile sizes to confirm design and functionality remain intact.

## Technical notes
- Platform compatibility is preserved through generic configuration and a generic telemetry adapter rather than deleting behavior.
- Generated dependency metadata may change solely because the branded build preset is removed.
