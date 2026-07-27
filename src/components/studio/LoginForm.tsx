'use client'

import { useActionState } from 'react'
import { login, type ActionState } from '@/app/(studio)/studio/actions'

export function LoginForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(login, {})

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-stone">Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3 text-[0.95rem] text-ink outline-none focus:border-gold"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-stone">Password</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3 text-[0.95rem] text-ink outline-none focus:border-gold"
        />
      </div>

      {state.error && <p className="rounded-lg bg-terracotta/10 px-4 py-2.5 text-sm text-terracotta">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-espresso disabled:opacity-50"
      >
        {pending ? 'Signing in…' : 'Enter the studio'}
      </button>
    </form>
  )
}
