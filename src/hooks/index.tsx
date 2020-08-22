import React from 'react';

import { GithubProvider } from './Github';

const AppProvider: React.FC = ({ children }) => (
  <GithubProvider>{children}</GithubProvider>
);

export { AppProvider };
