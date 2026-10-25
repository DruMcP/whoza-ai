// Google Preferred Sources button.
// Renders Google's own interactive control, which is auto-translated and
// styled by Google. PreferredSourceScript loads Google's script after consent.
//
// Google's script injects an iframe with `display: block; width: 100%`, which
// ignores the wrapper's `text-center`. The `mx-auto max-w-[280px]` container
// constrains that iframe so the button sits under its own label.
// Docs: https://developers.google.com/search/docs/appearance/preferred-sources

import { PreferredSourceScript } from "./preferred-source-script"

export function PreferredSourceButton({ label }: { label?: string }) {
  return (
    <div className="mt-12 pt-8 border-t border-[var(--v2-line)] text-center">
      {label && <p className="text-[var(--v2-muted)] text-sm mb-4">{label}</p>}
      <div className="mx-auto max-w-[280px]">
        <div google-add-preferred-source-btn="" data-theme="light" />
      </div>
      <PreferredSourceScript />
    </div>
  )
}
