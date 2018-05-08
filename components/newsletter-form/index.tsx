import {Button, Form, Input, message} from 'antd'
import * as React from 'react'
const FormItem = Form.Item

interface Props {
  /** Callback after successful login */
  onSuccess?: Function
  /** Callback after login error */
  syncano: any
  onError?: Function
  listId: string
  inputPlaceholder?: string
  buttonLabel?: string
}

interface State {
  isLoading?: boolean
  error?: string
  email?: string
}

export class NewsletterForm extends React.Component<Props, State> {
  syncano: any
  state = {
    isLoading: false,
    error: '',
    email: '',
  }
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget

    this.setState({[input.name]: input.value})
  }
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({error: '', isLoading: true})

    try {
      const {token} = await this.syncano.post('mailchimp/signup', {
        listId: this.props.listId,
        email: this.state.email,
      })

      message.success('You\'ve signed up! Please check your mailbox to confirm.')

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
      <div>
        <FormItem>
          <Input
            size="large"
            name="email"
            placeholder={this.props.inputPlaceholder || 'Type your email...'}
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormItem>
        <FormItem>
          <Button
            loading={this.state.isLoading}
            size="large"
            htmlType="submit"
            type="primary"
          >
            {this.props.buttonLabel || 'Sign up'}
          </Button>
        </FormItem>
      </div>
    )
  }
  renderCustomView = (Children: any) => {
    return Children({
      error: this.state.error,
      emailProps: {
        name: 'email',
        value: this.state.email,
        onChange: this.handleChange,
      },
    })
  }
  render() {
    this.syncano = this.props.syncano

    return (
      <Form
        onSubmit={this.handleSubmit}
        layout={this.props.children ? undefined : 'inline'}
      >
        {this.props.children && this.renderCustomView(this.props.children)}
        {!this.props.children && this.renderDefaultView()}
      </Form>
    )
  }
}
