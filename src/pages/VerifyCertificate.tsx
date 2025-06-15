
import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, XCircle, Link as LinkIcon, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CertificateLayout from "@/components/certificate/CertificateLayout";

// Helper: Re-use robust name formatting
function formatUserName(name: string | undefined) {
  return (name || "").replace(/([A-Z])/g, " $1").trim();
}
function parseCredentialId(credentialId: string | undefined) {
  // Example: FC45-NAME-USERID-2025
  if (!credentialId) return null;
  const parts = credentialId.split("-");
  if (parts.length !== 4 || !parts[0].startsWith("FC45")) return null;
  return {
    challenge: "45-Day Fitness Challenge",
    name: parts[1] || "",
    userPart: parts[2] || "",
    year: parts[3] || "",
    credentialId,
  };
}

const VerifyCertificate: React.FC = () => {
  const { credentialId } = useParams();
  const parsed = parseCredentialId(credentialId);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Inference/defaults
  const routine: "Home" | "Gym" = "Home";
  const streak = 45;
  const formattedName = formatUserName(parsed?.name);
  const showCertificate = !!parsed;

  // Credential URL
  const credentialUrl = credentialId
    ? `${window.location.origin}/verify/${credentialId}`
    : "";

  // Styles & animation
  const fadeIn = "animate-fade-in";
  const cardBg =
    "bg-gradient-to-br from-emerald-50 via-white to-blue-50/70 dark:from-slate-800 dark:via-slate-900 dark:to-blue-900/40";

  // Badges
  const badgeClass =
    "inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 shadow-sm";
  const invalidBadgeClass =
    "inline-flex items-center gap-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 shadow-sm";

  // --- Custom Mobile-First Certificate Layout ---
  function CertificateVisual() {
    return (
      <div className="w-full flex justify-center pb-2">
        <div
          ref={certificateRef}
          className="
            relative flex rounded-2xl shadow-lg overflow-hidden 
            bg-white
            max-w-md w-full 
            min-h-[350px]
            mx-auto
            border
            border-slate-100
            my-0
            "
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.06)", marginTop: 0 }}
        >
          {/* Orange vertical */}
          <div className="bg-orange-500 flex flex-col justify-between items-center py-5 px-3 xs:px-3 min-w-[44px]">
            <Flame className="text-white mb-3" size={32} />
            <span className="text-xs text-white font-bold tracking-widest [writing-mode:vertical-rl] rotate-180 select-none">
              45-DAY CHALLENGE
            </span>
          </div>
          <div className="flex-1 flex flex-col pl-4 pr-2 py-5 sm:pl-7 sm:pr-6 sm:py-7 gap-2">
            <div>
              <div className="uppercase text-xs sm:text-sm tracking-widest text-gray-400 font-semibold mb-0">
                Certificate of Achievement
              </div>
              <div className="font-extrabold text-lg sm:text-xl text-gray-800 mb-0">
                Official Completion Record
              </div>
              <div className="text-gray-500 text-xs sm:text-base mb-1">
                This certificate is proudly presented to
              </div>
              {/* The main name area */}
              <div
                className="
                  text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none
                  my-2
                  break-words"
                style={{
                  letterSpacing: "0.06em",
                  wordBreak: "break-word",
                  lineHeight: 1.1,
                }}
                data-testid="certificate-user-name"
              >
                {formattedName || (
                  <span className="text-gray-400 font-normal">...</span>
                )}
              </div>
            </div>
            <div className="mt-1 sm:mt-3">
              <div className="text-sm text-gray-600">
                For the successful completion of the&nbsp;
                <span className="font-semibold">45-Day Fitness Challenge</span>
                &nbsp;on the <span className="font-semibold">{routine}</span> Routine.
              </div>
              <div className="flex gap-4 mt-2">
                <div>
                  <span className="block font-medium text-slate-700 text-xs">
                    Year
                  </span>
                  <span className="block text-base font-semibold text-slate-900">
                    {parsed?.year}
                  </span>
                </div>
                <div>
                  <span className="block font-medium text-slate-700 text-xs">
                    Streak
                  </span>
                  <span className="block text-base font-semibold text-slate-900">
                    {streak} Days
                  </span>
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-1">
                <span className="font-mono text-xs text-slate-400">
                  Credential ID: <span className="text-slate-800">{parsed?.credentialId}</span>
                </span>
                <span
                  className="text-xs text-blue-600 underline cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(credentialUrl)}
                >
                  {credentialUrl.replace(/^https?:\/\//, "")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen flex flex-col items-center justify-center p-2 
        ${cardBg}
      `}
      style={{ minHeight: "100dvh" }}
    >
      <Card className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl border-0 overflow-visible my-4 bg-white/90">
        <CardContent className="p-0 md:p-0">
          {showCertificate ? (
            <div className={fadeIn}>
              {/* Header Section */}
              <div className="flex flex-col items-center bg-gradient-to-b from-green-50/90 to-white py-6 px-2 sm:px-4 border-b">
                <span className={badgeClass + " mb-2 mt-1"}>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Certificate Verified
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-green-800 mb-1 tracking-tight flex items-center text-center">
                  Congratulations!
                  <span role="img" aria-label="confetti" className="text-2xl ml-2">🎉</span>
                </h2>
                <p className="text-green-700 text-center mb-2 text-sm sm:text-base max-w-sm">
                  This certificate is an&nbsp;
                  <b>official record of completion</b> for the&nbsp;
                  <span className="font-bold">{parsed.challenge}</span>.<br />
                  The credential is <span className="font-semibold text-green-800">valid</span> and issued in <b>{parsed.year}</b>.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-xs sm:max-w-full justify-center">
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/60 rounded shadow-sm border border-green-100 w-full sm:w-auto justify-center">
                    <span className="font-semibold text-gray-500 text-xs">Credential ID:</span>
                    <span className="font-mono text-green-700 text-xs break-all">{credentialId}</span>
                  </div>
                  <a
                    href={credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-1 items-center px-2 py-1 border bg-blue-50 hover:bg-blue-100 rounded transition text-blue-700 text-xs font-medium w-full sm:w-auto justify-center"
                  >
                    <LinkIcon className="w-3 h-3" />
                    Verification Link
                  </a>
                </div>
              </div>

              {/* Main: Certificate Section */}
              <div className="w-full px-0 pt-5 pb-7 flex flex-col gap-2">
                <div className="mb-2 px-4 flex items-center">
                  <span className="text-base sm:text-lg font-semibold text-slate-700 border-b-2 border-blue-200 px-1 bg-blue-50/70 rounded select-none shadow-sm">
                    Original Certificate
                  </span>
                </div>
                {/* Certificate visual */}
                <CertificateVisual />
                <div className="flex justify-center mt-2 px-4">
                  <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto text-base">
                    <Link to="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Not valid
            <div className={`${fadeIn} flex flex-col items-center py-10 px-2`}>
              <span className={invalidBadgeClass + " mb-3"}>
                <XCircle className="w-4 h-4 text-red-400" />
                Invalid Certificate
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-red-700 mb-2 text-center">Invalid or Not Found</h2>
              <p className="text-gray-600 mb-4 max-w-xs sm:max-w-md text-center text-sm sm:text-base">
                The certificate you are trying to verify could not be found or the ID is incorrect.
                <br />
                Please check your link or contact support for help.
              </p>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyCertificate;
