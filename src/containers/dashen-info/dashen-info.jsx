import React from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../componnets/header-selector/header-selector'
import {updateUser} from '../../redux/actions'

class DashenInfo extends React.Component{
  state ={
    post:'',
    info:'',
    header:'',
  }
  // static propTypes ={
  //   setHeader:PropTypes.func.isRequired
  // }
  setHeader = (header) =>{ //这里是设置更新header
    this.setState({header})
  }
  handleChange = (name,val) => {
  this.setState({[name]:val})
}

  render(){
    //如果自信完善,就自动跳转到大神在页面
    const {user} = this.props
    if(user.header){
      return <Redirect to='/dashen'/>
    }
   return(
     <div>
       <NavBar>大神信息完善</NavBar>
       <HeaderSelector setHeader={this.setHeader}/>
       <InputItem onChange={val => this.handleChange('post', val)}>求职岗位:</InputItem>
       <TextareaItem title="个人介绍:"
                     rows={3}
                     onChange={val => this.handleChange('info', val)}/>

       <Button type='primary' onClick={() => this.props.updateUser(this.state)}>保存</Button>
     </div>
   )
  }
}
export default connect(
  state => ({user:state.user}),
  {updateUser}
)(DashenInfo)