import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PieChartOutlined,
  ClusterOutlined,
  CommentOutlined
} from '@ant-design/icons';
import { Route } from 'react-router-dom';
import AddArticle from '../AddArticle';
import ArticleList from '../ArticleList';
import './style.scss';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SiderDemo(props: any) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };

  const openSub = (key: string) => {
    const findSub: { [index: string]: string } = {
      '/index/list': 'sub1',
      '/index/add': 'sub1'
    };
    // const dic: Map<string, string> = new Map([
    //   ['/index/list', 'sub1'],
    //   ['/index/add', 'sub1']
    // ]);
    let subKey: string[] = [findSub[key]];
    // let subKey: string[] = [dic.get(key) as string];
    setOpenKeys(subKey);
  };

  useEffect(() => {
    console.log('useEffect in frame-page');
    console.log(props);
    setSelectedKeys([props.location.pathname]);
    openSub(props.location.pathname);
  }, [props]);

  const handleMenuClick = (key: string) => {
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
          defaultSelectedKeys={['1']}
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
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Route path="/index" exact component={AddArticle} />
            <Route path="/index/add" exact component={AddArticle} />
            <Route path="/index/list" component={ArticleList} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>React.js + Ant Design</Footer>
      </Layout>
    </Layout>
  );
}

export default SiderDemo;
