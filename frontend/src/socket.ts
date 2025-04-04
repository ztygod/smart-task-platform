import { io, Socket } from 'socket.io-client'
import { ref } from 'vue'

const SOCKET_URL = 'http://localhost:3000'

class SocketManager {
    private socket: Socket
    private eventHandlers = new Map<string, Set<(...args: any[]) => void>>()

    constructor() {
        this.socket = io(SOCKET_URL, {
            transports: ['websocket'],
            autoConnect: false
        })
    }

    // 获取 Socket 实例（公开 getter）
    public getSocket() {
        return this.socket
    }

    // 添加事件监听
    public on(event: string, handler: (...args: any[]) => void) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, new Set())
            // 实际绑定到 socket（每个事件只绑定一次）
            this.socket.on(event, (...args: any[]) => {
                this.eventHandlers.get(event)?.forEach(fn => fn(...args))
            })
        }
        this.eventHandlers.get(event)?.add(handler)
    }

    // 移除事件监听
    public off(event: string, handler?: (...args: any[]) => void) {
        if (!handler) {
            // 移除该事件的所有监听
            this.eventHandlers.delete(event)
            this.socket.off(event)
        } else {
            // 移除特定的监听器
            this.eventHandlers.get(event)?.delete(handler)
        }
    }

    // 组件卸载时清理事件
    public cleanup(events: Record<string, (...args: any[]) => void>) {
        Object.entries(events).forEach(([event, handler]) => {
            this.off(event, handler)
        })
    }

    // 连接 socket
    public connect() {
        if (!this.socket.connected) {
            this.socket.connect()
        }
    }

    // 断开 socket
    public disconnect() {
        if (this.socket.connected) {
            this.socket.disconnect()
        }
    }
}

// 单例模式
export const socketManager = new SocketManager()
