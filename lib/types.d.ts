declare module "yt-converter" {
    /**
     * @param onData - Event executed everytime the process is executed by default prints the percentage of the process
     * @param onClose - Event executed when the process ends
     */
    function convertAudio(options: options, onData: onData, onClose: onClose): string;
    /**
     * @param onData - Event executed everytime the process is executed, by default prints the percentage of the process
     * @param onClose - Event executed when the process ends
     */
    function convertVideo(options: options, onData: onData, onClose: onClose): string;
    function getInfo(url: string): Promise<videoInfo>;
}

/**
 * Executed when the process ends
 * @param id - identifier of the process
 */
declare type onClose = (id: number) => void;

/**
 * Executed everytime the process is executed
 * @param percentage - percentage of the process
 * @param size - object with the size of the audio
 * @param id - identifier of the process
 */
declare type onData = (percentage: number, size: size, id: number) => void;

declare type options = {
    url: string;
    itag: number;
    directoryDownload: string;
    title: string;
};

/**
 * @property downloaded - Total size downloaded of the video in bytes
 * @property totalSize - Total size of the video in bytes
 */
declare type size = {
    downloaded: number;
    totalSize: number;
};

/**
 * Executed when the process ends
 * @param id - identifier of the process
 */
declare type onClose = (id: number) => void;

/**
 * Executed everytime the process is executed
 * @param percentage - percentage of the process
 * @param size - object with the size of the audio
 * @param id - identifier of the process
 */
declare type onData = (percentage: number, size: size, id: number) => void;

declare type total = {
    percentage: number;
    audioTotal: number;
    videoTotal: number;
};

/**
 * @property downloaded - Total size downloaded of the video in bytes
 * @property totalSize - Total size of the video in bytes
 */
declare type size = {
    downloaded: number;
    totalSize: number;
};

declare type options = {
    url: string;
    itag: number;
    directoryDownload: string;
    title: string;
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
 * @param id - identifier of the process
 */
declare type onClose = (id: number) => void;

/**
 * Executed everytime the process is executed
 * @param percentage - percentage of the process
 * @param size - object with the size of the audio
 * @param id - identifier of the process
 */
declare type onData = (percentage: number, size: size, id: number) => void;

declare type options = {
    url: string;
    itag: number;
    directoryDownload: string;
    title: string;
};

