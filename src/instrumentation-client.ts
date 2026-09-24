// Client-side Sentry setup. The actual configuration is in src/lib/sentry-client.ts.
// Kids-only deployments (NEXT_PUBLIC_KIDS_ONLY=1) never load Sentry in the browser:
// no replay or data about minors is sent to third parties, and the page loads
// about 350 KB less JavaScript.

type TransitionHandler = (href: string, navigationType: "push" | "replace" | "traverse") => void;

let transitionHandler: TransitionHandler | undefined;

if (process.env.NEXT_PUBLIC_KIDS_ONLY !== "1") {
  import("./lib/sentry-client").then((m) => {
    transitionHandler = m.onRouterTransitionStart as TransitionHandler;
  });
}

export function onRouterTransitionStart(href: string, navigationType: "push" | "replace" | "traverse") {
  transitionHandler?.(href, navigationType);
}
