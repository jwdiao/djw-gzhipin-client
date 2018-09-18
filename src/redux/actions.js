/*
包含n个action creator函数的模块
同步action: 对象
异步action: dispatch函数
 */
 import {AUTH_SUCCESS,ERROR_MSG} from "./action-types";
 import {reqRegister,reqLogin} from "../api/index";
 //同步错误消息
const errorMsg = (msg) =>({type:ERROR_MSG,data:msg})
//同步成功响应
const authSuccess = (user)=>({type:AUTH_SUCCESS,data:user})
//注册的异步
export function register() {
  return dispatch=>{//执行异步的代码,发异步ajax请求
    reqRegister({username,password,type}).then(response=>{
      const result = response.data
      if(result.code==0){
        dispatch(authSuccess(user))
      }else{
        const msg = result.msg
        dispatch(errorMsg(msg))
      }
    })
  }
}
//登录的异步
export function login() {
  return dispatch=>{//执行异步的代码,发异步ajax请求
    reqLogin({username,password}).then(response=>{
      const result = response.data
      if(result.code==0){
        dispatch(authSuccess(user))
      }else{
        const msg = result.msg
        dispatch(errorMsg(msg))
      }
    })
  }
}