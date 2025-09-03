interface soundType {
    name: string,
    audio: string,
    bg: string,
    icon: string
}

interface audioType {
    audio: HTMLAudioElement | null;
    icon: {
        element: HTMLImageElement | null,
        src: string | null
    };
}