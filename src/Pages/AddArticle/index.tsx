import React, { useState, useEffect } from 'react';
import marked from 'marked';
import moment from 'moment';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import './addArticle.css';
import axios from '../../utils/axios';
import queryString from 'query-string';

const { Option } = Select,
  { TextArea } = Input;

function AddArticle(props: any) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(''); //文章标题
  const [articleContent, setArticleContent] = useState(''); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容'); //html内容
  const [description, setDescription] = useState(''); //简介的markdown内容
  const [descriptionHtml, setDdescriptionHtml] = useState('请输入简介'); //简介的html内容
  const [showDate, setShowDate] = useState(moment(new Date())); //发布日期
  // const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([{ id: -1, typeName: '请选择' }]); // 文章类别信息，后台获取
  const [selectedType, setSelectType] = useState(); //选择的文章类别

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

  // 选择文章类型
  const handleSelect = (value: any) => {
    setSelectType(value);
  };

  // 发布文章
  const publishArticle = () => {
    if (!selectedType) {
      message.error('请选择文章类型！');
      return false;
    } else if (!articleTitle) {
      message.error('请输入文章标题！');
      return false;
    } else if (!description) {
      message.error('请输入文章简介！');
      return false;
    } else if (!showDate) {
      message.error('请选择发布日期！');
      return false;
    } else if (!articleContent) {
      message.error('请输入文章内容！');
      return false;
    }

    interface TempData {
      type_id: number;
      title: string;
      introduction: string;
      content: string;
      created_time: number;
      view_count?: number;
      id?: number;
    }
    let temp: TempData = {
      type_id: (selectedType as unknown) as number,
      title: articleTitle,
      introduction: description,
      content: articleContent,
      created_time: showDate.unix()
    };
    if (articleId === 0) { // 新增文章
      temp.view_count = 0;
      axios.post('/admin/addOrEditArticle', temp).then(res => {
        console.log(res);
        if (res.data.success) {
          message.success('添加成功！');
          setArticleId(res.data.data.id);
        }
      });
    } else { // 编辑文章
      temp.id = articleId;
      axios.post('/admin/addOrEditArticle', temp).then(res => {
        console.log(res);
        if (res.data.success) {
          message.success('编辑成功！');
        }
      });
    }
  };

  // 保存草稿

  useEffect(() => {
    // 获取分类
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
    getTypeInfo();

    // 获取文章并填充
    const getArticleById = (id: any) => {
      axios.get('/admin/getArticleById/' + id).then(res => {
        console.log(res.data.data);
        const article = res.data.data
        if(res.data.success) {
          setArticleId(article.id)
          setArticleTitle(article.title)
          setArticleContent(article.content)
          setDescription(article.introduction)
          setSelectType(article.type_id)
          setShowDate(moment.unix(article.created_time))
          changeContent({target:{value:article.content}})
          changeDescription({target:{value:article.introduction}})
        }
      })
    }

    // 编辑文章
    if (props.location.search) {
      const parsed = queryString.parse(props.location.search);
      getArticleById(parsed.id)
    }

  }, []);

  return (
    <div>
      <Row gutter={5}>
        {/* 左侧内容 */}
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="博客标题"
                size="large"
                value={articleTitle}
                onChange={e => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                value={selectedType}
                onSelect={handleSelect}
                placeholder="请选择"
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
              <Button size="large">保存草稿</Button>&nbsp;
              <Button size="large" type="primary" onClick={publishArticle}>
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
                  value={showDate}
                  onChange={(date: any, dateString: any) => {
                    setShowDate(date);
                  }}
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
