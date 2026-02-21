import { SourceList } from '@/components/page-contents/source-list'
import { Source, SourceType } from '@/types/source'

const thirdPartySources: Source[] = [
  {
    title: 'Hydra Sources',
    description: 'Community-maintained collection of game download sources made for Hydra launcher but supported by Yamata Launcher',
    url: 'https://hydralinks.pages.dev/',
    type: SourceType.ThirdParty,
    platforms: ['windows'],
    ref:"https://hydralauncher.gg/",
    image:"https://hydralauncher.gg/images/icons/hydra.svg"
  },
]

export default function ThirdPartyPage() {
  return (
    <SourceList isThirdParty={true} title='Third Party Sources'
      description=' External resources and community-maintained source collections.'
      sources={thirdPartySources}>

    </SourceList>
  )
}
