import React, { useState, useEffect } from 'react';
import marked from 'marked';
import { Row, Col, Input, Select, Button, DatePicker } from 'antd';
import './addArticle.css';
import axios from '../../utils/axios';

const { Option } = Select,
  { TextArea } = Input;

function AddArticle(props: any) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(''); //文章标题
  const [articleContent, setArticleContent] = useState(''); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容'); //html内容
  const [description, setDescription] = useState(); //简介的markdown内容
  const [descriptionHtml, setDdescriptionHtml] = useState('等待编辑'); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([{id: -1, typeName:'请选择'}]); // 文章类别信息，后台获取
  const [selectedType, setSelectType] = useState(null); //选择的文章类别

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false, // 忽略html
    // tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
  });

  // 处理文章markdown输入
  const changeContent = (e: any) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value); // 转换后得到，用于显示的html
    setMarkdownContent(html);
  };

  const changeDescription = (e: any) => {
    setDescription(e.target.value);
    let html = marked(e.target.value); // 转换后得到，用于显示的html
    setDdescriptionHtml(html);
  };

  const getTypeInfo = () => {
    axios.get('/admin/getTypeInfo').then(res => {
      console.log(res.data);
      if (res.data.success === false) {
        sessionStorage.removeItem('openId');
        props.history.push('/');
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };

  useEffect(() => {
    getTypeInfo();
  }, []);

  return (
    <div>
      <Row gutter={5}>
        {/* 左侧内容 */}
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input placeholder="博客标题" size="large" />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                defaultValue={selectedType}
                size="large"
                style={{ width: '96%' }}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
              ></TextArea>
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        {/* 右侧内容 */}
        <Col span={6}>
          <Row>
            <Col span={24}>
              &nbsp;
              <Button size="large">暂存文章</Button>&nbsp;
              <Button size="large" type="primary">
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="请输入简介"
                value={description}
                onChange={changeDescription}
              ></TextArea>
              <br />
              <br />
              <div
                className="introduction-html"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              ></div>
              <br />
            </Col>
            <Col span={24}>
              <div className="date-select-div">
                <DatePicker
                  placeholder="选择发布日期"
                  size="large"
                  className="date-selecter"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
