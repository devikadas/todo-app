import React from 'react'
import './Home.css'
import Boxes from './Boxes.js'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      boxes: [
        { id: 1, name: 'Drag', color: 'white' },
        { id: 2, name: 'And', color: 'violet' },
        { id: 3, name: 'Drop', color: 'white' },
        { id: 4, name: 'For', color: 'violet' },
        { id: 5, name: 'Design', color: 'white' },
        { id: 6, name: 'Systems', color: 'violet' }
      ]
    }
  }

  swapBoxes = (fromBox, toBox) => {
    let boxes = this.state.boxes
    let fromIndex,
      toIndex = -1
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].id === fromBox.id) fromIndex = i
      if (boxes[i].id === toBox.id) toIndex = i
    }
    if (fromIndex !== -1 && toIndex !== -1) {
      boxes[toIndex] = [
        boxes[fromIndex],
        (boxes[fromIndex] = boxes[toIndex])
      ][0]
      this.setState({ boxes: boxes })
    }
  }

  handleDragStart = data => event => {
    let fromBox = JSON.stringify({ id: data.id })
    event.dataTransfer.setData('dragContent', fromBox)
  }

  handleDragOver = data => event => {
    event.preventDefault()
    return false
  }

  handleDrop = data => event => {
    event.preventDefault()

    let fromBox = JSON.parse(event.dataTransfer.getData('dragContent'))
    let toBox = { id: data.id }

    this.swapBoxes(fromBox, toBox)
    return false
  }

  makeBoxes = () => {
    return this.state.boxes.map(box => (
      <Boxes
        box={box}
        key={box.id}
        draggable='true'
        onDragStart={this.handleDragStart}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      />
    ))
  }

  render () {
    return <div className='boxes-group'>{this.makeBoxes()}</div>
  }
}

export default Home
