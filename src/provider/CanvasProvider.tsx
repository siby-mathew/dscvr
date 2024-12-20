import { useEffect, createContext, useState, useContext } from "react";
import {
  CanvasInterface,
  CanvasClient,
  isIframeContext,
} from "@dscvr-one/canvas-client-sdk";

import { registerCanvasWallet } from "@dscvr-one/canvas-wallet-adapter";

type CanvasContextType = {
  client?: CanvasClient;
  user?: CanvasInterface.Lifecycle.User;
  content?: CanvasInterface.Lifecycle.Content;
};

const CanvasContext = createContext<CanvasContextType>({});

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const [canvasContext, setCanvasContext] = useState<CanvasContextType>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialize = async (canvasClient: any) => {
    registerCanvasWallet(canvasClient);

    try {
      const response = await canvasClient.ready();

      if (response) {
        setCanvasContext({
          client: canvasClient,
          user: response.untrusted.user,
          content: response.untrusted.content,
        });
      }
    } catch (error) {
      console.error("Failed to initialize canvas", error);
    }
  };

  useEffect(() => {
    const client = isIframeContext() ? new CanvasClient() : null;

    if (!client) return;
    setCanvasContext({ client: client });
    initialize(client);

    return () => {
      client?.destroy();
    };
  }, []);

  return (
    <CanvasContext.Provider value={canvasContext}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error(
      "useCanvasClientContext must be used within a CanvasClientProvider"
    );
  }
  return context;
};

export default CanvasContext;
