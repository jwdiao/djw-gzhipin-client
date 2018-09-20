import React from 'react'
import {connect} from 'react-redux'

import UserList from '../../componnets/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Dashen extends React.Component{
  componentDidMount(){
    this.props.getUserList('laoban')
  }
  render(){
    return  <UserList userList = {this.props.userList}/>
  }
}
export default connect(
  state =>({userList:state.userList}),
  {getUserList}
)(Dashen)