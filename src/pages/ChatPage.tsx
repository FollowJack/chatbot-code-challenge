import React from 'react';

import Bar from '../components/Bar';
import { Box } from '@mui/system';
import Chat from '../components/Chat';
import Footer from '../components/Footer';
import useGetFlowMessages from '../hooks/useGetFlowMessages';

export default function ChatPage() {
  const [
    orderedFlowMessages,
    answerMapping,
    handleAnswer,
    isDone,
    handleReset
  ] = useGetFlowMessages();

  return (
    <Box
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap'
      }}
    >
      <Bar />

      <Chat
        orderedFlowMessages={orderedFlowMessages}
        answerMapping={answerMapping}
        handleAnswer={handleAnswer}
      />
      <Footer isDone={isDone} handleReset={handleReset} />
    </Box>
  );
}
