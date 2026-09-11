/**
 * The Whoza logotype — the real one, ported from app.whoza.ai.
 *
 * The header rendered the words "Whoza.ai" in bold Inter, which is a brand name typed out
 * rather than a logo. This is the actual mark: the wordmark in heavy oblique with the lime
 * lightning bolt cutting behind "za".
 *
 * A server component with no state, so it is in the served HTML like the rest of the header.
 */
interface Props {
  /** "light" for dark grounds (white lettering), "dark" for light grounds. */
  colorMode?: "light" | "dark"
  className?: string
}

export function Logo({ colorMode = "light", className = "" }: Props) {
  const lettering = colorMode === "light" ? "#ffffff" : "#0f172a"
  // The gradient id must be unique per render or a second instance on the page reuses the
  // first one's definition, which breaks when either is removed from the DOM.
  const gradientId = `whoza-bolt-${colorMode}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 80"
      role="img"
      aria-label="Whoza.ai"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="5%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%" stopColor="#bef264" />
          <stop offset="25%" stopColor="#a3e635" />
          <stop offset="70%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#4d7c0f" />
        </linearGradient>
      </defs>

      {/* The bolt, passing obliquely behind "za". */}
      <polygon
        points="146,14 118,43 131,43 97,71 123,40 109,40"
        fill={`url(#${gradientId})`}
        style={{ filter: "drop-shadow(0px 2px 4px rgba(132, 204, 22, 0.2))" }}
      />

      {/* Plus Jakarta Sans is the display face; Inter is the site's own and stands in cleanly
          at this weight if the display face has not loaded yet. */}
      <text
        x="12"
        y="53"
        fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="40"
        fill={lettering}
        letterSpacing="-1.5"
      >
        whoza.ai
      </text>
    </svg>
  )
}
