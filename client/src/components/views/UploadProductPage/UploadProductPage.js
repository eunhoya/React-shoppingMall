import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';

import Axios from 'axios';
const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Australia' },
  { key: 7, value: 'Antarctica' },
];

const UploadProductPage = (props) => {
  const [Titles, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setprice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHendler = (e) => {
    setTitle(e.currentTarget.value);
  };
  const descriptionChangeHendler = (e) => {
    setDescription(e.currentTarget.value);
  };
  const priceChangeHendler = (e) => {
    setprice(e.currentTarget.value);
  };
  const ContinentChangeHendler = (e) => {
    setContinent(e.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (!Title || !Description || !Price || !Continent || !Images) {
      return alert('모든 값을 넣어주세요');
    }

    //서버에 채운 값들을 req로 보낸다
    const body = {
      //로그인 된 사람의 ID
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continent: Continent,
    };
    Axios.post('/api/product', body).then((res) => {
      if (res.data.success) {
        alert('업로드 성공');
        props.history.push('/');
        console.log('성공');
      } else {
        alert('업로드 실패');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHendler} value={Titles} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHendler} value={Description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type='number' onChange={priceChangeHendler} value={Price} />
        <br />
        <br />
        <select onChange={ContinentChangeHendler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button htmlType='submit'>확인</Button>
      </Form>
    </div>
  );
};

export default UploadProductPage;
