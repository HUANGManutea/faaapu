'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Database } from '../../../types/supabase';
import { UserProfile } from '../model/user-profile';

interface UserContextType {
  userProfile: UserProfile | null;
}

const UserContext = createContext<UserContextType | null>(null);

export const userContext = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {data: {user}} = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, username')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        setUserProfile({
          id: user.id,
          username: data.username,
          fullName: data.full_name
        });
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ userProfile }}>
      {children}
    </UserContext.Provider>
  );
};