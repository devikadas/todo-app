import React from 'react'
import '../App.css'
import TodoList from './TodoList.js'
import Dropdown from './Dropdown.js'
import Popup from './Popup.js'

class Todos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      task: '',
      tasks: [],
      tasksToDelete: [],
      deleteBtnShow: false,
      showCheckboxes: false,
      showMultidel: true,
      showPopup: false
    }
  }

  componentDidMount () {
    const taskArray = JSON.parse(localStorage.getItem('taskArray'))
    this.setState({ tasks: taskArray })
  }

  addTask = event => {
    event.preventDefault()
    var taskArray = this.state.tasks
    const newIdInput = this.state.id
    const newTaskInput = this.state.task
    if (taskArray) {
      for (var i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id === newIdInput) {
          alert('ID should be unique!')
          this.setState({ id: '', task: '' })
          return
        }
      }
    } else {
      taskArray = []
    }
    taskArray.push({
      id: newIdInput,
      text: newTaskInput,
      editmode: false,
      ischecked: false
    })
    this.setState({ tasks: taskArray })
    localStorage.setItem('taskArray', JSON.stringify(taskArray))
    this.setState({ id: '', task: '' })
  }

  removeTask = i => {
    var taskArray = this.state.tasks
    const index = taskArray.indexOf(i)
    taskArray.splice(index, 1)
    this.setState({ tasks: taskArray })
    localStorage.setItem('taskArray', JSON.stringify(taskArray))
  }

  editTask = i => {
    const taskArray = this.state.tasks
    taskArray[i]['editmode'] = true
    this.setState({ tasks: taskArray })
    localStorage.setItem('taskArray', JSON.stringify(taskArray))
  }

  saveTask = (i, value) => {
    const taskArray = this.state.tasks
    taskArray[i]['text'] = value
    taskArray[i]['editmode'] = false
    this.setState({ tasks: taskArray })
    localStorage.setItem('taskArray', JSON.stringify(taskArray))
  }

  compareBy = key => {
    return function (a, b) {
      if (key === 'id') return a[key] - b[key]
      else {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
      }
      return 0
    }
  }

  sortBy = key => {
    let arrayCopy = [...this.state.tasks]
    arrayCopy.sort(this.compareBy(key))
    this.setState({ tasks: arrayCopy })
    localStorage.setItem('taskArray', JSON.stringify(arrayCopy))
  }

  deleteMultiple = value => {
    this.setState({ deleteBtnShow: false })
    const toBeDeleted = this.state.tasksToDelete
    const index = toBeDeleted.indexOf(value['id'])
    const taskArray = this.state.tasks
    if (index !== -1) toBeDeleted.splice(index, 1)
    else toBeDeleted.push(value['id'])
    if (toBeDeleted.length > 0) this.setState({ deleteBtnShow: true })
    this.setState({ tasksToDelete: toBeDeleted })
    for (var j = 0; j < taskArray.length; j++) {
      if (toBeDeleted.indexOf(taskArray[j]['id']) !== -1)
        taskArray[j]['ischecked'] = true
      else taskArray[j]['ischecked'] = false
    }
    this.setState({ tasks: taskArray })
  }

  deleteSelected = () => {
    const taskArray = this.state.tasks
    const newArray = []
    for (var j = 0; j < taskArray.length; j++) {
      if (taskArray[j]['ischecked'] !== true) {
        newArray.push(taskArray[j])
      }
    }
    this.setState({ tasks: newArray, deleteBtnShow: false })
    localStorage.setItem('taskArray', JSON.stringify(newArray))
    this.setState({
      showCheckboxes: false,
      showMultidel: true,
      showPopup: false
    })
  }

  handleMultiDelete = () => {
    this.setState({
      showCheckboxes: true,
      deleteBtnShow: true,
      showMultidel: false
    })
  }

  cancelAll = () => {
    const taskArray = this.state.tasks
    for (var i = 0; i < taskArray.length; i++)
      if (taskArray[i]['ischecked']) taskArray[i]['ischecked'] = false
    this.setState({
      tasks: taskArray,
      showMultidel: true,
      deleteBtnShow: false,
      showCheckboxes: false,
      tasksToDelete: []
    })
  }

  handleDeleteSelected = () => {
    this.setState({ showPopup: true })
  }

  noAction = () => {
    this.setState({ showPopup: false })
  }

  inputOnChange = event => {
    let key = event.target.name
    this.setState({ [key]: event.target.value })
    if (this.props.onChange) this.props.onChange()
  }

  render () {
    return (
      <div className='main-div'>
        <div>
          <form onSubmit={this.addTask}>
            <div className='row'>
              <input
                className='col-xs-2 col-sm-2 col-md-2 col-lg-2 inputfield'
                type='number'
                min='1'
                name='id'
                value={this.state.id}
                placeholder='ID'
                onChange={this.inputOnChange}
                required
              />
              <input
                className='col-xs-7 col-sm-7 col-md-7 col-lg-7 inputfield'
                type='text'
                name='task'
                value={this.state.task}
                placeholder='Add New Item'
                onChange={this.inputOnChange}
                required
              />
              <p>
                <button type='submit' className='btn btn-info'>
                  {' '}
                  Add{' '}
                </button>
              </p>
            </div>
          </form>
          <div className='row'>
            {this.state.tasks && this.state.tasks.length > 1 ? (
              <div className='topheader container row'>
                <div className='dropdown-sort col-xs-4 col-sm-4 col-md-4 col-lg-4'>
                  <Dropdown sortBy={this.sortBy} />
                </div>
                {this.state.showMultidel ? (
                  <div className='col-6 col-md-8 multidel'>
                    <button
                      type='button'
                      className='btn btn-primary del-btn multiple-delete'
                      onClick={this.handleMultiDelete}
                    >
                      {' '}
                      Multiple Delete{' '}
                    </button>
                  </div>
                ) : (
                  ''
                )}
                <div className='col-xs-8 col-sm-8 col-md-8 col-lg-8 multidel'>
                  {this.state.showCheckboxes ? (
                    <div>
                      <button
                        onClick={this.cancelAll}
                        type='button'
                        className='btn btn-primary del-btn cancel-delete'
                      >
                        {' '}
                        Cancel
                      </button>
                      {this.state.tasksToDelete.length > 0 ? (
                        <button
                          onClick={this.handleDeleteSelected}
                          type='button'
                          className='btn btn-primary del-btn delete-selected'
                        >
                          {' '}
                          Delete Selected
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
            {this.state.showPopup ? (
              <Popup
                message={
                  'Are you sure you want to delete ' +
                  this.state.tasksToDelete.length +
                  ' out of ' +
                  this.state.tasks.length
                }
                yesAction={this.deleteSelected}
                noAction={this.noAction}
                showPopup={this.state.showPopup}
              />
            ) : (
              ''
            )}
          </div>
          <TodoList
            entries={this.state.tasks}
            editTodo={this.editTask}
            removeTodo={this.removeTask}
            saveTodo={this.saveTask}
            deleteMultipleTodo={this.deleteMultiple}
            showCheckboxes={this.state.showCheckboxes}
          />
        </div>
      </div>
    )
  }
}

export default Todos
