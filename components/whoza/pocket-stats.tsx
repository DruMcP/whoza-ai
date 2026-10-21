import { Newsreader } from "next/font/google"

/*
 * "Every job, in your pocket." band that follows the hero, modelled on the
 * original app.whoza.ai landing page: serif headline on the left, three large
 * figures on the right, on the same #effdf4 mint the hero ends on, so the
 * hand-held phone flows straight into it.
 */

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
})

const stats = [
  { value: "24/7", label: "Always on" },
  { value: "100%", label: "Qualified" },
  { value: "10x", label: "Faster" },
]

export function PocketStats() {
  return (
    <section className="bg-[#effdf4] py-16 sm:py-24" aria-labelledby="pocket-heading">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div className="max-w-[460px]">
          <h2
            id="pocket-heading"
            className={`${serif.className} text-[clamp(36px,4.4vw,52px)] font-medium leading-[1.08] tracking-[-0.01em] text-[#0d1420] mb-3`}
          >
            Every job,
            <br />
            in your pocket.
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-slate-500">
            Leads land straight on your WhatsApp, ready to accept, call back or decline.
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-6 sm:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="font-sans text-sm sm:text-base text-slate-500 mt-1">{s.label}</dt>
              <dd className="font-sans text-[clamp(32px,4.2vw,52px)] font-bold leading-none tracking-[-0.03em] text-[#0d1326] m-0">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
