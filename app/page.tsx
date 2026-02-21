
import { SourceType } from '@/types/source'
import { redirect } from 'next/navigation';

export const dynamic = 'force-static'

export default async function HomePage() {
  return redirect(`sources/${SourceType.Download}`);
}


