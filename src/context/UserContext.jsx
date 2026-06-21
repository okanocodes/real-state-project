import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const defaultUser = {
    email: 'admin@admin.com',
    password: '12345',
    name: 'SoftITO',
};

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const login = ({ email, password }) => {
        if (email === defaultUser.email && password === defaultUser.password) {
            setUser({ email: defaultUser.email, name: defaultUser.name });
            setError('');
            return true;
        }

        setUser(null);
        setError('Geçersiz e-posta veya şifre.');
        return false;
    };

    const logout = () => {
        setUser(null);
        setError('');
    };

    return (
        <UserContext.Provider
            value={{
                user,
                login,
                logout,
                error,
                setError,
                isAuthenticated: Boolean(user),
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
