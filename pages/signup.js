import React from 'react';
import Layout from '../components/Layout';
import SignupForm from '../components/SignUp/SignupForm';

class Signup extends React.Component {

  render() {
    return (
      <Layout title="Sign Up">
        <SignupForm></SignupForm>
      </Layout>
    );
  }
}

export default Signup;