/*使用axios封装ajax请求函数,返回的是promise 对像
* */
import axios from 'axios'//
export default function ajax(url='',data={},type='GET') {
  if(type==='GET'){
    //这里面涉及到了把data数据拼接到url地址中去;
    // Object.keys是得到数组中属性名
  /*  let dataArray =[]
    Object.keys(data).forEach(key=>{
        dataArray += key + '=' + data[key] + '&'
    })
    if(dataArray!==''){
      dataArray = dataArray.substring(0,dataArray.length-1)
      url += url +'?'+dataArray
    }*/
    let queryString = ''
    Object.keys(data).forEach(key => {
      const value = data[key]
      queryString += key + '=' + value + '&'
    })
    if(queryString) { // username=tom&password=123&
      queryString = queryString.substring(0, queryString.length-1)
      url += '?' + queryString
    }

    return axios.get(url)
  }else{
    return axios.post(url,data)
  }
}