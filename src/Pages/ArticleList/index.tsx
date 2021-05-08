import React, { useState, useEffect } from 'react';
import { Row, Col, List, Button, Modal, message, Switch } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';
import './articleList.scss';
const { confirm } = Modal;

interface ArticleItem {
  title: string;
  typeName: string;
  created_time: string;
  view_count: number;
  id: number;
  isShow: number;
}

function ArticleList(props: any) {
  const [list, setList] = useState<ArticleItem[]>([]);

  const getList = () => {
    axios.get('/admin/getArticleList').then((res) => {
      setList(res.data.data);
    });
  };

  const deleteArticle = (id: number, index: number) => {
    console.log(index);
    confirm({
      title: '确定删除本文章?',
      cancelText: '取消?',
      okText: '确定',
      transitionName: 'fade',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        axios.delete('/admin/deleteArticle/' + id).then((res) => {
          console.log(res);
          if (res.data.success) {
            message.success('删除成功！');
            const tempList = [...list];
            tempList.splice(index, 1);
            setList(tempList);
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const gotoEdit = (id: number) => {
    props.history.push('/index/add?id=' + id);
  };

  const setIsShow = (checked: boolean, item: ArticleItem) => {
    item.isShow = Number(checked);
    const temp = {
      id: item.id,
      isShow: item.isShow,
    };
    axios.post('/admin/addOrEditArticle', temp).then((res) => {
      console.log(res);
      if (res.data.success) {
        message.success('修改成功！');
        setList([...list]);
      }
    });
  };

  useEffect(() => {
    console.log('useEffect in ArticleList');
    getList();
  }, []);

  // useEffect(() => {
  //   console.log('list change in ArticleList');
  // }, [list]);

  return (
    <div>
      <List
        className="list-div"
        header={
          <Row>
            <Col span={1}>
              <b>id</b>
            </Col>
            <Col span={6}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={2}>
              <b>浏览量</b>
            </Col>
            <Col span={3} className="inlineCenter">
              <b>展示</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item key={item.id}>
            <Row className="list-div">
              <Col span={1}>{item.id}</Col>
              <Col span={6}>{item.title}</Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>{item.created_time}</Col>
              <Col span={3}>{item.view_count}</Col>
              <Col span={2}>
                {/* {item.isShow === 1
                  ? <CheckCircleOutlined className="greenIcon" />
                  : <CloseCircleOutlined className="redIcon" />} */}
                <Switch
                  className="boxCenter"
                  checkedChildren="开"
                  unCheckedChildren="关"
                  onChange={(checked) => {
                    setIsShow(checked, item);
                  }}
                  checked={Boolean(item.isShow)}
                />
              </Col>
              <Col span={4}>
                <Button
                  type="primary"
                  onClick={() => {
                    gotoEdit(item.id);
                  }}
                >
                  修改
                </Button>
                &nbsp;
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    deleteArticle(item.id, index);
                  }}
                >
                  删除{' '}
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ArticleList;
