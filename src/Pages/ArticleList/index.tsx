import React, { useState, useEffect } from 'react';
import { Row, Col, List, Button, Modal } from 'antd';
import axios from '../../utils/axios';
import './articleList.scss'
const { confirm } = Modal;

function ArticleList(props: any) {
  interface ArticleItem {
    title: string;
    typeName: string;
    created_time: string;
    view_count: number;
    id: number;
  }
  const [list, setList] = useState<ArticleItem[]>([]);

  const getList = () => {
    axios.get('/admin/getArticleList').then((res) => {
      setList(res.data.data)
    })
  }

  useEffect(() => {
    console.log('useEffect in ArticleList');
    getList()
  }, [props]);

  // useEffect(() => {
  //   console.log('list change in ArticleList');
  // }, [list]);

  return (
    <div>
      <List
        header={
          <Row>
            <Col span={1}>
              <b>id</b>
            </Col>
            <Col span={7}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={1}>{item.id}</Col>
              <Col span={7}>{item.title}</Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>{item.created_time}</Col>
              <Col span={3}>{item.view_count}</Col>
              <Col span={4}>
                <Button type="primary">修改</Button>&nbsp;
                <Button type="danger">删除 </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ArticleList;
