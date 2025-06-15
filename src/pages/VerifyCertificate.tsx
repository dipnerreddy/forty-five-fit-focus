
import React from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function parseCredentialId(credentialId: string | undefined) {
  // Example format: FC45-NAME-USERID-2025
  if (!credentialId) return null;
  const parts = credentialId.split("-");
  if (parts.length !== 4 || !parts[0].startsWith("FC45")) return null;
  return {
    challenge: "45-Day Fitness Challenge",
    name: parts[1],
    userPart: parts[2],
    year: parts[3],
  };
}

const VerifyCertificate: React.FC = () => {
  const { credentialId } = useParams();
  const parsed = parseCredentialId(credentialId);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shadow-lg">
        <CardContent className="p-8 text-center">
          {parsed ? (
            <>
              <CheckCircle className="mx-auto text-green-600 w-16 h-16 mb-2" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Certificate Verified!
              </h2>
              <p className="text-green-700 mb-4">
                This certificate is an official record of completion for the <span className="font-semibold">{parsed.challenge}</span>.
              </p>
              <div className="mb-4">
                <div className="text-sm text-gray-900">
                  <span className="font-bold">Issued To: </span>
                  {parsed.name}
                </div>
                <div className="text-sm text-gray-900">
                  <span className="font-bold">Year: </span>
                  {parsed.year}
                </div>
                <div className="text-xs text-gray-500">
                  Certificate ID: <span className="font-mono">{credentialId}</span>
                </div>
              </div>
              <Button asChild>
                <Link to="/">Back to Home</Link>
              </Button>
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
