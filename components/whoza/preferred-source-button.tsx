// Google Preferred Sources button.
// Renders Google's own interactive control, which is auto-translated and
// styled by Google. The script is loaded once in app/layout.tsx.
// Docs: https://developers.google.com/search/docs/appearance/preferred-sources

export function PreferredSourceButton({ label }: { label?: string }) {
  return (
    <div className="mt-12 pt-8 border-t border-white/10 text-center">
      {label && <p className="text-white/50 text-sm mb-4">{label}</p>}
      <div google-add-preferred-source-btn="" data-theme="dark" />
    </div>
  )
}
