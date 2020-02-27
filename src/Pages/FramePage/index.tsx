import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route } from 'react-router-dom';
import AddArticle from '../AddArticle';
import './style.scss';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SiderDemo() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>数据总览</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>添加文章</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="3">文章列表</Menu.Item>
            <Menu.Item key="4">添加文章</Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <Icon type="file" />
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
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          React.js + Ant Design
        </Footer>
      </Layout>
    </Layout>
  );
}

export default SiderDemo;
