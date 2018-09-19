/*
包含n个工具函数的模块
得到的是自动化跳转的path
结果有:laobaninfo,dasheninfo,laoban,dashen
条件:type,header
 */
export  function getRedirectPath(type,header){
  let path = ''
  if(type ==='laoban'){
    path = '/laoban'
  }else{
    path = 'dashen'
  }
  if(!header){
    path += 'info'
  }
  return path
}