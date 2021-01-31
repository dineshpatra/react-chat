import React from 'react';

type chatUserIds = {
    chatUserIds: Array<string>
}
const ChatWindowsContext = React.createContext({
    userIds: [],
    addUserId: () => {},
    removeUserId: () => {}
});
const ChatWindowsProvider = ChatWindowsContext.Provider;
const ChatWindowsConsumer = ChatWindowsContext.Consumer;

export { ChatWindowsContext, ChatWindowsProvider, ChatWindowsConsumer };