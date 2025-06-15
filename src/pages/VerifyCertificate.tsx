
import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, XCircle, Link as LinkIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CertificateLayout from "@/components/certificate/CertificateLayout";

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
  const name = parsed?.name.replace(/([A-Z])/g, " $1").trim() || "";
  const showCertificate = !!parsed;

  // Credential URL
  const credentialUrl = credentialId
    ? `${window.location.origin}/verify/${credentialId}`
    : "";

  // Animations and style classes
  const fadeIn = "animate-fade-in";
  const cardBg =
    "bg-gradient-to-br from-emerald-50 via-white to-blue-50/70 dark:from-slate-800 dark:via-slate-900 dark:to-blue-900/40";
  const badgeClass =
    "inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 shadow-sm";
  const invalidBadgeClass =
    "inline-flex items-center gap-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 shadow-sm";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-2 py-4 sm:p-4 ${cardBg}`}
      style={{ minHeight: "100dvh" }} // For mobile viewport support
    >
      <Card className="w-full max-w-xl mx-auto rounded-2xl shadow-2xl border-0 overflow-hidden">
        <CardContent className="p-0 md:p-0">
          {showCertificate ? (
            <div className={fadeIn}>
              <div className="flex flex-col items-center bg-gradient-to-b from-green-50/70 to-white py-6 px-2 sm:px-4 border-b">
                <span className={badgeClass + " mb-3"}>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Certificate Verified
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-green-800 mb-2 tracking-tight flex items-center text-center">
                  <span className="mr-1">Congratulations!</span>
                  <span role="img" aria-label="confetti" className="text-2xl">🎉</span>
                </h2>
                <p className="text-green-700 mx-auto text-sm sm:text-base mb-3 text-center max-w-sm sm:max-w-xl">
                  This certificate is an <b>official record of completion</b> for the <span className="font-bold">{parsed.challenge}</span>.
                  The credential is <span className="text-green-800 font-semibold">valid</span> and issued in <b>{parsed.year}</b>.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-xs sm:max-w-full justify-center my-2">
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

              <div className="bg-white dark:bg-slate-900 px-1 xs:px-2 sm:px-6 py-6 flex flex-col gap-2">
                <h3 className="text-base sm:text-lg text-gray-700 font-semibold mb-1 text-center">
                  Original Certificate
                </h3>
                <div className="mb-5 flex items-center justify-center">
                  <div className="w-full max-w-full overflow-x-auto">
                    {/* Provide a responsive certificate view with horizontal scroll for small screens */}
                    <div className="min-w-[320px] max-w-xl mx-auto">
                      <CertificateLayout
                        certificateRef={certificateRef}
                        name={name}
                        routine={routine}
                        date={`Year: ${parsed.year}`}
                        streak={streak}
                        credentialId={parsed.credentialId}
                        credentialUrl={credentialUrl}
                        onCopyCredentialUrl={() => {
                          navigator.clipboard.writeText(credentialUrl);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto text-base">
                    <Link to="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
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

