import { useState } from 'react';
import { Box, Button, Container, Flex, Input, Spinner } from '@chakra-ui/react';

const BubbleMap = () => {
  const chain = 'sol';
  const [token, setToken] = useState<string>('');
  const [iframeToken, setIframeToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const iframeSrc = `https://app.bubblemaps.io/${chain}/token/${iframeToken}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const loadBubbleMap = () => {
    if (token) {
      setIframeToken(token);
      setToken('');
      setLoading(true);
    }
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <Box width="100%">
      <Container mb={20} pt={8} px={0} variant="container.1080">
        <Flex alignItems="center" justifyContent="center" mb={8}>
          <Input
            mr={2}
            onChange={handleInputChange}
            placeholder="Enter Solana token address"
            value={token}
            width="400px"
          />
          <Button borderRadius="6px" colorScheme="blue" onClick={loadBubbleMap}>
            Load Bubble Map
          </Button>
        </Flex>
        <Flex
          alignItems="center"
          borderRadius="18px"
          h="500px"
          justifyContent="center"
          p={0}
          w="100%"
          position="relative"
        >
          {loading && (
            <Spinner
              position="absolute"
              size="xl"
              thickness="4px"
              color="blue.500"
            />
          )}
          <iframe
            height="100%"
            src={iframeSrc}
            style={{ border: 'none', borderRadius: '18px' }}
            title="BubbleMap"
            width="100%"
            onLoad={handleIframeLoad}
            allowFullScreen
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default BubbleMap;
