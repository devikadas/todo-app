import React from 'react'
import { shallow } from 'enzyme'
import Boxes from '../src/routerMenu/DragAndDrop/Boxes'
import DragAndDrop from '../src/routerMenu/DragAndDrop/Home'

describe('Boxes Component', () => {
  test('renders', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(
      <Boxes
        box={{ id: 1, name: 'Drag', color: 'white' }}
        key={1}
        draggable='true'
        onDragStart={mockFn}
        onDragOver={mockFn}
        onDrop={mockFn}
      />
    )
    expect(wrapper.find('.box')).toBeDefined()
  })
})

describe('DragAndDrop Component', () => {
  test('renders', () => {
    const wrapper = shallow(<DragAndDrop />)
    const fromBox = { id: 1 }
    const toBox = { id: 0 }
    const mockFn = jest.fn()

    wrapper.makeBoxes = mockFn
    wrapper.handleDragStart = mockFn
    wrapper.handleDragOver = mockFn
    wrapper.reorderBoxes = mockFn
    wrapper.handleDrop = mockFn

    expect(wrapper.find('.boxes-group')).toBeDefined()

    wrapper.makeBoxes()
    expect(wrapper.makeBoxes).toHaveBeenCalled()

    wrapper.handleDragStart()
    expect(wrapper.handleDragStart).toHaveBeenCalled()

    wrapper
      .find(Boxes)
      .at(0)
      .simulate('dragover', { preventDefault () {} })
    wrapper.handleDragOver()
    expect(wrapper.handleDragOver).toHaveBeenCalled()

    wrapper.instance().reorderBoxes(fromBox, toBox)
    wrapper.reorderBoxes()
    expect(wrapper.reorderBoxes).toHaveBeenCalled()

    wrapper
      .find(Boxes)
      .at(0)
      .simulate('drop', { preventDefault () {} })
    expect(wrapper.handleDrop).toHaveBeenCalled()

    wrapper.instance().reorderBoxes(1, 2)
    expect(wrapper.state().boxes).toEqual([
      { id: 1, name: '2', color: 'deeppink' },
      { id: 0, name: '1', color: 'slateblue' },
      { id: 2, name: '3', color: 'lightseagreen' },
      { id: 3, name: '4', color: 'darkorange' },
      { id: 4, name: '5', color: 'gold' },
      { id: 5, name: '6', color: 'violet' }
    ])
  })
})
