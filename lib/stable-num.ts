export function stableNum(seed: string, min: number, max: number) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  return min + (Math.abs(h) % (max - min + 1))
}
