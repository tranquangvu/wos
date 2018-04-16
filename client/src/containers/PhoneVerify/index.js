import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button, Input, Alert } from 'antd';
import { verifyPhone } from '../../actions/verify';

const FormItem = Form.Item;

class PhoneVerify extends Component {
  state = {
    buttonLoading: false,
    buttonText: 'Submit',
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.buttonLoading) {
      this.setState({buttonLoading: false, buttonText: 'Submit'});
    }

    if (nextProps.phoneVerifyStatus === 'success' && nextProps.phoneVerifyData === 'ordering') {
      this.props.history.push('/');
    }

    if (nextProps.phoneVerifyStatus === 'error' && nextProps.phoneVerifyData === 'verify') {
      this.props.history.push('/code-verify')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({buttonLoading: true, buttonText: 'Submiting...'});
        this.props.verifyPhone(values.phoneNumber);
      }
    });
  }

  render() {
    const { phoneVerifyStatus, phoneVerifyData, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className='phone-verify-container'>
        <h1>Please verify your phone number</h1>
        <div className='verify-form'>
          {
            phoneVerifyStatus === 'error' && phoneVerifyData === 'rephonenumber' &&
            <Alert
              message='Something went wrong. Please retype your phone number.'
              type='error'
              showIcon
            />
          }
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('phoneNumber', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(
                <Input placeholder='Type Your Phone Number' size='large'/>
              )}
            </FormItem>
            <Button type="primary" htmlType="submit" loading={this.state.buttonLoading} size='large'>
              {this.state.buttonText}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapSateToProps = (state) => {
  const { phoneVerifyStatus, phoneVerifyData } = state.toJS().verify;

  return {
    phoneVerifyStatus,
    phoneVerifyData,
  };
}

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({
    verifyPhone,
  }, dispatch);

  return {
    ...actions,
    dispatch,
  }
}

export default connect(mapSateToProps, mapDispatchToProps)(Form.create()(PhoneVerify));
