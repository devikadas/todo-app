import React from 'react'
import '../../App.css'
import SettingsWrapper from './SettingsWrapper.js'
import '../../widgetApp/Widget.css'
import AccountSettings from './AccountSettings'
import LocationSettings from './LocationSettings'
import PrivacySettings from './PrivacySettings'
import SecuritySettings from './SecuritySettings'

class SettingsList extends React.Component {
  render () {
    return (
      <div className='widget-list'>
        <SettingsWrapper heading='ACCOUNT SETTINGS'>
          <AccountSettings />
        </SettingsWrapper>
        <SettingsWrapper heading='LOCATION SETTINGS'>
          <LocationSettings />
        </SettingsWrapper>
        <SettingsWrapper heading='PRIVACY SETTINGS'>
          <PrivacySettings />
        </SettingsWrapper>
        <SettingsWrapper heading='SECURITY SETTINGS'>
          <SecuritySettings />
        </SettingsWrapper>
      </div>
    )
  }
}

export default SettingsList
