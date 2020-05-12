import React from 'react'
import { shallow } from 'enzyme'
import TodoList from '../src/todoListApp/TodoList'
import Popup from '../src/todoListApp/Popup'
import Todos from '../src/todoListApp/Todos'
import Dropdown from '../src/todoListApp/Dropdown'

describe('Todos Component', () => {
  test('renders', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<Todos onChange={mockFn} />)

    expect(wrapper.find('.main-div')).toBeDefined()

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { name: 'id', value: '1' } })
    expect(mockFn).toHaveBeenCalled()

    wrapper.setState({
      tasks: [
        { id: '2', text: 'Orange', editmode: false, ischecked: false },
        { id: '3', text: 'Mango', editmode: true, ischecked: false }
      ],
      tasksToDelete: [
        { id: '2', text: 'Orange', editmode: false, ischecked: false }
      ],
      showCheckboxes: true,
      showPopup: true,
      showMultidel: true
    })

    wrapper
      .find('.multiple-delete')
      .at(0)
      .simulate('click')
    expect(mockFn).toHaveBeenCalled()

    wrapper
      .find('.cancel-delete')
      .at(0)
      .simulate('click')
    expect(mockFn).toHaveBeenCalled()

    wrapper.instance().editTask(0)
    expect(wrapper.state().tasks).toEqual([
      { id: '2', text: 'Orange', editmode: true, ischecked: false },
      { id: '3', text: 'Mango', editmode: true, ischecked: false }
    ])

    wrapper.instance().saveTask(0, 'Apple')
    expect(wrapper.state().tasks).toEqual([
      { id: '2', text: 'Apple', editmode: false, ischecked: false },
      { id: '3', text: 'Mango', editmode: true, ischecked: false }
    ])

    wrapper.instance().removeTask(1)
    expect(wrapper.state().tasks).toEqual([
      { id: '2', text: 'Apple', editmode: false, ischecked: false }
    ])

    wrapper.instance().compareBy()

    wrapper.instance().sortBy()

    wrapper.instance().deleteMultiple({
      id: '2',
      text: 'Orange',
      editmode: false,
      ischecked: false
    })
    expect(wrapper.state().deleteBtnShow).toEqual(true)

    wrapper.instance().deleteSelected()
    expect(wrapper.state().showMultidel).toEqual(true)

    wrapper.instance().handleDeleteSelected()
    expect(wrapper.state().showPopup).toEqual(true)

    wrapper.instance().noAction()
    expect(wrapper.state().showPopup).toEqual(false)
  })
})

describe('TodoList Component', () => {
  test('renders', () => {
    const mockFn = jest.fn()
    const tasks = [
      { id: '2', text: 'Orange', editmode: false, ischecked: false },
      { id: '3', text: 'Mango', editmode: true, ischecked: false }
    ]
    const event = { target: { type: 'checkbox', value: '' } }
    const wrapper = shallow(
      <TodoList
        entries={tasks}
        editTodo={mockFn}
        removeTodo={mockFn}
        saveTodo={mockFn}
        deleteMultipleTodo={mockFn}
        showCheckboxes={mockFn}
      />
    )
    wrapper.setState({ input: 'do this today' })
    expect(wrapper.find('.main-todolist-div')).toBeDefined()

    wrapper
      .find('.del-edit-btns')
      .at(0)
      .simulate('click')
    expect(mockFn).toHaveBeenCalled()

    wrapper.find('.save-btn').simulate('click')
    expect(mockFn).toHaveBeenCalled()

    wrapper
      .find('.checkbox')
      .at(0)
      .simulate('change', event)
    expect(mockFn).toHaveBeenCalled()

    wrapper.instance().noAction()
    expect(wrapper.state().showPopup).toEqual(false)

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'do this today' } })
    expect(mockFn).toHaveBeenCalled()

    wrapper.instance().removeItem(tasks[0])
    expect(wrapper.state().showPopup).toEqual(false)

    wrapper.instance().handleDelete(tasks[0])
    expect(wrapper.state().showPopup).toEqual(true)
    expect(wrapper.state().selectedItem).toEqual(tasks[0])
  })
})

describe('Popup Component', () => {
  test('renders', () => {
    const mockFn = jest.fn()
    const popup_wrapper = shallow(
      <Popup
        message='Are you sure you want to delete'
        yesAction={mockFn}
        noAction={mockFn}
        showPopup={true}
      />
    )
    expect(popup_wrapper.find('.container')).toBeDefined()
  })
})

describe('Dropdown Component', () => {
  test('renders', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<Dropdown sortBy={mockFn} />)
    expect(wrapper.find('.dropdown')).toBeDefined()
  })
})
