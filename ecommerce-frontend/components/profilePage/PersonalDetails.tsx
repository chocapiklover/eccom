import React from 'react';

interface UserData {
  name: string;
  email: string;
}

interface PersonalDetailsProps {
  userData: UserData;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ userData }) => {
  return (
    <div className="border-t border-b border-gray-700 py-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">Full name</h2>
          <p>{userData.name}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Email address</h2>
          <p>{userData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;