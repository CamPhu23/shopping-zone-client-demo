import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import _ from 'lodash'
import { LoginForm } from '../../components/form/login-form';

export default function LoginPage(component) {
  const user = useSelector(state => state.auth.user)

  return (
    !_.isEmpty(user) ?
      <Navigate to="/" replace />
      :
      <>
        <div className='min-h-full grid grid-cols-3'>
          <div className="hidden md:col-span-2 md:flex bg-signin-signup bg-no-repeat h-full w-full bg-cover"></div>

          <LoginForm />
        </div>
      </>
  )
}