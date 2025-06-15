
import React, { RefObject } from "react";
import { Flame, CheckCircle } from "lucide-react";

// Helper to split string into array (preserve dashes and spaces)
function verticalTextChars(str: string): string[] {
  return str.split("");
}

interface CertificateLayoutProps {
  certificateRef: RefObject<HTMLDivElement>;
  name: string;
  routine: "Home" | "Gym";
  date: string;
  streak: number;
  credentialId: string;
  credentialUrl: string;
  onCopyCredentialUrl: () => void;
  variant?: "desktop" | "mobile";
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
  variant = "desktop",
}) => {
  // Shared data but different layouts below
  if (variant === "mobile") {
    // Mobile-first design: More compact, vertical
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
  }

  // ----------- Desktop layout: Updated with new professional style -------------
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
        {/* Stacked vertical characters: PDF-compatible */}
        <span
          className="
            text-white font-semibold tracking-widest select-none"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 0, marginBottom: 0 }}
        >
          {verticalTextChars("45-DAY CHALLENGE").map((char, idx) => (
            <span
              key={idx}
              style={{
                display: 'block',
                margin: char === " " ? "0.3em" : "0.05em",
                opacity: char === " " ? 0 : 1, // Blank for spaces
                height: "1em",
                width: "auto",
              }}
            >
              {char}
            </span>
          ))}
        </span>
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

export default CertificateLayout;
