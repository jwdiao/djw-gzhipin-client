import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
//withRouter是包裹在一般组件navList外,使其变为路由组件
//未包裹时,props是一个一般的组件,没有其属性;传递路由相关属性: history/location/match
const Item = TabBar.Item

class NavFooter extends Component {

  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render () {
    //filter是true时,就是在保留的,是false时,就是过滤掉的
    const navList = this.props.navList.filter(nav => !nav.hide)

    // 得到当前请求的路由路径
    const path = this.props.location.pathname

    return (
      <TabBar>
        {
          navList.map((nav, index) => (
            <Item key={index}
                  //利用require引入路径,在这里用的比较合适
                  icon={{uri: require(`./images/${nav.icon}.png`)}}
                  selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                  selected={path===nav.path}
                  onPress={() => this.props.history.replace(nav.path)}
                  title={nav.text}
            />
          ))
        }
      </TabBar>
    )
  }
}

export default withRouter(NavFooter)// 向NavFooter组件传递路由相关属性: history/location/match