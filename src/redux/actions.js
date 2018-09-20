/*
包含n个action creator函数的模块
同步action: 对象
异步action: dispatch函数
 */
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
} from '../api'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
} from './action-types'  // 有几个action type就会定义几个同步action

// 注册/登陆成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data:user})
// 注册/登陆失败的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data:msg})
const receiveUser = (user) =>({type:RECEIVE_USER,data:user})
const resetUser = (msg) =>({type:RESET_USER,data:msg})


/*
注册的异步action
 */
export function register({username, password,password2, type}) {
  //表单验证
  if(!username) {
    return errorMsg('必须指定用户名')
  } else if (!password) {
    return errorMsg('必须指定密码')
  } else if (password2!==password) {
    return errorMsg('密码必须一致')
  } else if (!type) {
    return errorMsg('必须指定用户类型')
  }
  return dispatch => {
    // 发异步ajax请求注册
    reqRegister({username, password, type}).then(response => {
      const result = response.data // {code:0/1, msg: '', data: user}
      if(result.code==0) { // 成功了
        const user = result.data
        // 分发成功的同步action
        dispatch(authSuccess(user))
      } else { // 失败
        const msg = result.msg
        // 分发失败同步action
        dispatch(errorMsg(msg))
      }
    })
  }
}
/*
登陆的异步action
 */
export function login(username, password) {
  return async dispatch => {

    if(!username) {  // 必须分发一个同步action对象
      return dispatch(errorMsg('必须指定用户名'))  // 此时 return代表结束
    } else if (!password) {
      return dispatch(errorMsg('必须指定密码'))
    }

    // 发异步ajax请求注册
    const response = await reqLogin(username, password)
    const result = response.data // {code:0/1, msg: '', data: user}
    if(result.code==0) { // 成功了
      const user = result.data
      // 分发成功的同步action
      dispatch(authSuccess(user))
    } else { // 失败
      const msg = result.msg
      // 分发失败同步action
      dispatch(errorMsg(msg))
    }
  }
}


/*
更新异步的action
 */
export function updateUser(user) {
  return async dispatch =>{
    const response = await reqUpdateUser(user)
    const result = response.data;
    if(result.code === 0){
      const user = result.data
      dispatch(receiveUser(user))
    }else{
      const msg = result.msg
      dispatch(resetUser(msg))
    }
  }
}