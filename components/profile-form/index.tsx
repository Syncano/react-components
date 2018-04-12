import {SyncanoContext} from '@syncano/react-context'
import {Button, Form, Input, message} from 'antd'
import * as React from 'react'
// import {Avatar} from './avatar'
const FormItem = Form.Item

interface Props {
  onSuccess?: Function
  onError?: Function
}

export class ProfileForm extends React.Component<Props> {
  syncano: any
  state = {
    isLoading: false,
    error: '',
    givenName: '',
    familyName: '',
    avatar: '',
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget

    this.setState({
      [input.name]: input.value,
    })
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({error: '', isLoading: true})

    try {
      const {token} = await this.syncano('user-profile/update', {
        givenName: this.state.givenName,
        familyName: this.state.familyName,
      })

      message.success('Profile updated')

      if (typeof this.props.onSuccess === 'function') {
        this.props.onSuccess(token)
      }
    } catch (err) {
      message.error(err.response.data.message || err.message)
      this.setState({error: err.message})

      if (typeof this.props.onError === 'function') {
        this.props.onError(err.response)
      }
    }

    this.setState({isLoading: false})
  }
  renderDefaultView = () => {
    return (
      <React.Fragment>
        <FormItem>
          <Input
            size="large"
            name="givenName"
            placeholder="First name"
            value={this.state.givenName}
            onChange={this.handleChange}
          />
        </FormItem>
        <FormItem>
          <Input
            size="large"
            name="familyName"
            placeholder="Last name"
            value={this.state.familyName}
            onChange={this.handleChange}
          />
        </FormItem>
        {/* <FormItem>
          <Avatar />
        </FormItem> */}
        <FormItem>
          <Button
            loading={this.state.isLoading}
            size="large"
            htmlType="submit"
            type="primary"
          >
            Update
          </Button>
        </FormItem>
      </React.Fragment>
    )
  }
  renderCustomView = (Children: any) => {
    return Children({
      error: this.state.error,
      givenNameProps: {
        name: 'givenName',
        value: this.state.givenName,
        onChange: this.handleChange,
      },
      familyNameProps: {
        name: 'familyName',
        value: this.state.familyName,
        onChange: this.handleChange,
      },
    })
  }
  renderForm = (syncano: any) => {
    this.syncano = syncano

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.props.children && this.renderCustomView(this.props.children)}
        {!this.props.children && this.renderDefaultView()}
      </Form>
    )
  }
  render() {
    return <SyncanoContext.Consumer>{this.renderForm}</SyncanoContext.Consumer>
  }
}
