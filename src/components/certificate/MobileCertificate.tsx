
import React, { RefObject } from "react";
import { Flame } from "lucide-react";

interface MobileCertificateProps {
  certificateRef: RefObject<HTMLDivElement>;
  name: string;
  routine: "Home" | "Gym";
  date: string;
  streak: number;
  credentialId: string;
  credentialUrl: string;
  onCopyCredentialUrl: () => void;
}

const MobileCertificate: React.FC<MobileCertificateProps> = ({
  certificateRef,
  name,
  routine,
  date,
  streak,
  credentialId,
  credentialUrl,
  onCopyCredentialUrl,
}) => {
  return (
    <div
      ref={certificateRef}
      className="
        flex flex-col w-full max-w-xs rounded-xl shadow-md border border-gray-100 mx-auto bg-white
        animate-fade-in
        sm:hidden
      "
    >
      {/* Horizontal orange bar at top */}
      <div className="flex flex-row items-center bg-orange-500 py-2 px-3 gap-2 rounded-t-xl">
        <Flame className="text-white" size={24} />
        <span className="text-xs text-white font-bold tracking-[0.21em] uppercase">
          45-DAY CHALLENGE
        </span>
      </div>
      
      {/* Certificate Info */}
      <div className="flex-1 flex flex-col justify-between px-4 py-4 gap-2">
        <div>
          <div className="uppercase text-[12px] tracking-wider text-gray-400 font-semibold mb-1">
            Certificate of Achievement
          </div>
          <div className="font-extrabold text-lg text-gray-800 mb-1 leading-6">
            Official Completion Record
          </div>
          <div className="text-gray-500 text-xs mb-1">
            This certificate is proudly presented to
          </div>
          <div
            className="
              text-lg font-black text-gray-900 my-2 break-words
              whitespace-normal
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
        <div className="mt-1 mb-2">
          <div className="text-xs text-gray-700">
            For the successful completion of&nbsp;
            <span className="font-semibold">45-Day Fitness Challenge</span>
            &nbsp;on the <span className="font-semibold">{routine}</span> Routine.
          </div>
          <div className="flex flex-row gap-4 mt-2">
            <div>
              <span className="block text-[10px] font-medium text-slate-500">
                Date
              </span>
              <span className="block text-sm font-semibold text-slate-900">
                {date}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-medium text-slate-500">
                Streak
              </span>
              <span className="block text-sm font-semibold text-slate-900">
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
};

export default MobileCertificate;
