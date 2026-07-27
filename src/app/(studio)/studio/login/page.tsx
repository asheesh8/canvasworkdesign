import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/studio/LoginForm'
import { LogoMark } from '@/components/layout/Logo'
import { getStudioUser } from '@/lib/studioAuth'

export default async function StudioLoginPage() {
  const user = await getStudioUser()
  if (user) redirect('/studio')

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoMark className="h-10 w-10 text-gold" />
          <h1 className="mt-4 font-display text-3xl text-ink">Canvasworks Studio</h1>
          <p className="mt-1 text-sm text-stone">Sign in to manage your site</p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-cream p-6 shadow-[0_24px_60px_-40px_rgba(33,27,18,0.6)]">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-stone">Canvasworks Designs · Lisa Curry Mair</p>
      </div>
    </main>
  )
}
