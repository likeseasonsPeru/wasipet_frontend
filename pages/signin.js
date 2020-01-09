import React from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/Login/LoginForm';

class Signin extends React.Component {
  render() {
    return (
      <Layout title="Sign In">
          <LoginForm>
            
          </LoginForm>
      </Layout>
    );
  }
}

export default Signin;