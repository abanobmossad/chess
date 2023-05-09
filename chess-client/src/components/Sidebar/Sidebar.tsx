import { Box, Flex } from '@chakra-ui/react';
import { VideoWindow } from '../VideoWindow';
import { GameControls } from './GameControls';
import { GameHistory } from './GameHistory';

export function Sidebar() {
  return (
    <Box p="2" bg="gray.700" height="80vh">
      <Flex flexDirection="column" gap="5" height="100%">
        <VideoWindow />
        <GameHistory />
        <GameControls />
      </Flex>
    </Box>
  );
}
