import { connect } from 'react-redux';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';
import LoginForm from '../components/Login/LoginForm';

const Index = () => (
 
    <LoginForm>
            
    </LoginForm>

);

Index.getInitialProps = function(ctx) {
  initialize(ctx);
};

export default connect(state => state)(Index);