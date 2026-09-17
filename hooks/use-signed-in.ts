"use client"

import { useEffect, useState } from "react"

/** The flag app.whoza.ai leaves on the shared .whoza.ai domain while someone is signed in. */
export const SIGNED_IN_COOKIE = "whoza_signed_in"

/** Where a signed-in visitor goes. The app's root opens their dashboard, or the setup wizard if
 *  they have not finished it, so this site never needs to know which. */
export const APP_HOME_URL = "https://app.whoza.ai/"

export function hasSignedInCookie(cookieString: string): boolean {
  return cookieString
    .split(";")
    .some((part) => part.trim() === `${SIGNED_IN_COOKIE}=1`)
}

/**
 * Whether this browser is signed in to the app.
 *
 * The session itself lives on app.whoza.ai, which this site cannot read, so the app leaves a
 * plain flag cookie both can see. It carries no token and unlocks nothing: a stale flag only
 * means "Dashboard" lands on the app's login card instead of the dashboard.
 *
 * Always false on the server and on the first client render, then corrected after mount, so the
 * served HTML (and what search engines see) is the signed-out header and hydration never
 * disagrees with it.
 */
export function useSignedIn(): boolean {
  const [signedIn, setSignedIn] = useState(false)
  useEffect(() => {
    try {
      setSignedIn(hasSignedInCookie(document.cookie))
    } catch {
      // Cookies unavailable: keep the signed-out header, which still works.
    }
  }, [])
  return signedIn
}
