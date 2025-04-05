import { ref, onUnmounted } from 'vue'
import { socketManager } from '../socket'

export function useSocket() {
    // 存储注册的事件
    const eventRegistry = ref<Record<string, (...args: any[]) => void>>({})

    // 注册事件
    const on = (event: string, handler: (...args: any[]) => void) => {
        eventRegistry.value[event] = handler
        socketManager.on(event, handler)
    }

    // 发送事件
    const emit = (event: string, data: any) => {
        socketManager.getSocket().emit(event, data)
    }

    // 组件卸载时清理事件监听
    onUnmounted(() => {
        socketManager.cleanup(eventRegistry.value)
    })

    return {
        socket: socketManager.getSocket(),
        on,    // 暴露注册事件的安全方法
        emit   // 暴露发送事件的方法
    }
}
