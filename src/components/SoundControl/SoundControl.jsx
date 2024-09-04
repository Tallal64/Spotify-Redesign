/* eslint-disable react/prop-types */
import { useState } from "react";
import { Range } from "react-range";

const SoundControl = ({
  initialVolume,
  trackColor,
  fillColor,
  thumbColor,
  thumbSize,
}) => {
  const [volume, setVolume] = useState(initialVolume);

  return (
    <div className="w-[100px]">
      <Range
        step={1}
        min={0}
        max={100}
        values={[volume]}
        onChange={(values) => setVolume(values[0])}
        renderTrack={({ props, children }) => (
          <div {...props} className={`h-1.5 w-full ${trackColor} rounded-full`}>
            <div
              className={`h-1.5 ${fillColor} rounded-full`}
              style={{ width: `${volume}%` }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className={`${thumbSize} ${thumbColor} rounded-full shadow`}
          />
        )}
      />
    </div>
  );
};

export default SoundControl;
