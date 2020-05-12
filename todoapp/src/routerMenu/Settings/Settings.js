import React from 'react'
import '../../App.css'

class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <div className='row widget-header'>
          <div className='col-9'>
            <h5>{this.props.heading}</h5>
          </div>
        </div>
        <div className='container chosen-widget-body'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Settings
