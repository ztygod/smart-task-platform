export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timer: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    } as T;
}