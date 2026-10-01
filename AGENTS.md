> [!IMPORTANT]
> This project is connected to a visual development platform. Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites synchronized history and the
> user will likely lose their project history.
>
> Commits pushed to the connected branch sync back to the visual editor, so keep
> the branch in a working state.

- Keep the standard TanStack Start, Tailwind, React, and Nitro plugins explicit in `vite.config.ts` so builds remain vendor-neutral and deployable.
