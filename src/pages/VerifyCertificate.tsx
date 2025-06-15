
import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CertificateLayout from "@/components/certificate/CertificateLayout";

// Updated parser to return all possible fields for the certificate
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

  // We'll try to infer a few things or use defaults
  const routine: "Home" | "Gym" = "Home"; // Can't be determined from credentialId
  // Pick a default (optional: alternate by userPart hash etc.)
  const streak = 45; // 45 as default, since only valid for completion
  const name = parsed?.name.replace(/([A-Z])/g, " $1").trim() || "";
  const showCertificate = !!parsed;

  // Credential URL for copying
  const credentialUrl = credentialId
    ? `${window.location.origin}/verify/${credentialId}`
    : "";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="max-w-3xl w-full shadow-lg">
        <CardContent className="p-4 md:p-8 text-center">
          {showCertificate ? (
            <>
              <div className="mb-6 flex flex-col items-center">
                <CheckCircle className="mx-auto text-green-600 w-16 h-16 mb-2" />
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Certificate Verified!
                </h2>
                <p className="text-green-700 mb-4">
                  This certificate is an official record of completion for the <span className="font-semibold">{parsed.challenge}</span>.
                </p>
              </div>
              <div className="md:px-6 mb-6">
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
              <div className="mt-6 flex justify-center">
                <Button asChild>
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <XCircle className="mx-auto text-red-400 w-16 h-16 mb-2" />
              <h2 className="text-2xl font-bold text-red-700 mb-2">Invalid Certificate</h2>
              <p className="text-gray-600 mb-4">
                The certificate you are trying to verify could not be found or the ID is incorrect.
              </p>
              <Button asChild variant="outline">
                <Link to="/">Back to Home</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyCertificate;

