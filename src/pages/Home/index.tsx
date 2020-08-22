import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  useToast,
  Flex,
  Box,
  Heading,
  Input,
  Button,
  List,
  ListItem,
  Avatar,
  Divider,
  Text,
  Badge,
  Skeleton,
} from '@chakra-ui/core';

import { useGithub } from '../../hooks/Github';

const Home = () => {
  const toast = useToast();
  const { getUserGithub, clear, infoUser, repositories } = useGithub();

  const [username, setUsername] = useState(infoUser.login || '');
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    clear();

    if (username) {
      setLoading(true);
      await getUserGithub(username);
    } else {
      setLoading(false);
      toast({
        title: 'Atenção.',
        description: 'Insira o username para pesquisar.',
        status: 'warning',
        duration: 2500,
        isClosable: true,
      });
    }
  }, [clear, getUserGithub, toast, username]);

  const boxInfoUser = useMemo(
    () =>
      infoUser.name && (
        <ListItem marginBottom={4}>
          <Box bg="purple.700" padding={5} rounded="lg">
            <Flex alignItems="center">
              <Avatar
                size="lg"
                name={infoUser.name}
                src={infoUser.avatar_url}
              />
              <Heading marginLeft={2} fontSize="2xl">
                {infoUser.name}
              </Heading>
            </Flex>

            <Divider />

            <Text>{infoUser.bio}</Text>
          </Box>
        </ListItem>
      ),
    [infoUser],
  );

  useEffect(() => {
    if (infoUser.name && repositories.length) {
      setLoading(false);
    }
  }, [infoUser.name, repositories.length]);

  return (
    <Flex flexDir="column" alignItems="center" paddingX={10} paddingY={5}>
      <Box width="480px">
        <Flex flexDir="column">
          <Heading>Listagem de repositorios</Heading>

          <Input
            type="text"
            placeholder="Username"
            marginTop={3}
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />

          <Button type="button" marginTop={6} onClick={handleSearch}>
            Pesquisar
          </Button>
        </Flex>

        <Flex flexDir="column" marginTop={10}>
          <List>
            {boxInfoUser}

            {loading && (
              <ListItem marginBottom={4}>
                <Box bg="purple.700" borderWidth="1px" padding={5} rounded="lg">
                  <Skeleton
                    colorStart="white"
                    colorEnd="gray"
                    height="20px"
                    width="90%"
                  />

                  <Divider />

                  <Skeleton
                    colorStart="white"
                    colorEnd="gray"
                    height="20px"
                    width="65%"
                  />

                  <Divider />

                  <Skeleton
                    colorStart="white"
                    colorEnd="gray"
                    height="20px"
                    width="43%"
                  />
                </Box>
              </ListItem>
            )}

            {!loading &&
              repositories.map(({ id, name, description, language }) => (
                <ListItem key={id} marginBottom={4}>
                  <Box bg="purple.700" padding={5} rounded="lg">
                    <Heading fontSize="2xl">{name}</Heading>

                    <Divider />

                    <Text>{description}</Text>

                    <Divider />

                    <Badge marginRight={3} variant="solid" variantColor="blue">
                      {language}
                    </Badge>
                  </Box>
                </ListItem>
              ))}
          </List>
        </Flex>
      </Box>
    </Flex>
  );
};

export { Home };
