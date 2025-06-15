
import React, { RefObject } from "react";
import { Flame, CheckCircle } from "lucide-react";
import VerticalText from "./VerticalText";

interface DesktopCertificateProps {
  certificateRef: RefObject<HTMLDivElement>;
  name: string;
  routine: "Home" | "Gym";
  date: string;
  streak: number;
  credentialId: string;
  credentialUrl: string;
  onCopyCredentialUrl: () => void;
}

const DesktopCertificate: React.FC<DesktopCertificateProps> = ({
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
        relative aspect-[1.414/1] w-full flex bg-white shadow-2xl rounded-lg overflow-hidden
        mx-auto 
        animate-fade-in
        hidden sm:flex
      "
    >
      {/* Vertical orange bar on the left (PDF compatible vertical text) */}
      <div className="w-24 bg-orange-500 flex flex-col items-center justify-between p-6">
        <Flame className="h-12 w-12 text-white" />
        <VerticalText text="45-DAY CHALLENGE" />
      </div>
      
      {/* Certificate main content */}
      <div className="flex-1 p-12 flex flex-col">
        {/* Header */}
        <div>
          <p className="text-sm font-semibold text-gray-400 tracking-widest">CERTIFICATE OF ACHIEVEMENT</p>
          <h1 className="text-2xl font-bold text-gray-800">Official Completion Record</h1>
        </div>
        
        {/* Spacer */}
        <div className="flex-grow" />
        
        {/* Main content */}
        <div>
          <p className="text-lg text-gray-500">This certificate is proudly presented to</p>
          <p className="text-7xl font-black text-gray-900 leading-tight break-words">
            {name || <span className="text-gray-400 font-normal">...</span>}
          </p>
          <p className="text-lg text-gray-600 pt-2">
            For the successful completion of the 
            <span className="font-bold"> 45-Day Fitness Challenge </span> 
            on the <span className="font-bold">{routine} Routine</span>.
          </p>
        </div>
        
        {/* Spacer */}
        <div className="flex-grow" />
        
        {/* Footer */}
        <div className="flex justify-between items-end border-t pt-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="font-bold">{date}</p>
              <p className="text-sm text-gray-500">Date of Completion</p>
            </div>
          </div>
          <div className="text-right text-xs text-gray-400">
            <p>Credential ID: {credentialId}</p>
            <p 
              className="cursor-pointer hover:text-blue-600"
              onClick={onCopyCredentialUrl}
            >
              Credential URL: {credentialUrl.replace(/^https?:\/\//, "")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopCertificate;
