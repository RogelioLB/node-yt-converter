declare module "yt-converter" {
    /**
     * @param onData - Event executed everytime the process is executed by default prints the percentage of the process
     * @param onClose - Event executed when the process ends
     */
    function convertAudio(options: options, onData: onData, onClose: onClose): void;
    /**
     * @param onData - Event executed everytime the process is executed, by default prints the percentage of the process
     * @param onClose - Event executed when the process ends
     */
    function convertVideo(options: options, onData: onData, onClose: onClose): void;
    function getInfo(url: string): Promise<videoInfo>;
}

/**
 * Executed when the process ends
 */
declare type onClose = () => void;

/**
 * Executed everytime the process is executed
 * @param percentage - percentage of the process
 */
declare type onData = (percentage: string) => void;

declare type options = {
    url: string;
    itag: number;
    directoryDownload: string;
};

/**
 * Executed when the process ends
 */
declare type onClose = () => void;

/**
 * Executed everytime the process is executed
 * @param percentage - percentage of the process
 */
declare type onData = (percentage: string) => void;

declare type options = {
    url: string;
    itag: number;
    directoryDownload: string;
};

declare type thumbnail = {
    url: string;
    width: number;
    height: number;
};

declare type format = {
    audioBitrate: number;
    audioQuality: number;
    approxDurationMs: number;
    container: string;
    hasAudio: boolean;
    hasVideo: boolean;
    itag: number;
    quality: string;
    qualityLabel: string;
};

declare type videoInfo = {
    title: string;
    author: string;
    lengthSeconds: number;
    viewCount: number;
    formats: format[];
    formatsAudio: format[];
    formatsVideo: format[];
    thumbnails: thumbnail[];
};

/**
 * Executed when the process ends
 */
declare type onClose = () => void;

/**
 * Executed everytime the process is executed
 * @param percentage - percentage of the process
 */
declare type onData = (percentage: string) => void;

declare type options = {
    url: string;
    itag: number;
    directoryDownload: string;
};

