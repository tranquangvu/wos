import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button, Input, Alert } from 'antd';

import { verifyCode } from '../../actions/verify';

const FormItem = Form.Item;

class CodeVerify extends Component {
  state = {
    buttonLoading: false,
    buttonText: 'Submit',
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.buttonLoading) {
      this.setState({buttonLoading: false, buttonText: 'Submit'});
    }

    if (nextProps.codeVerifyStatus === 'success' && nextProps.codeVerifyData === 'ordering') {
      this.props.history.push('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({buttonLoading: true, buttonText: 'Submiting...'});
        this.props.verifyCode(values.CodeNumber);
      }
    });
  }

  render() {
    const { codeVerifyStatus, codeVerifyData, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className='code-verify-container'>
        <h1>Please enter your code</h1>
        <div className='verify-form'>
          {
            codeVerifyStatus === 'error' && codeVerifyData === 'reverify' &&
            <Alert
              message='Something went wrong. Please retype your code number.'
              type='error'
              showIcon
            />
          }
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('CodeNumber', {
                rules: [{ required: true, message: 'Please enter your code' }],
              })(
                <Input placeholder='Type Your Code Number' size='large'/>
              )}
            </FormItem>
            <Button type="primary" htmlType="submit" size='large' loading={this.state.buttonLoading}>
              {this.state.buttonText}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapSateToProps = (state) => {
  const { codeVerifyStatus, codeVerifyData } = state.toJS().verify;

  return {
    codeVerifyStatus,
    codeVerifyData,
  };
}

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({
    verifyCode
  }, dispatch);

  return {
    ...actions,
    dispatch,
  }
}

export default connect(mapSateToProps, mapDispatchToProps)(Form.create()(CodeVerify));


