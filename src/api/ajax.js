/*使用axios封装ajax请求函数,返回的是promise 对像
* */
import axios from 'axios'//
export default function ajax(url='',data={},type='GET') {
  if(type==='GET'){
    //这里面涉及到了把data数据拼接到url地址中去;
    // Object.keys是得到数组中属性名
    let dataArray =[]
    Object.keys(data).forEach(key=>{
        dataArray += key + '=' + data[key] + '&'
    })
    if(dataArray!==''){
      dataArray = dataArray.substring(0,dataArray.lastIndexOf('&'))
      url = url +'?'+dataArray
    }
    return axios.get(url)
  }else{
    return axios.post(url,data)
  }
}