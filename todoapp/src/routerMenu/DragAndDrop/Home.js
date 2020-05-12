import React from 'react'
import './../Home/Home.css'
import Boxes from './Boxes.js'

class DragAndDrop extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      boxes: [
        { id: 0, name: '1', color: 'slateblue' },
        { id: 1, name: '2', color: 'deeppink' },
        { id: 2, name: '3', color: 'lightseagreen' },
        { id: 3, name: '4', color: 'darkorange' },
        { id: 4, name: '5', color: 'gold' },
        { id: 5, name: '6', color: 'violet' }
      ]
    }
  }

  reorderBoxes = (fromBox, toBox) => {
    let boxes = this.state.boxes
    let fromIndex,
      toIndex = -1
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].id === fromBox.id) fromIndex = i
      if (boxes[i].id === toBox.id) toIndex = i
    }
    if (fromIndex !== -1 && toIndex !== -1) {
      const movedItem = boxes[fromIndex]
      const remainingItems = boxes.filter((item, index) => index !== fromIndex)
      const reorderedItems = [
        ...remainingItems.slice(0, toIndex),
        movedItem,
        ...remainingItems.slice(toIndex, boxes.length)
      ]
      this.setState({ boxes: reorderedItems })
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
    this.reorderBoxes(fromBox, toBox)
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

export default DragAndDrop
