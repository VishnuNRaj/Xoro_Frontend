import React from 'react';

import { useLinkedIn } from 'react-linkedin-login-oauth2';

const LinkedIn: React.FC = () => {
  const { linkedInLogin } = useLinkedIn({
    clientId: '86nv8oc2mdr7cs',
    redirectUri: `http://xoro-streams.online`,
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div>
        <button onClick={linkedInLogin} className='bg-white rounded-full text-blue-700 w-8 h-8'>
          <i className='fa fa-linkedin'></i>
        </button>
    </div>
  );
}

export default LinkedIn;