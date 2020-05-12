import React from 'react'

export const HOC = ParentComponent => {
  class widget extends React.Component {
    render () {
      return (
        <div className='col-5 widget-custom'>
          <div className='widget-body'>
            <div className='row widget-header'>
              <h5 className='col-9'>{this.props.name}</h5>
            </div>

            <div className='container chosen-widget-body'>
              <ParentComponent {...this.props} />
            </div>
          </div>
        </div>
      )
    }
  }

  return widget
}

export default HOC
