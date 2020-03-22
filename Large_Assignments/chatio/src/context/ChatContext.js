import React from 'react';

const ChatContext = React.createContext({});

export const ChatProvider = ChatContext.Provider;
export const ChatConsumer = ChatContext.Consumer; 