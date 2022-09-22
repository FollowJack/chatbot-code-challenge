import { useEffect, useRef } from 'react';

import { Box } from '@mui/system';
import {
  Avatar,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';

import {
  IFlowAnswer,
  IFlowMessage,
  IFlowOption
} from '../shared/interfaces/chat.interface';
import { blueGrey } from '@mui/material/colors';
import { blue } from '@mui/material/colors';

export default function Chat({
  orderedFlowMessages,
  answerMapping,
  handleAnswer
}: {
  orderedFlowMessages: IFlowMessage[];
  answerMapping: IFlowAnswer[];
  handleAnswer: (
    id: Number,
    nextId: Number,
    value: String,
    text: String,
    name: String
  ) => void;
}) {
  // TODO: Do we need this?
  const scrollBottomRef = useRef<null | HTMLLIElement>(null);

  const handleChooseAnswer = (
    id: Number,
    nextId: Number,
    value: String,
    text: String,
    name: String
  ) => {
    handleAnswer(id, nextId, value, text, name);
    scrollBottomRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView();
  }, [answerMapping]);

  const renderBotMessage = (text: String) => {
    return (
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar
            alt='Travis Howard'
            src='https://mui.com/static/images/avatar/3.jpg'
          />
        </ListItemAvatar>
        <ListItemText
          primary={text}
          sx={{
            display: 'inline-flex',
            flex: 'initial',
            minWidth: 'auto',
            paddingX: 1,
            paddingY: 2,
            marginBottom: 1,
            bgcolor: blueGrey['50'],
            borderRadius: 2
          }}
        />
      </ListItem>
    );
  };

  const renderChatMessages = orderedFlowMessages.map((message, index) => (
    <Box key={index}>
      {renderBotMessage(message.text)}

      <Grid container columnGap={1} rowGap={1} justifyContent='flex-end'>
        {index < answerMapping.length ? (
          <Grid item key={index}>
            <Button variant='contained' disabled>
              {answerMapping[index].text}
            </Button>
          </Grid>
        ) : (
          message.valueOptions.map((option: IFlowOption, index) => {
            return (
              <Grid item key={index}>
                <Button
                  sx={{
                    bgcolor: blue['700']
                  }}
                  variant='contained'
                  onClick={() =>
                    handleChooseAnswer(
                      message.id,
                      option.nextId,
                      option.value,
                      option.text,
                      option.name
                    )
                  }
                >
                  {option.text}
                </Button>
              </Grid>
            );
          })
        )}
        <ListItem ref={scrollBottomRef}></ListItem>
      </Grid>
    </Box>
  ));

  return (
    <Box
      style={{
        flexGrow: 1,
        overflow: 'auto',
        height: '100%'
      }}
    >
      <Container sx={{ height: '100%' }}>
        <List>{renderChatMessages}</List>
      </Container>
    </Box>
  );
}
