"use client";

import React, { useEffect, useState } from 'react';
import ProfileIndicator from '../ui/profileIndicator';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface ActiveUserProps {
  initialUser: User | null;
}

const supabase = createClient();

const ActiveUser = ({ initialUser }: ActiveUserProps) => {
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    // ✅ Only fetch session if we don't already have a user
    if (!initialUser) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user) {
          setUser(data.session.user);
        }
      });
    }

    // Real-time listener for sign-in / sign-out
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [initialUser]);

  return user ? (
    <ProfileIndicator user={user} />
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 256 256"
      className="fill-gray-600 hover:fill-gray-900 transition-all duration-200 ease-in cursor-pointer"
    >
      <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
    </svg>
  );
};

export default ActiveUser;
