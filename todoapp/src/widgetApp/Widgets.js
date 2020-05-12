import React from 'react'
import '../App.css'
import './Widget.css'
import Watchlist from '../routerMenu/Watchlist'
import Position from '../routerMenu/Position'
import Chart from '../routerMenu/Chart'
import Accounts from '../routerMenu/Accounts'

class Widgets extends React.Component {
  render () {
    let componentSelected = null
    switch (this.props.name) {
      case 'WATCHLIST':
        componentSelected = <Watchlist />
        break
      case 'POSITIONS':
        componentSelected = <Position />
        break
      case 'CHART':
        componentSelected = <Chart />
        break
      case 'ACCOUNTS':
        componentSelected = <Accounts />
        break
      default:
        componentSelected = null
    }
    return (
      <div>
        <div className='row widget-header'>
          <div className='col-9'>
            <h5>{this.props.name}</h5>
          </div>
          <div className='col-3 text-right'>
            <button
              type='button'
              className='btn btn-primary expand-btn'
              onClick={this.props.toggleWidget}
            >
              {this.props.buttontext}
            </button>
          </div>
        </div>
        <div className='container chosen-widget-body'>{componentSelected}</div>
      </div>
    )
  }
}

export default Widgets
