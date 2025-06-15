
import React, { RefObject } from "react";
import { Flame, CheckCircle } from "lucide-react";

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
  <div ref={certificateRef} className="relative aspect-[1.414/1] w-full flex bg-white shadow-2xl rounded-lg overflow-hidden">
    <div className="w-24 bg-orange-500 flex flex-col items-center justify-between p-6">
      <Flame className="h-12 w-12 text-white" />
      <p className="transform rotate-180 text-white font-semibold tracking-widest [writing-mode:vertical-rl]">
        45-DAY CHALLENGE
      </p>
    </div>
    <div className="flex-1 p-12 flex flex-col">
      <div>
        <p className="text-sm font-semibold text-gray-400 tracking-widest">CERTIFICATE OF ACHIEVEMENT</p>
        <h1 className="text-2xl font-bold text-gray-800">Official Completion Record</h1>
      </div>
      <div className="flex-grow" />
      <div>
        <p className="text-lg text-gray-500">This certificate is proudly presented to</p>
        <p className="text-7xl font-black text-gray-900 leading-tight">
          {name}
        </p>
        <p className="text-lg text-gray-600 pt-2">
          For the successful completion of the 
          <span className="font-bold"> 45-Day Fitness Challenge </span> 
          on the <span className="font-bold">{routine} Routine</span>.
        </p>
      </div>
      <div className="flex-grow" />
      <div className="flex justify-between items-end border-t pt-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <div>
            <p className="font-bold">{date}</p>
            <p className="text-sm text-gray-500">Date of Completion</p>
          </div>
        </div>
        <div className="text-right text-xs text-gray-400">
          <p className="font-mono">Credential ID: {credentialId}</p>
          <p>Streak: {streak} Days</p>
          <p className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={onCopyCredentialUrl}>
            🔗 Verify at: {credentialUrl.replace("https://", "")}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default CertificateLayout;
