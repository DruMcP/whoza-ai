// Google Preferred Sources button.
// Renders Google's own interactive control, which is auto-translated and
// styled by Google. The script is loaded once in app/layout.tsx.
//
// Google's script injects an iframe with `display: block; width: 100%`, which
// ignores the wrapper's `text-center`. The `mx-auto max-w-[280px]` container
// constrains that iframe so the button sits under its own label.
// Docs: https://developers.google.com/search/docs/appearance/preferred-sources

export function PreferredSourceButton({ label }: { label?: string }) {
  return (
    <div className="mt-12 pt-8 border-t border-white/10 text-center">
      {label && <p className="text-white/50 text-sm mb-4">{label}</p>}
      <div className="mx-auto max-w-[280px]">
        <div google-add-preferred-source-btn="" data-theme="dark" />
      </div>
    </div>
  )
}
