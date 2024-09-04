import { useWavesurfer } from "@wavesurfer/react";
import * as React from "react";
import {
  PiPauseBold,
  PiPlayBold,
  PiSkipBackBold,
  PiSkipForwardBold,
  PiShuffleBold,
  PiRepeatBold,
} from "react-icons/pi";

const { useState, useCallback, useRef } = React;

const audioUrls = ["/NFAKSong.mp3", "/nfakSong.mp3", "/song.mp3", "/song2.mp3"];

const formatTime = (seconds) =>
  [Math.floor(seconds / 60), seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

const AudioVisualize = () => {
  const containerRef = useRef(null);
  const [urlIndex, setUrlIndex] = useState(0);
  const [isShuffle, setShuffle] = useState(false);
  const [isRepeat, setRepeat] = useState(false);

  const { wavesurfer, isPlaying, currentTime, duration } = useWavesurfer({
    container: containerRef,
    waveColor: "#cccccc",
    progressColor: "#23ac55",
    url: audioUrls[urlIndex],
    height: 45,
    width: 570,
    barWidth: 2,
    barGap: 2,
    barRadius: 30,
    cursorColor: "transparent",
    cursorWidth: 2,
    interact: true,
    dragToSeek: true,
    audioRate: 1,
    autoScroll: true,
    autoCenter: true,
    sampleRate: 8000,
  });

  const onUrlChange = useCallback(() => {
    setUrlIndex((index) => {
      if (isShuffle) {
        return Math.floor(Math.random() * audioUrls.length);
      }
      return (index + 1) % audioUrls.length;
    });
  }, [isShuffle]);

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const toggleShuffle = useCallback(() => {
    setShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeat((prev) => !prev);
  }, []);

  return (
    <>
      <div className="flex items-center gap-3 w-full">
        <div className="flex items-center py-3 bg-[#252525] w-[225px] rounded-full">
          <div className="border-r px-4 flex items-center gap-x-4">
            <button
              onClick={toggleShuffle}
              className={isShuffle ? "text-green-500" : "text-white"}
            >
              <PiShuffleBold size={20} />
            </button>
            <button
              onClick={toggleRepeat}
              className={isRepeat ? "text-green-500" : "text-white"}
            >
              <PiRepeatBold size={20} />
            </button>
          </div>
          <div className="flex px-4 items-center gap-x-4">
            <button onClick={onUrlChange}>
              <PiSkipBackBold size={18} />
            </button>
            <button onClick={onPlayPause}>
              {isPlaying ? <PiPauseBold size={22} /> : <PiPlayBold size={22} />}
            </button>
            <button onClick={onUrlChange}>
              <PiSkipForwardBold size={18} />
            </button>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-2">
          <p className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </p>
          <div>
            <div ref={containerRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioVisualize;


