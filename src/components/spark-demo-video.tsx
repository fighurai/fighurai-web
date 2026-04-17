"use client";

import { useCallback, useState } from "react";

type SparkDemoVideoProps = {
  /** Small label above the title (e.g. “Demo”) */
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  headingId?: string;
};

/** Local files in `public/videos/` */
const SRC_MP4 = "/videos/sparky-demo.mp4";
const SRC_MOV = "/videos/sparky-demo.mov";

/** Optional: full HTTPS URL to an MP4 (set in .env.local / Vercel). Overrides local files when set. */
function membershipDemoSrc(): { mode: "remote"; url: string } | { mode: "local" } {
  const raw =
    typeof process.env.NEXT_PUBLIC_MEMBERSHIP_DEMO_VIDEO_URL === "string"
      ? process.env.NEXT_PUBLIC_MEMBERSHIP_DEMO_VIDEO_URL.trim()
      : "";
  if (raw && /^https:\/\//i.test(raw)) {
    return { mode: "remote", url: raw };
  }
  return { mode: "local" };
}

export function SparkDemoVideo({
  eyebrow = "Demo",
  title = "Applications",
  description = "This clip is an example of the kind of application we can design and build for you — software shaped around your workflows, not a generic template. Use it as a reference when you think about what ongoing support or a scoped build could look like for your team.",
  className = "",
  headingId = "membership-applications-demo-heading",
}: SparkDemoVideoProps) {
  const [loadError, setLoadError] = useState(false);
  const srcConfig = membershipDemoSrc();

  const handleVideoError = useCallback(() => {
    setLoadError(true);
  }, []);

  return (
    <section className={`${className}`.trim()} aria-labelledby={headingId}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-white/[0.08] bg-[var(--bg-elevated)]/95 p-6 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.06] sm:p-8">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-2 font-display text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            {description}
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.1] bg-black/40 ring-1 ring-white/[0.05]">
            <video
              key={srcConfig.mode === "remote" ? srcConfig.url : "local-files"}
              className="aspect-video w-full max-h-[70vh] object-contain"
              controls
              playsInline
              preload="metadata"
              onError={handleVideoError}
            >
              {srcConfig.mode === "remote" ? (
                <source src={srcConfig.url} type="video/mp4" />
              ) : (
                <>
                  <source src={SRC_MP4} type="video/mp4" />
                  <source src={SRC_MOV} type="video/quicktime" />
                </>
              )}
            </video>
            {loadError ? (
              <div className="border-t border-white/[0.06] px-4 py-3 text-center text-xs text-amber-200/90">
                {srcConfig.mode === "remote" ? (
                  <>
                    Couldn’t load the video from your URL. Check that{" "}
                    <code className="break-all text-[var(--accent)]">{srcConfig.url}</code> is public, allows
                    range requests, and is MP4 (H.264).
                  </>
                ) : (
                  <>
                    Video didn’t load — add{" "}
                    <code className="text-[var(--accent)]">public/videos/sparky-demo.mp4</code> to the
                    project and redeploy, or set{" "}
                    <code className="text-[var(--accent)]">NEXT_PUBLIC_MEMBERSHIP_DEMO_VIDEO_URL</code> to a
                    full HTTPS link to your MP4. Convert:{" "}
                    <code className="mt-1 block break-all text-[var(--text-muted)]">
                      ffmpeg -i YourClip.mov -c:v libx264 -crf 23 -c:a aac -movflags +faststart sparky-demo.mp4
                    </code>
                  </>
                )}
              </div>
            ) : null}
          </div>
          <p className="mt-3 text-center text-[0.65rem] text-[var(--text-faint)]">
            Sparky — sample build shown for illustration; your scope and stack would be defined together.
            {srcConfig.mode === "local" ? (
              <>
                {" "}
                Replace <code className="text-[var(--text-muted)]">public/videos/sparky-demo.mp4</code> with
                your own export (e.g. CapCut <code className="text-[var(--text-muted)]">0417.mp4</code>)
                whenever you’re ready.
              </>
            ) : null}
          </p>
        </div>
      </div>
    </section>
  );
}
