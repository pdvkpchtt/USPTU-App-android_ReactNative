import AsiMiniFon from '../../shared/images/AsiMiniFon'
import EpshMiniFon from '../../shared/images/EpshMiniFon'
import FttMiniFon from '../../shared/images/FttMiniFon'
import GnfMiniFon from '../../shared/images/GnfMiniFon'
import IesMiniFon from '../../shared/images/IesMiniFon'
import InbMiniFon from '../../shared/images/InbMiniFon'
import InictMiniFon from '../../shared/images/InictMiniFon'
import TfMiniFon from '../../shared/images/TfMiniFon'
import UsualMiniFon from '../../shared/images/UsualMiniFon'
import UvsheuMiniFon from '../../shared/images/UvsheuMiniFon'
import ItMiniFon from '../../shared/images/ItMiniFon'
import VshistMiniFon from '../../shared/images/VshistMiniFon'

import AsiMiniFonDark from '../../shared/images/AsiMiniFonDark'
import EpshMiniFonDark from '../../shared/images/EpshMiniFonDark'
import FttMiniFonDark from '../../shared/images/FttMiniFonDark'
import GnfMiniFonDark from '../../shared/images/GnfMiniFonDark'
import IesMiniFonDark from '../../shared/images/IesMiniFonDark'
import InbMiniFonDark from '../../shared/images/InbMiniFonDark'
import InictMiniFonDark from '../../shared/images/InictMiniFonDark'
import TfMiniFonDark from '../../shared/images/TfMiniFonDark'
import UsualMiniFonDark from '../../shared/images/UsualMiniFonDark'
import UvsheuMiniFonDark from '../../shared/images/UvsheuMiniFonDark'
import ItMiniFonDark from '../../shared/images/ItMiniFonDark'
import VshistMiniFonDark from '../../shared/images/VshistMiniFonDark'
import SwitchTheme from './SwitchTheme'

const MiniThemes = (isTheme) => {
  let themes = []
  if (isTheme.includes('_dark')) {
    themes = [
      ['theme_usual_dark', <UsualMiniFonDark />, <UsualMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_it_dark', <ItMiniFonDark />, <ItMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_asi_dark', <AsiMiniFonDark />, <AsiMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_ftt_dark', <FttMiniFonDark />, <FttMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_inict_dark', <InictMiniFonDark />, <InictMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_tf_dark', <TfMiniFonDark />, <TfMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_gnf_dark', <GnfMiniFonDark />, <GnfMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_inb_dark', <InbMiniFonDark />, <InbMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_ies_dark', <IesMiniFonDark />, <IesMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_uvsheu_dark', <UvsheuMiniFonDark />, <UvsheuMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_vshist_dark', <VshistMiniFonDark />, <VshistMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_epsh_dark', <EpshMiniFonDark />, <EpshMiniFonDark color={SwitchTheme(isTheme).textHeaderButton} />],
    ]
  } else {
    themes = [
      ['theme_usual', <UsualMiniFon />, <UsualMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_it', <ItMiniFon />, <ItMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_asi', <AsiMiniFon />, <AsiMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_ftt', <FttMiniFon />, <FttMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_inict', <InictMiniFon />, <InictMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_tf', <TfMiniFon />, <TfMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_gnf', <GnfMiniFon />, <GnfMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_inb', <InbMiniFon />, <InbMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_ies', <IesMiniFon />, <IesMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_uvsheu', <UvsheuMiniFon />, <UvsheuMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_vshist', <VshistMiniFon />, <VshistMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
      ['theme_epsh', <EpshMiniFon />, <EpshMiniFon color={SwitchTheme(isTheme).textHeaderButton} />],
    ]
  }

  return themes
}

export default MiniThemes
