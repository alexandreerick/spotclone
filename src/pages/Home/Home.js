import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import * as S from './styles';

import logo from '../../assets/spotclone-logo.png';

toast.configure();

function Home() {
  const history = useHistory();

  useEffect(() => {
    const handleHrefChange = async () => {
      if (window.location.href.includes('code=')) {
        const { href } = window.location;

        const [antes, depois] = href.split('code=');
        const [code, rest] = depois.split('#_=');
        localStorage.setItem('userCode', code);

        const request = axios.create({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(
              `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
            )}`,
          },
        });

        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', process.env.REACT_APP_REDIRECT_URI);

        const response = await request.post(
          'https://accounts.spotify.com/api/token',
          params
        );

        localStorage.setItem('access_token', response.data.access_token);

        history.push('/playlist');
      } else if (window.location.href.includes('error=')) {
        toast.error('É necessário dar permissão', {
          position: 'bottom-center',
        });
      }
    };
    handleHrefChange();
  }, []);

  return (
    <S.Container>
      <S.NavContainer>
        <Link to="/">
          <img src={logo} alt="Spotclone" />
        </Link>
      </S.NavContainer>
      <S.ContentContainer>
        <h1>
          Para começar, precisamos da sua autorização
          <br />
          no Spotify
        </h1>
        <S.Button disabled href={process.env.REACT_APP_LOGIN_URL}>
          <a href={process.env.REACT_APP_LOGIN_URL}>Entrar com Spotify</a>
        </S.Button>
      </S.ContentContainer>
    </S.Container>
  );
}

export default Home;
