import React from 'react';
import { User } from '@supabase/supabase-js';



interface ProfileIndicatorProps {
  user: User | null;
}

const ProfileIndicator = ({ user }: ProfileIndicatorProps) => {
  // Grab initials if displayName exists
  const fullName = (user?.user_metadata?.full_name as string) || null;
  const initials =
    fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase() || user?.email?.slice(0, 2).toUpperCase();

    return (
      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 text-gray-700 font-semibold relative">
          <span>{initials}</span>
      </div>
    );
};

export default ProfileIndicator;
