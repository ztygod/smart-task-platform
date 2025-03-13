import { io, Socket } from "socket.io-client";
import { onUnmounted, ref } from "vue";

const SOCKET_URL = 'http://localhost:3000';

const socket: Socket = io(SOCKET_URL, {
    transports: ['websocket'],
    autoConnect: false,//需要手动连接
})

//连接状态
const isConnected = ref(false);

//监听websocket事件
socket.on('connect', () => {
    isConnected.value = false;
    console.log('Connected to WebSocket server');
})

socket.on('disconnect', () => {
    isConnected.value = false;
    console.log('Disconnected from WebSocket server');
})

export function useSocket() {
    socket.connect();
    onUnmounted(() => {
        socket.off('connect');
        socket.off('disconnect');
    })

    return { socket, isConnected };
}