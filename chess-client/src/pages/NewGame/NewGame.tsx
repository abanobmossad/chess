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
  useToast,
} from '@chakra-ui/react';
import { PlayAsRadioBtn } from './PlayAsRadioBtn';
import { FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startGameAction } from '../../store/actions/game.actions';

export function NewGame() {
  const userId = useAppSelector(state=>state.game.userId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [time, setTime] = useState('15m');
  const [playAs, setPlayAs] = useState('r');

  const handleStartGame = () => {
    toast.closeAll();

    if (!name) {
      toast({
        description: 'Please enter your name.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    dispatch(startGameAction({ creatorId: userId, creatorName: name, creatorPlayAs: playAs, time }))
      .unwrap()
      .then((game)=>{
        toast({
          title: 'Game Created.',
          description: 'Game is starting.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        navigate(`play/${game._id}`);
      })
      .catch((e) => {
        toast({
          title: 'Some thing went wrong',
          description: e.response?.data?.message || e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

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
            <Input placeholder="Type your name" onChange={(e) => setName(e.target.value)} value={name} />
          </Box>
          <Box>
            <Heading mb="2" size="xs" textTransform="uppercase">
              Time
            </Heading>
            <Select
              variant="filled"
              icon={<FaClock />}
              iconColor="orange.200"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="15m">15 Minute</option>
              <option value="30m">30 Minute</option>
              <option value="1h">One Hour</option>
            </Select>
          </Box>
          <Box>
            <Heading mb="2" size="xs" textTransform="uppercase">
              I play as
            </Heading>
            <PlayAsRadioBtn onChange={(v) => setPlayAs(v)} />
          </Box>
        </Stack>
        <Center h="100px">
          <Button
            isLoading={isLoading}
            loadingText="Starting game"
            colorScheme="orange"
            size="md"
            width="100%"
            onClick={handleStartGame}
          >
            Play
          </Button>
        </Center>
      </CardBody>
    </Card>
  );
}
