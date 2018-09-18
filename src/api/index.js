//包含n个接口请求函数的模块,每一个函数返回都是promise对象
import ajax from './ajax'
export const reqRegister = ({username,password,type})=>ajax('/register',{username,password,type},'POST')
export const reqLogin = (username,password) =>ajax('/login',{username,password},'POST')