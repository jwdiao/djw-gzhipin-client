import React from 'react'
import {WingBlank,WhiteSpace,Card} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body
class UserList extends React.Component{

  static propTypes ={
    userList:PropTypes.array.isRequired
  }

   render(){
     const userList = this.props.userList.filter(user => user.header)
   return(
     <WingBlank>
       {
         userList.map((user,index)=>(
           <div key={user._id}>
             <WhiteSpace/>
             <Card>
               <Header
                 thumb={require(`../../assets/images/${user.header}.png`)}
                 extra={user.username}
               />
               <Body>
               {user.post ?  <div>职位: {user.post}</div> : null}
               {user.company ?  <div>公司: {user.company}</div> : null}
               {user.salary ?   <div>月薪: {user.salary}</div>: null}
               {user.info ?  <div>职位: {user.info}</div> : null}
               </Body>
             </Card>
           </div>
           )
         )
       }
     </WingBlank>
   )
  }
}
export default withRouter(UserList)
