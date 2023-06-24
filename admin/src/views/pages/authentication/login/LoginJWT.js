import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import {CardBody, FormGroup, Form, Input, Button, Label, Spinner} from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import {Mail, Lock, Check} from "react-feather"
import {loginWithJWT} from "../../../../redux/actions/auth/loginActions"
// import {connect} from "react-redux"
import {useDispatch, useSelector} from "react-redux"
import {history} from "../../../../history"
import {Formik} from "formik"
import * as Yup from "yup"

const LoginJWT = () => {
  const dispatch = useDispatch();

  const {loginLoading, loginData, loginError} = useSelector(state => state.auth.login);

  useEffect(() => {
    if (loginData?.statusCode === 200) {
      history.push('/dashboard')
    }
  }, [loginData]);

  return (
    <React.Fragment>
      <CardBody className="pt-1">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('This field is required.'),
            password: Yup.string().required('This field is required.')
          })}
          onSubmit={(values) => {
            dispatch(loginWithJWT({
              email: values.email,
              password: values.password
            }));
          }}
        >
          {formik => (
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="email"
                  placeholder="Email"
                  {...formik.getFieldProps('email')}
                  disabled={loginLoading}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger font-small-2">{formik.errors.email}</div>)}
                <div className="form-control-position">
                  <Mail size={15}/>
                </div>
                <Label>Email</Label>
              </FormGroup>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="password"
                  placeholder="Password"
                  {...formik.getFieldProps('password')}
                  disabled={loginLoading}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger font-small-2">{formik.errors.password}</div>)}
                <div className="form-control-position">
                  <Lock size={15}/>
                </div>
                <Label>Password</Label>
              </FormGroup>
              <FormGroup className="d-flex justify-content-between align-items-center">
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16}/>}
                  label="Remember me"
                  defaultChecked={false}
                />
                <div className="float-right">
                  <Link to="/pages/forgot-password">Forgot Password?</Link>
                </div>
              </FormGroup>
              <div className="d-flex justify-content-between">
                <Button.Ripple
                  color="primary"
                  outline
                  onClick={() => {
                    history.push("/register")
                  }}
                  disabled={loginLoading}
                >
                  Register
                </Button.Ripple>
                <Button.Ripple color="primary" type="submit" disabled={loginLoading}>
                  {loginLoading ? (
                    <>
                      <Spinner color="white" size="sm"/>
                      <span className="ml-50">Login</span>
                    </>
                  ) : (
                    <span className="ml-50">Login</span>
                  )}
                </Button.Ripple>
              </div>
            </Form>
          )}
        </Formik>
        {loginError?.response && (
          <div className="mt-1 text-center text-white bg-danger p-1">
            <span>{`${loginError?.response.status} - ${loginError?.response?.data?.message}`}</span>
          </div>
        )}
      </CardBody>
    </React.Fragment>
  );
};

export default LoginJWT;


// class LoginJWT extends React.Component {
//   state = {
//     email: "demo@demo.com",
//     password: "demodemo",
//     remember: false
//   }
//
//   handleLogin = e => {
//     e.preventDefault()
//     this.props.loginWithJWT(this.state)
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <CardBody className="pt-1">
//           <Form action="/" onSubmit={this.handleLogin}>
//             <FormGroup className="form-label-group position-relative has-icon-left">
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 value={this.state.email}
//                 onChange={e => this.setState({ email: e.target.value })}
//                 required
//               />
//               <div className="form-control-position">
//                 <Mail size={15} />
//               </div>
//               <Label>Email</Label>
//             </FormGroup>
//             <FormGroup className="form-label-group position-relative has-icon-left">
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 value={this.state.password}
//                 onChange={e => this.setState({ password: e.target.value })}
//                 required
//               />
//               <div className="form-control-position">
//                 <Lock size={15} />
//               </div>
//               <Label>Password</Label>
//             </FormGroup>
//             <FormGroup className="d-flex justify-content-between align-items-center">
//               <Checkbox
//                 color="primary"
//                 icon={<Check className="vx-icon" size={16} />}
//                 label="Remember me"
//                 defaultChecked={false}
//                 onChange={this.handleRemember}
//               />
//               <div className="float-right">
//                 <Link to="/pages/forgot-password">Forgot Password?</Link>
//               </div>
//             </FormGroup>
//             <div className="d-flex justify-content-between">
//               <Button.Ripple
//                 color="primary"
//                 outline
//                 onClick={() => {
//                   history.push("/pages/register")
//                 }}
//               >
//                 Register
//               </Button.Ripple>
//               <Button.Ripple color="primary" type="submit">
//                 Login
//               </Button.Ripple>
//             </div>
//           </Form>
//         </CardBody>
//       </React.Fragment>
//     )
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//     values: state.auth.login
//   }
// }
// export default connect(mapStateToProps, { loginWithJWT })(LoginJWT)
