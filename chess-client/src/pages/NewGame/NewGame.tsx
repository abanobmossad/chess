import {
  Select,
  CardHeader,
  Heading,
  Box,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Button,
  Center,
  Input,
} from '@chakra-ui/react';
import { PlayAsRadioBtn } from './PlayAsRadioBtn';
import { FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function NewGame() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <Heading size="md">NEW GAME</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading mb="2" size="xs" textTransform="uppercase">
              Your name
            </Heading>
            <Input placeholder="Type your name" />
          </Box>
          <Box>
            <Heading mb="2" size="xs" textTransform="uppercase">
              Time
            </Heading>
            <Select variant="filled" icon={<FaClock />} iconColor="orange.200" value="15m">
              <option value="15m">15 Minute</option>
              <option value="30m">30 Minute</option>
              <option value="1h">One Hour</option>
            </Select>
          </Box>
          <Box>
            <Heading mb="2" size="xs" textTransform="uppercase">
              I play as
            </Heading>
            <PlayAsRadioBtn />
          </Box>
        </Stack>
        <Center h="100px">
          <Button colorScheme="orange" size="md" width="100%" onClick={() => navigate(`play/${1}`)}>
            Play
          </Button>
        </Center>
      </CardBody>
    </Card>
  );
}
