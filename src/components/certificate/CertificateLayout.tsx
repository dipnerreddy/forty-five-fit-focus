
import React, { RefObject } from "react";
import { Flame } from "lucide-react";

interface CertificateLayoutProps {
  certificateRef: RefObject<HTMLDivElement>;
  name: string;
  routine: "Home" | "Gym";
  date: string;
  streak: number;
  credentialId: string;
  credentialUrl: string;
  onCopyCredentialUrl: () => void;
}

const CertificateLayout: React.FC<CertificateLayoutProps> = ({
  certificateRef,
  name,
  routine,
  date,
  streak,
  credentialId,
  credentialUrl,
  onCopyCredentialUrl,
}) => (
  <div
    ref={certificateRef}
    className="
      relative flex flex-row w-full max-w-xl rounded-lg sm:rounded-xl
      shadow-lg overflow-hidden bg-white
      border border-gray-100 mx-auto 
      min-h-[300px] sm:min-h-[320px]
      animate-fade-in
    "
  >
    {/* Vertical orange bar on the left */}
    <div
      className="
        bg-orange-500 flex flex-col items-center justify-between
        px-2 py-3
        min-w-[42px]
      "
    >
      <Flame className="text-white mb-3" size={26} />
      <span
        className="
          text-[10px] text-white font-bold tracking-[0.16em]
          [writing-mode:vertical-rl] rotate-180
          leading-4 uppercase select-none"
      >
        45-DAY CHALLENGE
      </span>
    </div>
    {/* Certificate main info */}
    <div
      className="
        flex-1 flex flex-col
        justify-between
        bg-white
        px-4 py-4 sm:px-8 sm:py-8
        gap-2 sm:gap-4
      "
    >
      {/* Headings */}
      <div className="mt-0">
        <div className="uppercase text-[12px] sm:text-sm tracking-wider text-gray-400 font-semibold mb-1">
          Certificate of Achievement
        </div>
        <div className="font-extrabold text-lg sm:text-2xl text-gray-800 mb-1 leading-5 sm:leading-7">
          Official Completion Record
        </div>
        <div className="text-gray-500 text-xs sm:text-base mb-1">
          This certificate is proudly presented to
        </div>
        {/* Main Name */}
        <div
          className="
            text-lg sm:text-5xl font-black text-gray-900
            my-2 break-words
            leading-tight sm:leading-tight
            whitespace-normal
            mobile-certificate-name
            "
          style={{
            letterSpacing: "0.05em",
            wordBreak: "break-word",
          }}
        >
          {name || <span className="text-gray-400 font-normal">...</span>}
        </div>
      </div>
      {/* Details section */}
      <div className="mt-2 sm:mt-5 mb-2">
        <div className="text-xs sm:text-base text-gray-700">
          For the successful completion of&nbsp;
          <span className="font-semibold">45-Day Fitness Challenge</span>
          &nbsp;on the <span className="font-semibold">{routine}</span> Routine.
        </div>
        <div className="flex flex-row gap-6 mt-2">
          <div>
            <span className="block text-[10px] sm:text-xs font-medium text-slate-500">
              Date
            </span>
            <span className="block text-base font-semibold text-slate-900">
              {date}
            </span>
          </div>
          <div>
            <span className="block text-[10px] sm:text-xs font-medium text-slate-500">
              Streak
            </span>
            <span className="block text-base font-semibold text-slate-900">
              {streak} Days
            </span>
          </div>
        </div>
        {/* Credential details + verification link */}
        <div className="mt-3 flex flex-col gap-1">
          <span className="font-mono text-xs text-slate-400 break-all">
            Credential ID: <span className="text-slate-800">{credentialId}</span>
          </span>
          <span
            className="text-xs text-blue-600 underline cursor-pointer break-all"
            onClick={onCopyCredentialUrl}
          >
            {credentialUrl.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default CertificateLayout;
