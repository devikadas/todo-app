import React from 'react'
import '../App.css'
import WidgetWrapper from './WidgetWrapper.js'
import './Widget.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { widgetActions } from './actions'

const mapStateToProps = state => {
  return { widget: state.widget }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...widgetActions }, dispatch)
})

class WidgetsList extends React.Component {
  render () {
    const names = this.props.widget.names
    const actions = this.props.actions
    return (
      <div className='widget-list'>
        {names.map((item, index) => {
          return !item.isHidden ? (
            <WidgetWrapper
              widget={item}
              toggleWidget={() => actions.toggleWidget(item, index)}
              key={index}
              index={index}
            />
          ) : null
        })}
      </div>
    )
  }
}

const ConnectedWidgetsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetsList)
export default ConnectedWidgetsList
