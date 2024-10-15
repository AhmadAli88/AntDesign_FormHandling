import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

function Register() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const onSubmit = (data) => {
    console.log(data);
    // You can call the backend API here for registration
    localStorage.setItem('user', JSON.stringify(data));
    message.success('Registration successful!');
    navigate('/login'); // Use navigate instead of history.push
  };

  const password = watch("password", "");

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Name"
          validateStatus={errors.name && "error"}
          help={errors.name && errors.name.message}
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Name is required',
              pattern: {
                value: /^[A-Z][a-z]* [A-Z][a-z]*$/,
                message: 'Name should start with capital letters and include first and last name'
              }
            }}
            render={({ field }) => <Input {...field} prefix={<UserOutlined />} />}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={errors.email && "error"}
          help={errors.email && errors.email.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field }) => <Input {...field} prefix={<MailOutlined />} />}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password && "error"}
          help={errors.password && errors.password.message}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
              }
            }}
            render={({ field }) => <Input.Password {...field} prefix={<LockOutlined />} />}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          validateStatus={errors.confirmPassword && "error"}
          help={errors.confirmPassword && errors.confirmPassword.message}
        >
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Please confirm your password',
              validate: value => value === password || "The passwords do not match"
            }}
            render={({ field }) => <Input.Password {...field} prefix={<LockOutlined />} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
}

export default Register;
