import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import initialize from '../../utils/initialize';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      photo:'',
      email:'',
      phone:'',
      type_user: '',
      password: '',
      confirm_password:''
    };
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.register(
      { name: this.state.name, photo: this.state.photo, email: this.state.email, phone:this.state.phone, type_user:this.state.type_user, password: this.state.password, confirm_password:this.state.confirm_password },
      'register'
    );
  }

  render() {
    return (
        <div>
            <h3 className="title is-3">Sign Up</h3>
        <form
          onSubmit={this.handleSubmit.bind(this)}
          className="container"
          style={{ width: '540px' }}
        >
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                placeholder="Aqui Iria Foto"
                required
                value={this.state.photo}
                onChange={e => this.setState({ photo: e.target.value })}
              />
            </p>
          </div>
          <div className="field">
            <select 
                value={this.state.type_user}
                onChange={e => this.setState({ type_user: e.target.value })}
                className="input"
            >
            <option value="Seleccione una opción" defaultValue>Seleccione una opción</option>
            <option value="Administrador">Administrador</option>
            <option value="Usuario">Usuario</option>
            <option value="Dueño">Dueño</option>
            <option value="Empleado">Empleado</option>    
            </select>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                placeholder="Nombres y Apellidos"
                required
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="email"
                placeholder="Ingrese su Email"
                required
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                placeholder="Ingrese Celular"
                required
                value={this.state.phone}
                onChange={e => this.setState({ phone: e.target.value })}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="password"
                placeholder="Contraseña"
                required
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="password"
                placeholder="Confirme Contraseña"
                required
                value={this.state.confirm_password}
                onChange={e => this.setState({ confirm_password: e.target.value })}
              />
            </p>
          </div>
          <div className="field">
            <p className="control has-text-centered">
              <button type="submit" className="button is-success">
                Registrarme
              </button>
            </p>
          </div>
        </form>
        </div>
    );
  }
}

export default connect(
  state => state,
  actions
)(SignUpForm);