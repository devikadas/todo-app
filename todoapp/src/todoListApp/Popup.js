import React from 'react'
import '../App.css'

class Popup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='container'>
        <div
          className={
            this.props.showPopup ? 'modal d-block' : 'modal display-none'
          }
          id='myModal'
        >
          <div className='modal-main'>
            <div className='modal-content'>
              <div className='modal-body popup-body'>{this.props.message}</div>
              <div className='modal-footer popup-footer'>
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={this.props.yesAction}
                >
                  Yes
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={this.props.noAction}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup
