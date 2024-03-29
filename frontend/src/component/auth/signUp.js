import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { useContext } from 'react';
import AuthContext from '../../store/auth/auth-context';
import {Validation} from '../../store/validation/validation';

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const SignUp = () => {
  
  const theme = createTheme();
  const authCtx = useContext(AuthContext);
  const validation = useContext(Validation);
  const [memberIdError, setMemberIdError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [nickNameError, setNickNameError] = useState('');
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('loaded');
    }
  }, []);

  const onhandlePost = async (data) => {
    const { memberId, email, name, password, nickName } = data;

    authCtx.signup(memberId, email, password, name, nickName);
    navigate('/login');

  };

  // useEffect (() => {
  //   console.log('useEffect 실행');
  //   if (authCtx.isSuccess) {
  //     window.alert('회원가입이 완료되었습니다. 로그인해주세요.')
  //     navigate('/login');
  //   }
  // }, [signUpDuplicate]);





  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const joinData = {
      memberId: data.get('memberId'),
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
      nickName: data.get('nickName'),
    };
    const { memberId, email, name, password, rePassword, nickName } = joinData;
    // 아이디 유효성 체크
    const memberIdCheck = validation.memberIdValidator(memberId);
    setMemberIdError(memberIdCheck);

    // 이메일 유효성 체크
    const emailCheck = validation.emailValidator(email);
    setEmailError(emailCheck);

    // 비밀번호 유효성 체크
    const passwordCheck = validation.passwordValidator(password);
    setPasswordState(passwordCheck);

    // 비밀번호 같은지 체크
    if (password !== rePassword) setPasswordError('비밀번호가 일치하지 않습니다.');
    setPasswordError('');

    // 이름 유효성 검사
    const nameCheck = validation.nameValidator(name, 1, 20);
    setNameError(nameCheck);
    

    //닉네임 유효성 검사
    const nickNameCheck = validation.nicknameValidator(nickName);
    setNickNameError(nickNameCheck);
  
    if (
      !memberIdCheck && 
      !emailCheck && 
      !passwordCheck && 
      password === rePassword && 
      !nameCheck && 
      !nickNameCheck
      ) {
        onhandlePost(joinData);
      }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className='container-loginForm' ref={containerRef} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    id="memberId"
                    name="memberId"
                    label="ID (4글자 이상 20글자 이하)"
                    error={memberIdError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{memberIdError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    error={emailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordState !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    error={passwordError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    error={nameError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="nickName"
                    name="nickName"
                    label="닉네임 (1글자 이상 20글자 이하)"
                    error={nickNameError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{nickNameError}</FormHelperTexts>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
              <Button
                onClick={() => navigate('/')}
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 0 }}
                size="large"
              >
                취  소
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;