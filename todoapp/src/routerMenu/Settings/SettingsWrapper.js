import React from 'react'
import Settings from './Settings'

class SettingsWrapper extends React.PureComponent {
  render () {
    return (
      <div className='col-5 widget-custom'>
        <div className='widget-body'>
          <Settings heading={this.props.heading}>
            {this.props.children}
          </Settings>
        </div>
      </div>
    )
  }
}

export default SettingsWrapper
