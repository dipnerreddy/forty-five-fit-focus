
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, Copy } from "lucide-react";

interface CredentialInfoCardProps {
  credentialId: string;
  credentialUrl: string;
  onCopyCredentialId: () => void;
  onCopyCredentialUrl: () => void;
}

const CredentialInfoCard: React.FC<CredentialInfoCardProps> = ({
  credentialId,
  credentialUrl,
  onCopyCredentialId,
  onCopyCredentialUrl,
}) => (
  <Card className="mt-6 border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
    <CardContent className="p-6">
      <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
        <CheckCircle className="h-5 w-5" />
        Official Credential Information
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-blue-700">Credential ID</Label>
          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
            <code className="flex-1 text-sm font-mono text-gray-800">{credentialId}</code>
            <Button size="sm" variant="outline" onClick={onCopyCredentialId}>
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-blue-700">Verification URL</Label>
          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
            <code className="flex-1 text-sm font-mono text-gray-800 truncate">{credentialUrl}</code>
            <Button size="sm" variant="outline" onClick={onCopyCredentialUrl}>
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      <p className="text-sm text-blue-600 mt-3">
        💡 Use this credential information when adding this certification to your LinkedIn profile or resume.
      </p>
    </CardContent>
  </Card>
);

export default CredentialInfoCard;
