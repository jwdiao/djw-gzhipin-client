import React from 'react'
import {connect} from 'react-redux'
import {List,WhiteSpace,Button,Result, Modal} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief



class Personal extends React.Component{


  logout = ()=>{
  Modal. alert('Delete', 'Are you sure???', [
    { text: 'Cancel', onPress: () => console.log('cancel') },
    { text: 'Ok', onPress: () => {
      Cookies.remove('userid')
      this.props.resetUser()

     }
    },
  ])
}

  render(){
    const {username,company,header,post,info,salary} = this.props.user
    return(
      <div>
        <Result
          img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} alt="header"/>}
          title={username}
          message={company}
        />

        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            {post ? <Brief>职位: {post}</Brief> :null}
            {info ?  <Brief>简介: {info}</Brief> :null}
            {salary ? <Brief>薪资:{salary}</Brief> :null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick ={this.logout}>退出登录</Button>
        </List>
      </div>
    )
  }
}
export default connect(
  state =>({user:state.user}),
  {resetUser}
)(Personal)