import React from 'react';
import { LeftBar } from './LeftBar';
import { RightBar } from './RightBar';
import { Feed } from './Feed';

export const Home = () => {
  return (
    <div>
        <LeftBar/>
        <Feed/>
        <RightBar/>
    </div>
  )
}
