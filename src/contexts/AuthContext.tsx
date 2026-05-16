import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  roles: string[];
  avatar: string | null;
  login: (token: string, username: string, roles: string[], avatar?: string | null) => void;
  logout: () => void;
  setAvatar: (avatar: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [avatar, setAvatarState] = useState<string | null>(null);

  const setAvatar = (avatarValue: string | null) => {
    setAvatarState(avatarValue);
    if (avatarValue) {
      localStorage.setItem("avatar", avatarValue);
    } else {
      localStorage.removeItem("avatar");
    }
  };

  // Cargar datos de localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedRoles = localStorage.getItem("roles");
    const storedAvatar = localStorage.getItem("avatar");

    if (storedToken && storedUsername && storedRoles) {
      setToken(storedToken);
      setUsername(storedUsername);
      setRoles(JSON.parse(storedRoles));
      setAvatar(storedAvatar);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (
    token: string,
    username: string,
    roles: string[],
    avatarValue?: string | null
  ) => {
    setToken(token);
    setUsername(username);
    setRoles(roles);
    setIsAuthenticated(true);

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("roles", JSON.stringify(roles));

    if (avatarValue !== undefined) {
      setAvatar(avatarValue);
      if (avatarValue) {
        localStorage.setItem("avatar", avatarValue);
      } else {
        localStorage.removeItem("avatar");
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setRoles([]);
    setAvatar(null);
    setIsAuthenticated(false);

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    localStorage.removeItem("avatar");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, username, roles, avatar, login, logout, setAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
