import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useToast } from '@chakra-ui/core';

import { api } from '../../services/api';

interface IUser {
  login: string;
  avatar_url: string;
  bio: string;
  name: string;
}

interface IRepo {
  id: number;
  name: string;
  description: string;
  language: string;
}

interface GithubContextData {
  infoUser: IUser;
  repositories: IRepo[];
  getUserGithub: (username: string) => Promise<void>;
  clear: () => void;
}

const GithubContext = createContext<GithubContextData>({} as GithubContextData);

const GithubProvider: React.FC = ({ children }) => {
  const toast = useToast();

  const [infoUser, setInfoUser] = useState<IUser>(() => {
    const user = localStorage.getItem('@Github:user');

    if (user) {
      return JSON.parse(user) as IUser;
    }

    return {} as IUser;
  });
  const [repositories, setRepositories] = useState<IRepo[]>([]);

  const getUserGithub = useCallback(
    async (username: string) => {
      try {
        const {
          data: { login, avatar_url, bio, name },
        } = await api.get<IUser>(`users/${username}`);

        localStorage.setItem(
          '@Github:user',
          JSON.stringify({ login, avatar_url, bio, name }),
        );
        setInfoUser({ login, avatar_url, bio, name });
        toast({
          title: 'Sucesso.',
          description: 'Usuário localizado.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: 'Um erro ocorreu!',
          description: 'Tente novamente!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    },
    [toast],
  );

  const getReposGithub = useCallback(
    async (username: string) => {
      try {
        const { data } = await api.get<IRepo[]>(`users/${username}/repos`);

        const repoFormatted = data.map(
          ({ id, name, language, description }) => ({
            id,
            name,
            language,
            description,
          }),
        );

        setRepositories(repoFormatted);
      } catch (error) {
        console.log(error);
        toast({
          title: 'Um erro ocorreu!',
          description: 'Tente novamente!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    },
    [toast],
  );

  const clear = useCallback(() => {
    localStorage.removeItem('@Github:user');
    setInfoUser({} as IUser);
    setRepositories([]);
  }, []);

  useEffect(() => {
    if (infoUser.login) {
      getReposGithub(infoUser.login);
    }
  }, [infoUser.login, getReposGithub]);

  return (
    <GithubContext.Provider
      value={{ infoUser, repositories, getUserGithub, clear }}
    >
      {children}
    </GithubContext.Provider>
  );
};

const useGithub = (): GithubContextData => {
  return useContext(GithubContext);
};

export { GithubProvider, useGithub };
