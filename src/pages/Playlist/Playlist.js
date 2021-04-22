import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import * as S from './styles';

import 'react-toastify/dist/ReactToastify.css';

import logo from '../../assets/spotclone-logo.png';

import TInput from '../../components/Input';

toast.configure();

function Playlist() {
  const [userData, setUserData] = useState({});
  const [playlistLink, setPlaylistLink] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [tracksId, setTracksId] = useState([]);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingCreatePlaylist, setLoadingCreatePlaylist] = useState(false);

  const history = useHistory();

  const handleSearchSongs = async () => {
    try {
      setLoadingSearch(true);
      const access_token = localStorage.getItem('access_token');

      if (playlistLink.includes('si=')) {
        const [link, depois] = playlistLink.split('si=');
        const [antes, id] = playlistLink.split('playlist/');

        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${id}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const ids = response.data.tracks.items.map((item) => item.track.uri);
        setTracksId(ids);
        setLoadingSearch(false);
        return;
      }

      const [antes, id] = playlistLink.split('playlist/');
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${id}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const ids = response.data.items.map((item) => item.track.uri);
      setTracksId(ids);
      setLoadingSearch(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error.message === 'Invalid playlist Id'
      ) {
        toast.error(
          'Link inválido, confira o link da playlist e tente novamente!',
          {
            position: 'bottom-center',
          }
        );
        setLoadingSearch(false);
        return;
      }
      setLoadingSearch(false);
      console.log(error);
    }
  };

  const handleCreatePlaylist = async () => {
    try {
      if (!playlistName) {
        toast.error('É obrigatório informar um nome!', {
          position: 'bottom-center',
        });
        setLoadingCreatePlaylist(false);
        return;
      }
      setLoadingCreatePlaylist(true);
      const data = {
        name: playlistName,
        description: playlistDescription,
      };

      const access_token = localStorage.getItem('access_token');

      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userData.id}/playlists`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const dataTracks = {
        uris: tracksId,
      };

      const addTracks = await axios.post(
        `https://api.spotify.com/v1/playlists/${response.data.id}/tracks`,
        dataTracks,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setLoadingCreatePlaylist(false);
      setPlaylistLink('');
      setPlaylistName('');
      setPlaylistDescription('');
      setTracksId([]);
      toast.success('Playlist criada com sucesso!', {
        position: 'bottom-center',
      });
    } catch (error) {
      setLoadingCreatePlaylist(false);
      toast.error('Ocorreu algum erro!', {
        position: 'bottom-center',
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear('userCode');
    localStorage.clear('access_token');
    history.push('/');
  };

  useEffect(() => {
    const handleGetUserData = async () => {
      try {
        setLoadingUserData(true);
        const access_token = localStorage.getItem('access_token');

        if (access_token) {
          const userInfo = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          setUserData(userInfo.data);
          setLoadingUserData(false);
        } else {
          setLoadingUserData(false);
          history.push('/');
        }
      } catch (error) {
        console.log('ERRO CATCH: ', error);
        console.log('ERRO CATCH RESPONSE: ', error.response);
        toast.error('Sessão expirada! Faça login novamente', {
          position: 'bottom-center',
        });
        history.push('/');
      }
    };

    handleGetUserData();
  }, []);

  return (
    <S.Container>
      <S.NavContainer>
        <Link to="/playlist">
          <img src={logo} alt="Spotclone" />
        </Link>
        <S.LeaveButton onClick={handleLogout}>Sair</S.LeaveButton>
      </S.NavContainer>
      {loadingUserData || loadingCreatePlaylist ? (
        <S.LoadingContainer>
          <ReactLoading type="bars" color="#1DB954" />
        </S.LoadingContainer>
      ) : (
        <>
          {userData && userData.display_name ? (
            <S.ProfileContainer>
              <a
                target="_blank"
                rel="noreferrer"
                href={userData.external_urls.spotify}
              >
                {userData.images.length ? (

                  <img
                    src={userData.images[0].url}
                    alt={`Foto de ${userData.display_name}`}
                  />
                ) : null}
              </a>
              <h2>{`Olá, ${userData.display_name}`}</h2>
            </S.ProfileContainer>
          ) : null}
          <S.ContentContainer>
            <p>Cole o link da playlist que deseja copiar abaixo</p>
            <TInput
              type="text"
              placeholder="Ex: https://open.spotify.com/playlist/0jo2c5FCUjw3xDhxASRGKy"
              value={playlistLink}
              onChange={(v) => setPlaylistLink(v.target.value)}
            />
            {tracksId && tracksId.length ? (
              <>
                <TInput
                  type="text"
                  placeholder="Digite um nome para sua playlist"
                  value={playlistName}
                  onChange={(v) => setPlaylistName(v.target.value)}
                />
                <TInput
                  type="text"
                  placeholder="Digite uma breve descrição"
                  value={playlistDescription}
                  onChange={(v) => setPlaylistDescription(v.target.value)}
                />
              </>
            ) : null}
            {loadingSearch ? (
              <ReactLoading type="bars" color="#1DB954" />
            ) : (
              <>
                {tracksId && tracksId.length ? (
                  <S.Button type="button" onClick={handleCreatePlaylist}>
                    Criar playlist
                  </S.Button>
                ) : (
                  <S.Button type="button" onClick={handleSearchSongs}>
                    Pesquisar
                  </S.Button>
                )}
              </>
            )}
          </S.ContentContainer>
        </>
      )}
    </S.Container>
  );
}

export default Playlist;
