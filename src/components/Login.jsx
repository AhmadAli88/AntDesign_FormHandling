import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

function Login() {
  const { control, handleSubmit, setError, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const onSubmit = (data) => {
    debugger
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user", user.name);
    if (user && user.email === data.email && user.password === data.password) {
      message.success('Login successful!');
      navigate('/dashboard'); // Use navigate instead of history.push
    } else {
      setError('email', { type: 'manual', message: 'Invalid email or password' });
      setError('password', { type: 'manual', message: 'Invalid email or password' });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Email"
          validateStatus={errors.email && "error"}
          help={errors.email && errors.email.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required' }}
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
            rules={{ required: 'Password is required' }}
            render={({ field }) => <Input.Password {...field} prefix={<LockOutlined />} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
}

export default Login;
