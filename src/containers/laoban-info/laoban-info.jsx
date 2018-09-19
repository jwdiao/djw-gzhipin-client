import React from 'react'
import {NavBar,List,TextareaItem,InputItem,Button,WingBlank,WhiteSpace,}from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../componnets/header-selector/header-selector'
import {updateUser} from '../../redux/actions'
class LaobanInfo extends React.Component{

  state = {
    header: '',
    info: '',
    post: '',
    salary: '',
    company: ''
  }

  handleChange =(name,value)=>{
    this.setState({
      [name]:value
    })
  }
  setHeader = (header)=>{
    this.setState({
      header
    })
  }
  save = () => {
    this.props.updateUser(this.state)
  }

  render(){
    const {header} = this.props.user
    if(header){
      return <Redirect to= '/laoban'/>
    }
    return(
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <WingBlank>
          <List>
            <InputItem placeholder = '请输入招聘职位' onChange ={value=>this.handleChange('post',value)}>招聘职位: </InputItem>
            <InputItem placeholder = '请输入公司名称' onChange = {value => this.handleChange('company',value)}>公司名称: </InputItem>
            <InputItem placeholder = '请输入职位薪资' onChagne = {value =>this.handleChange('salary',value)}>职位薪资: </InputItem>
            <TextareaItem
              title='职位描述'
              placeholder = '请输入职位描述'
              rows={3}
              onChange = {value =>this.handleChange('info',value)}
            />
            <Button type='primary' onClick = {this.save}>保存</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {updateUser}
)(LaobanInfo)