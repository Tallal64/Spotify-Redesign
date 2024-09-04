import {
  PiArrowUpRightBold,
  PiListDashesBold,
  PiPlusCircle,
  PiSpeakerHifiBold,
  PiSpeakerSimpleHighBold,
} from "react-icons/pi";
import AudioVisualize from "./AudioVisualize/AudioVisualize";
import NFAK from "/nfak.jpg";
import SoundControl from "./SoundControl/SoundControl";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-x-12 h-full">
      {/* item1 */}
      <div className="flex items-center gap-x-4">
        <div className="h-[55px] w-[55px] rounded-lg overflow-hidden">
          <img src={NFAK} alt="NFAK" className="w-full h-full object-cover" />
        </div>
        <div className="overflow-hidden max-w-[215px]">
          <p className="text-sm text-white font-medium whitespace-nowrap truncate">
            Un Ka Andaz-E-Karam - Complete Original Version
          </p>
          <p className="text-sm text-Neutrals-400 tracking-wide font-light whitespace-nowrap truncate">
            Nusrat Fateh Ali Khan
          </p>
        </div>
        <button>
          <PiPlusCircle size={22} />
        </button>
      </div>

      {/* item2 */}
      <div className="flex w-full">
        <AudioVisualize />
      </div>

      {/* item3 */}
      <div className="flex gap-x-5">
        <button>
          <PiArrowUpRightBold size={20} />
        </button>
        <button>
          <PiListDashesBold size={20} />
        </button>
        <button>
          <PiSpeakerHifiBold size={20} />
        </button>
        <div className="flex items-center gap-x-2">
          <button>
            <PiSpeakerSimpleHighBold size={20} />
          </button>
          <SoundControl
            initialVolume={50}
            trackColor="bg-gray-600"
            fillColor="bg-green-500"
            thumbColor=""
            thumbSize=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
