import React from 'react'
import {connect} from 'react-redux'


class Dashen extends React.Component{
  render(){
    return(
      <div>Dashen</div>
    )
  }
}
export default connect(
  state =>({}),
  {}
)(Dashen)