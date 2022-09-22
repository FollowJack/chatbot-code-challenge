import { IconButton, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import ReplayIcon from '@mui/icons-material/Replay';
export default function Bar({
  isDone,
  handleReset
}: {
  isDone: Boolean;
  handleReset: () => void;
}) {
  return (
    <Box
      style={{
        flexShrink: 0,
        height: 64,
        background: '#1976d2',
        color: 'white'
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%'
        }}
      >
        {isDone && <Typography>We will get back to in 24h.</Typography>}
        {isDone && (
          <IconButton
            size='small'
            onClick={handleReset}
            sx={{ color: 'white' }}
          >
            <ReplayIcon />
          </IconButton>
        )}
      </Container>
    </Box>
  );
}
