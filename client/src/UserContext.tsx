import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
// Define types for the context
// Define the type of user
interface User {
  username: string;
  email: string;
}
interface UserContextType {
  username: string | null;
  email: string | null;
  invAmt: Number | null;
  setUser: (user: { username: string; email: string,invAmt:Number }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
   // Fetch user info from the backend on initial load
   useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/userinfo', {
          withCredentials: true, // Allows the access_token cookie to be sent
        });
        setUser(response.data);// Set user info from response
      } catch (error) {
        console.log('User not authenticated');
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchUserInfo();
  }, []);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [invAmt, setinvAmt] = useState<Number | null>(null);

  const setUser = ({ username, email,invAmt }: { username: string; email: string ,invAmt:Number}) => {
    setUsername(username);
    setEmail(email);
    setinvAmt(invAmt);
  };

  return (
    <UserContext.Provider value={{ username, email, invAmt,setUser }}>
      {children}
    </UserContext.Provider>
  );
};
