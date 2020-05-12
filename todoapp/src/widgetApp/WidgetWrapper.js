import React from 'react'
import Widgets from './Widgets'

class WidgetWrapper extends React.PureComponent {
  toggleWidgetWrapper = () => {
    this.props.toggleWidget(this.props.index)
  }
  render () {
    return (
      <div
        className={
          this.props.widget.isExpanded
            ? 'col-10 widget-custom'
            : 'col-5 widget-custom'
        }
      >
        <div
          className={
            this.props.widget.isExpanded ? 'widget-big-body' : 'widget-body'
          }
        >
          <Widgets
            name={this.props.widget.name}
            toggleWidget={this.toggleWidgetWrapper}
            buttontext={this.props.widget.isExpanded ? 'Min' : 'Max'}
          />
        </div>
      </div>
    )
  }
}

export default WidgetWrapper
