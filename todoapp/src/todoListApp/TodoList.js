import React from 'react'
import '../App.css'
import Popup from './Popup.js'

class TodoList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      input: '',
      showPopup: false,
      selectedItem: {}
    }
  }

  handleChange = e => {
    this.setState({ input: e.target.value })
  }

  removeItem = item => {
    this.props.removeTodo(item)
    this.setState({ showPopup: false })
  }

  editItem = (item, i) => {
    this.setState({ input: item.text })
    this.props.editTodo(i)
  }

  saveItem = (item, i) => {
    const value = this.state.input
    this.props.saveTodo(i, value)
    this.setState({ input: '' })
  }

  handleCheckChange = (e, item, i) => {
    this.props.deleteMultipleTodo(e)
  }

  handleDelete = i => {
    this.setState({ showPopup: true, selectedItem: i })
  }

  noAction = () => {
    this.setState({ showPopup: false })
  }

  render () {
    return (
      <div className='main-todolist-div'>
        <ul className='list-todos'>
          {this.props.entries &&
            this.props.entries.map((todo, i) => {
              return (
                <li className='row list-item' key={i}>
                  <div className='col-1 list-text'>{todo.id}.</div>
                  {todo.editmode ? (
                    <div className='col-6 edit-text'>
                      <input
                        className='col-7'
                        type='text'
                        defaultValue={todo.text}
                        onChange={this.handleChange}
                      />
                      <button
                        className='save-btn'
                        id='save-btn'
                        onClick={() => {
                          this.saveItem(todo, i)
                        }}
                      >
                        {' '}
                        Save{' '}
                      </button>
                    </div>
                  ) : (
                    <div className='col-6 col-md-8 list-text'>{todo.text}</div>
                  )}
                  <button
                    type='button'
                    className='del-edit-btns'
                    onClick={() => {
                      this.editItem(todo, i)
                    }}
                  >
                    <span className='fa fa-edit icons'></span>
                  </button>
                  {!this.props.showCheckboxes ? (
                    <button
                      type='button'
                      className='del-edit-btns'
                      onClick={() => this.handleDelete(todo)}
                      key={i}
                    >
                      <span className='fa fa-close icons'></span>
                    </button>
                  ) : (
                    <div className='checkbox-label'>
                      <label>
                        <input
                          className='checkbox'
                          onChange={() => {
                            this.handleCheckChange(todo, i)
                          }}
                          type='checkbox'
                          value=''
                          checked={todo.ischecked}
                        />
                      </label>
                    </div>
                  )}
                </li>
              )
            })}
          {this.state.showPopup ? (
            <Popup
              message={
                'Are you sure you want to delete ' +
                this.state.selectedItem['text']
              }
              yesAction={() => this.removeItem(this.state.selectedItem)}
              noAction={this.noAction}
              showPopup={this.state.showPopup}
            />
          ) : (
            ''
          )}
        </ul>
      </div>
    )
  }
}

export default TodoList
