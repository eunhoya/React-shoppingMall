import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

const FileUpload = (props) => {
  const [Images, setImages] = useState([]);
  console.log(Images);
  let formData = new FormData();

  const dropHendler = (files) => {
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/product/image', formData, config).then((res) => {
      if (res.data.success) {
        setImages([...Images, res.data.filePath]);
        props.refreshFunction([...Images, res.data.filePath]);
      } else {
        alert('파일 저장하는데 실패');
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1); // currentIndex부터 시작해서 지울갯수 1
    setImages(newImages);
    props.refreshFunction([newImages]);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHendler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: '1px solid lightgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type='plus' style={{ fontSize: '3rem' }} />
            </div>
          </section>
        )}
      </Dropzone>
      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
        }}
      >
        {Images.map((image, idx) => (
          <div onClick={() => deleteHandler(image)} key={idx}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:5000/${image}`}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
