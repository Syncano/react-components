import {Icon, message, Upload} from 'antd'
import * as React from 'react'

export class Avatar extends React.Component {
  state = {
    imageUrl: '',
    loading: false,
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({loading: true})

      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }))
    }
  }
  render() {
    const imageUrl = this.state.imageUrl
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Add avatar</div>
      </div>
    )

    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
      </Upload>
    )
  }
}

function getBase64(img: any, callback: any) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file: any) {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'

  if (!isJPG && !isPNG) {
    message.error('You can only upload JPG and PNG files!')
  }

  const isLt1M = file.size / 1024 / 1024 < 1

  if (!isLt1M) {
    message.error('Image must smaller than 1MB!')
  }

  return isJPG && isLt1M
}
