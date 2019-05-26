import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(e) => props.updateFilter(e.target.value)} />
    </div>
  )
}

const mapDispatchToProps = {
  updateFilter
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)