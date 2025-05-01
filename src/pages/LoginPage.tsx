import AuthContainer from '@/components/AuthContainer';
import AuthForm from '@/components/AuthForm';

const LoginPage = () => {
  
  return (
    <AuthContainer>
        <AuthForm type="sign-in"/>
    </AuthContainer>
  
);
}

export default LoginPage;