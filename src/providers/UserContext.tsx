import { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface IUserProviderProps {
  children: ReactNode
}

interface IUserContext {
  user: IUser | null
  repos: Array<IRepos>
  getUser: (userName: string) => void
}

export interface IUser {
  login: string
  avatar_url: string
  html_url: string
  name: string
}

export interface IRepos {
  repo_name: string
  repo_html_url: string
  description: string | null
  language: string
  created_at: string
  updated_at: string
}

export const UserContext = createContext({} as IUserContext)

const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [repos, setRepos] = useState<IRepos[]>([]);
  const navigate = useNavigate();

  const getUser = async (userName: string) => {
    try {
      const userResponse = await api.get(`/${userName}`);
      const { login, avatar_url, html_url, name } = userResponse.data;
      setUser({ login, avatar_url, html_url, name });

      const repositoriesResponse = await api.get(`/${userName}/repos`);
      const repositories = repositoriesResponse.data.map((repo: any) => ({
        repo_name: repo.name,
        repo_html_url: repo.html_url,
        description: repo.description,
        language: repo.language,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
      }));
      setRepos(repositories);

      navigate('/Profile');
    } catch (error) {
      navigate('/NotFound');
    }
  };

  return (
    <UserContext.Provider value={{ user, repos, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
