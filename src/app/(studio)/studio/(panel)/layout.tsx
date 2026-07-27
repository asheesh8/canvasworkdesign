import { redirect } from 'next/navigation'
import { getStudioUser } from '@/lib/studioAuth'
import { StudioShell } from '@/components/studio/StudioShell'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getStudioUser()
  if (!user) redirect('/studio/login')
  return <StudioShell user={{ name: user.name, email: user.email }}>{children}</StudioShell>
}
