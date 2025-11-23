import LocalStorageManager from "@hisius/services/src/helpers/localStorageManager";
import type { User } from "@hisius/interfaces/src";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = LocalStorageManager.getUser();
    const savedToken = LocalStorageManager.getAccessToken();

    if (savedUser && savedToken) {
      setUser(savedUser);
      setAccessToken(savedToken);
    }

    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);
    LocalStorageManager.setUser(userData);
    LocalStorageManager.setTokens(token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    LocalStorageManager.clearAuth();
  };

  const isAuthenticated = !!user && !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
