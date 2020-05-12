import React from 'react'

import HOC from './hoc'

class PrivacySettings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='title'>
        <h1>Welcome to the Privacy Settings page</h1>
      </div>
    )
  }
}

export default HOC(PrivacySettings)
