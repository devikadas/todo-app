import React from 'react'
import './Home.css'

class Boxes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div
        className='box'
        style={{ backgroundColor: this.props.box.color }}
        draggable={this.props.draggable}
        onDragStart={this.props.onDragStart({ id: this.props.box.id })}
        onDragOver={this.props.onDragOver({ id: this.props.box.id })}
        onDrop={this.props.onDrop({ id: this.props.box.id })}
      >
        <div className='content'>{this.props.box.name}</div>
      </div>
    )
  }
}

export default Boxes
