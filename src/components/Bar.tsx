import { AppBar, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import ChatIcon from '@mui/icons-material/Chat';

export default function Bar() {
  return (
    <AppBar
      sx={{
        flexShrink: 0,
        position: 'static'
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Box mr={2}>
            <ChatIcon fontSize={'large'} />
          </Box>
          <Typography variant='h6'>Insurbot</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
