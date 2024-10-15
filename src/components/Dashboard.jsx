import React, { useEffect, useState } from 'react';
import { Typography, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const { Title, Text } = Typography;

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login'); // Use navigate instead of history.push
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); // Use navigate instead of history.push
  };

  if (!user) return null;

  return (
    <Card style={{ maxWidth: 400, margin: 'auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Welcome to Dashboard</Title>
      <Text strong>Name:</Text> <Text>{user.name}</Text>
      <br />
      <Text strong>Email:</Text> <Text>{user.email}</Text>
      <br />
      <Button type="primary" danger onClick={handleLogout} style={{ marginTop: 20, width: '100%' }}>
        Logout
      </Button>
    </Card>
  );
}

export default Dashboard;
