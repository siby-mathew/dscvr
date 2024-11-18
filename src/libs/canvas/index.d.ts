import * as CanvasInterface from '@dscvr-one/canvas-interface';
export { CanvasInterface };

declare class CanvasClient {
    private sourceOrigin;
    private initialized;
    private awaitingHandshake;
    private initResponse;
    private initialInteractionRegistered;
    private eventBus;
    /**
     * @deprecated since version 2.0.0. Use `createCanvasClient` instead
     */
    constructor();
    destroy(): void;
    get isReady(): boolean;
    ready(onClose?: () => void): Promise<any>;
    subscribe<S extends CanvasInterface.BaseHostMessageSchema>(schema: S, callback: (message: CanvasInterface.BaseHostMessage<S>) => void): void;
    subscribeOnce<S extends CanvasInterface.BaseHostMessageSchema>(schema: S): Promise<CanvasInterface.BaseHostMessage<S>>;
    sendMessage(message: CanvasInterface.BaseClientMessage): void;
    sendMessageAndWaitResponse<T extends CanvasInterface.BaseClientMessage, S extends CanvasInterface.BaseHostMessageSchema>(message: T, responseSchema: S): Promise<CanvasInterface.BaseHostMessage<S>>;
    openLink(url: string): void;
    resize(newPayload?: CanvasInterface.User.ResizeRequest['payload']): void;
    createPost(htmlContent: string): Promise<CanvasInterface.User.CreatePostResponse>;
    createShareLink(urlData: string): Promise<CanvasInterface.User.CreateShareLinkResponse>;
    copyToClipboard(content: string): Promise<CanvasInterface.User.CopyToClipboardResponse>;
    onContentReaction(callback: (reaction: CanvasInterface.User.ContentReactionResponse) => void): void;
    connectWallet(chainId: string): Promise<CanvasInterface.User.ConnectWalletResponse>;
    signAndSendTransaction(payload: CanvasInterface.User.UnsignedTransaction & {
        chainId: string;
    }): Promise<CanvasInterface.BaseHostMessage<S>>;
    connectWalletAndSendTransaction(chainId: string, createTx: (connectResponse: CanvasInterface.User.ConnectWalletResponse) => Promise<CanvasInterface.User.UnsignedTransaction | undefined>): Promise<CanvasInterface.User.SignAndSendTransactionResponse | undefined>;
    private sendHandshake;
    private handleReceiveMessage;
    private handleInitialInteraction;
    private removeInitialInteractionListeners;
    private getWindowSize;
}

declare const isIframeContext: () => boolean;

declare const createCanvasClient: () => CanvasClient | undefined;

export { CanvasClient, createCanvasClient, isIframeContext };
