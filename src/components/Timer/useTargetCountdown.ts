import { useSeconds } from 'use-seconds'

/**
 * 'HH:MM' の目標時刻 (端末ローカル) までの残り ms を毎秒返す。
 * 目標が過ぎていれば翌日の同時刻へ回すので、常に正のカウントダウンになる。
 */
export function useTargetCountdown(targetTime: string) {
  const [now] = useSeconds()

  if (!targetTime) return { remaining: 0, active: false }
  const [h, m] = targetTime.split(':').map((n) => parseInt(n, 10))

  if (Number.isNaN(h) || Number.isNaN(m)) return { remaining: 0, active: false }
  const target = new Date(now)

  target.setHours(h, m, 0, 0)
  let remaining = target.getTime() - now.getTime()

  if (remaining < 0) remaining += 24 * 60 * 60 * 1000

  return { remaining, active: true }
}
