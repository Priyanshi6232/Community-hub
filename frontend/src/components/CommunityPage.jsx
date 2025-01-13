// CommunityPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom'; 
import CommunityChat from './CommunityChat';

function CommunityPage({ match }) {
    const communityId = useParams(); // Assuming communityId is passed in route params

    return (
        <div>
            <h1>Community Page</h1>
            <CommunityChat communityId={communityId} />
        </div>
    );
}

export default CommunityPage;
