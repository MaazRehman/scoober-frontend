import { useEffect, useCallback } from "react";
import { useUserInfo } from "../contexts/UserContext";
import { useSocketClient } from "../contexts/SocketClientContext";

type MessageData = {
    message: string;
    user: string;
    socketId: string;
};

const useHandleMessage = () => {
    const { setSocketId } = useUserInfo();
    const socket = useSocketClient();

    const handleMessage = useCallback((data: MessageData) => {
        if (data.message.includes(`Welcome ${data.user}`)) {
            setSocketId(data.socketId);
        }
    }, [setSocketId]);

    useEffect(() => {
        const handleSocketMessage = (data: MessageData) => {
            handleMessage(data);
        };

        socket.on("message", handleSocketMessage);

        return () => {
            socket.off("message", handleSocketMessage);
        };
    }, [socket, handleMessage]);
};

export default useHandleMessage;
