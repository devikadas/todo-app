import React from 'react'
import '../App.css'

class Dropdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedValue: localStorage.getItem('selectedSort')
    }
  }

  onChange = () => {
    const val = document.getElementById('dropdown').value
    localStorage.setItem('selectedSort', val)
    this.setState({ selectedValue: val })
    this.props.sortBy(val)
  }

  render () {
    return (
      <div className='dropdown'>
        <select
          className='btn btn-primary dropdown-toggle bootstrap-select'
          id='dropdown'
          onClick={this.onChange}
          defaultValue={this.state.selectedValue}
        >
          <option value='id'>Sort by ID</option>
          <option value='text'>Sort by Task</option>
        </select>
      </div>
    )
  }
}

export default Dropdown
