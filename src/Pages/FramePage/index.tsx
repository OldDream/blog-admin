import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PieChartOutlined,
  ClusterOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { Route, Switch } from 'react-router-dom';
import AddArticle from '../AddArticle';
import ArticleList from '../ArticleList';
import Test from '../404';
import './style.scss';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SiderDemo(props: any) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  interface breadItem {
    name: string;
  }
  const [breadCrumbArray, setBreadCrumbArray] = useState<breadItem[]>([]);

  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };

  // 初始化页面时展开二级菜单
  const openSub = (key: string) => {
    function findSub(key: string): string {
      console.log('findSub');
      switch (key) {
        case '/index':
          return 'sub1';
        case '/index/list':
          return 'sub1';
        case '/index/add':
          return 'sub1';
        default:
          const index = key.lastIndexOf('/');
          const newKey = key.slice(0, index);
          return findSub(newKey);
      }
    }

    let subKey: string[] = [findSub(key)];
    console.log(subKey);
    // let subKey: string[] = [dic.get(key) as string];
    setOpenKeys(subKey);
  };

  useEffect(() => {
    console.log('useEffect in frame-page');
    console.log(props);
    setSelectedKeys([props.location.pathname]);
    openSub(props.location.pathname);

    const setBreadCrumb = () => {
      switch (props.location.pathname) {
        case '/index/list':
          setBreadCrumbArray([{ name: '文章管理' }, { name: '文章列表' }]);
          break;
        case '/index/add':
          setBreadCrumbArray([{ name: '文章管理' }, { name: '添加文章' }]);
          break;
        default:
          break;
      }
    };
    setBreadCrumb();
  }, [props, props.location.pathname]);

  const handleMenuClick = (key: string) => {
    console.log(key);
    setSelectedKeys([key]);
    switch (key) {
      case '/index/list':
        props.history.push(key);
        break;
      case '/index/add':
        props.history.push(key);
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          openKeys={openKeys}
          onOpenChange={(openKeys: string[]) => {
            setOpenKeys(openKeys);
          }}
          selectedKeys={selectedKeys}
          onClick={({ item, key, keyPath, domEvent }) => {
            handleMenuClick(key);
          }}
          theme="dark"
          mode="inline"
        >
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>数据总览</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <ClusterOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="/index/list">文章列表</Menu.Item>
            <Menu.Item key="/index/add">添加文章</Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <CommentOutlined />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadCrumbArray.map((item, index) => {
              return <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>;
            })}
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Switch>
              <Route path="/index" exact component={AddArticle} />
              <Route path="/index/add" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list" component={ArticleList} />
              <Route path="/index" component={Test} />
              <Route component={AddArticle} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>React.js + Ant Design</Footer>
      </Layout>
    </Layout>
  );
}

export default SiderDemo;
