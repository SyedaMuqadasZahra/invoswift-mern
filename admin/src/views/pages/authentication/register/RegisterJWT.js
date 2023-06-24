import React, {useEffect, useState} from "react"
import {Form, FormGroup, Input, Label, Button, Spinner, Alert} from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import {Check} from "react-feather"
// import { connect } from "react-redux"
import {useDispatch, useSelector} from "react-redux"
import {signupWithJWT, signupWithJWTReset} from "../../../../redux/actions/auth/registerActions"
import {history} from "../../../../history"
import {Formik} from "formik"
import * as Yup from "yup"

const RegisterJWT = () => {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);

  const {registrationLoading, registrationData} = useSelector(state => state.auth.register);

  const handleRedirect = () => {
    dispatch(signupWithJWTReset())
      .then(() => {
        history.push('/dashboard')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (registrationData?.statusCode === 200) {
      setIsSuccess(true)
      setTimeout(() => handleRedirect(), 4000)
    }
  }, [registrationData]);

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          dob: new Date(),
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().max(15, 'Must be 15 characters or less').required('This field is required.'),
          lastName: Yup.string().max(20, 'Must be 20 characters or less').required('This field is required.'),
          dob: Yup.date().required('This field is required.'),
          email: Yup.string().email('Invalid email address').required('This field is required.'),
          password: Yup.string().min(8).required('This field is required.').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
          confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('This field is required.')
        })}
        onSubmit={(values) => {
          dispatch(signupWithJWT({
            firstName: values.firstName,
            lastName: values.lastName,
            dob: new Date(),
            email: values.email,
            password: values.password,
          }));
        }}
      >
        {formik => (
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup className="form-label-group">
              <Input
                type="text"
                placeholder="First Name"
                {...formik.getFieldProps('firstName')}
                disabled={registrationLoading || isSuccess}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-danger font-small-2">{formik.errors.firstName}</div>)}
              <Label>First Name</Label>
            </FormGroup>
            <FormGroup className="form-label-group">
              <Input
                type="text"
                placeholder="Last Name"
                {...formik.getFieldProps('lastName')}
                disabled={registrationLoading || isSuccess}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-danger font-small-2">{formik.errors.lastName}</div>)}
              <Label>Last Name</Label>
            </FormGroup>
            <FormGroup className="form-label-group">
              <Input
                type="email"
                placeholder="Email"
                {...formik.getFieldProps('email')}
                disabled={registrationLoading || isSuccess}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger font-small-2">{formik.errors.email}</div>)}
              <Label>Password</Label>
            </FormGroup>
            <FormGroup className="form-label-group">
              <Input
                type="password"
                placeholder="Password"
                {...formik.getFieldProps('password')}
                disabled={registrationLoading || isSuccess}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger font-small-2">{formik.errors.password}</div>)}
              <Label>Password</Label>
            </FormGroup>
            <FormGroup className="form-label-group">
              <Input
                type="password"
                placeholder="Confirm Password"
                {...formik.getFieldProps('confirmPassword')}
                disabled={registrationLoading || isSuccess}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-danger font-small-2">{formik.errors.confirmPassword}</div>)}
              <Label>Confirm Password</Label>
            </FormGroup>
            <FormGroup>
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16}/>}
                label=" I accept the terms & conditions."
                checked={true}
                disabled={registrationLoading || isSuccess}
              />
            </FormGroup>
            <div className="d-flex justify-content-between">
              <Button.Ripple
                color="primary"
                outline
                onClick={() => {
                  history.push("/login")
                }}
                disabled={registrationLoading || isSuccess}
              >
                Login
              </Button.Ripple>
              <Button.Ripple color="primary" type="submit" disabled={registrationLoading || isSuccess}>
                {registrationLoading ? (
                  <>
                    <Spinner color="white" size="sm"/>
                    <span className="ml-50">Register</span>
                  </>
                ) : (
                  <span className="ml-50">Register</span>
                )}
              </Button.Ripple>
            </div>
          </Form>
        )}
      </Formik>
      {registrationData?.statusCode && (
        <div className="mt-1 text-center text-white bg-success p-1">
          <span>{registrationData?.message}</span>
        </div>
      )}
    </>
  )
};

export default RegisterJWT;

// class RegisterJWT extends React.Component {
//   state = {
//     email: "",
//     password: "",
//     name: "",
//     confirmPass: ""
//   }
//
//   handleRegister = e => {
//     e.preventDefault()
//     this.props.signupWithJWT(
//       this.state.email,
//       this.state.password,
//       this.state.name
//     )
//   }
//
//   render() {
//     return (
//       <Form action="/" onSubmit={this.handleRegister}>
//         <FormGroup className="form-label-group">
//           <Input
//             type="text"
//             placeholder="Name"
//             required
//             value={this.state.name}
//             onChange={e => this.setState({ name: e.target.value })}
//           />
//           <Label>Name</Label>
//         </FormGroup>
//         <FormGroup className="form-label-group">
//           <Input
//             type="email"
//             placeholder="Email"
//             required
//             value={this.state.email}
//             onChange={e => this.setState({ email: e.target.value })}
//           />
//           <Label>Email</Label>
//         </FormGroup>
//         <FormGroup className="form-label-group">
//           <Input
//             type="password"
//             placeholder="Password"
//             required
//             value={this.state.password}
//             onChange={e => this.setState({ password: e.target.value })}
//           />
//           <Label>Password</Label>
//         </FormGroup>
//         <FormGroup className="form-label-group">
//           <Input
//             type="password"
//             placeholder="Confirm Password"
//             required
//             value={this.state.confirmPass}
//             onChange={e => this.setState({ confirmPass: e.target.value })}
//           />
//           <Label>Confirm Password</Label>
//         </FormGroup>
//         <FormGroup>
//           <Checkbox
//             color="primary"
//             icon={<Check className="vx-icon" size={16} />}
//             label=" I accept the terms & conditions."
//             defaultChecked={true}
//           />
//         </FormGroup>
//         <div className="d-flex justify-content-between">
//           <Button.Ripple
//             color="primary"
//             outline
//             onClick={() => {
//               history.push("/pages/login")
//             }}
//           >
//             Login
//           </Button.Ripple>
//           <Button.Ripple color="primary" type="submit">
//             Register
//           </Button.Ripple>
//         </div>
//       </Form>
//     )
//   }
// }
// const mapStateToProps = state => {
//   return {
//     values: state.auth.register
//   }
// }
// export default connect(mapStateToProps, { signupWithJWT })(RegisterJWT)
