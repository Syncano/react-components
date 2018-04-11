import {SyncanoContext} from '@syncano/react-context'
import {Button, Form, Icon, Input, message} from 'antd'
import * as React from 'react'
const FormItem = Form.Item

interface Props {
  /** Callback after successful login */
  onSuccess?: Function
  /** Callback after login error */
  onError?: Function
}

export class LoginForm extends React.Component<Props> {
  syncano: any
  state = {
    isLoading: false,
    error: '',
    username: '',
    password: '',
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget

    this.setState({
      [input.name]: input.value,
    })
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      this.setState({error: '', isLoading: true})
      const {token} = await this.syncano('user-auth/login', this.state)
      message.success('Logged in')

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
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </FormItem>
        <FormItem>
          <Input
            size="large"
            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.handleChange}
            type="password"
          />
        </FormItem>
        <FormItem>
          <Button
            loading={this.state.isLoading}
            size="large"
            htmlType="submit"
            type="primary"
            style={{width: '100%'}}
          >
            Sign In
          </Button>
        </FormItem>
      </React.Fragment>
    )
  }
  renderCustomView = (Children: any) => {
    return Children({
      error: this.state.error,
      usernameProps: {
        name: 'username',
        value: this.state.username,
        onChange: this.handleChange,
      },
      passwordProps: {
        name: 'password',
        value: this.state.password,
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
