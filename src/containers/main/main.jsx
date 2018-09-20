/*
主界面路由组件
 */
import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NavFooter from '../../componnets/nav-footer/nav-footer'
import {getUser} from '../../redux/actions'
import UserList from '../../componnets/user-list/user-list'
class Main extends Component {

  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]

  //这里是发送ajax请求
  componentDidMount(){
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if(userid && !_id){
      this.props.getUser()
    }
  }

  render () {
    //使用Cookie这个库, 来解决查找用户名的地址值
    //1.判断cookie里面是否有userid,如果没有就自动跳转到登录页面
    const userid = Cookies.get('userid')
    if(!userid){
      return <Redirect to = '/login'/>
    }
    //2.如果cookie里面有userid,就从redux中找,如果redux没有user_id,发送异步请求,从cookies中获取保存到redux中
    //但是发送ajax请求不能在render()中发送
    const {user}  = this.props
    if(!user._id){
      return <div>loading....</div>
    }
    //3.如果redux中有user信息,如果请求的是应用根目录,就自动调转到想对应的主界面中


    const navList = this.navList

    // 当前请求的path
    const path = this.props.location.pathname
    // 得到当前nav对象
    const currentNav = navList.find(nav => path===nav.path)

    // 动态确定哪个nav需要隐藏
    const {type} = this.props.user
    if(type==='laoban') {
      navList[1].hide = true
    } else {
      navList[0].hide = true
    }

    return (
      <div>
        {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path='/laobaninfo' component ={LaobanInfo}/>
          <Route path='/dasheninfo' component = {DashenInfo}/>

          <Route path='/laoban' component={Laoban}/>
          <Route path='/dashen' component={Dashen}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>
          {/*<Route path='/userlist' component ={UserList}/>*/}
        </Switch>

        {currentNav ? <NavFooter navList={this.navList}/> : null}

      </div>
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {getUser}
)(Main)