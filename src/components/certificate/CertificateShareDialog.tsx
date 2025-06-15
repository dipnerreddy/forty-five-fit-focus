import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Linkedin, Share2, MessageCircle, Copy } from "lucide-react";

interface CertificateShareDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  linkedInShareUrl: string;
  linkedInAddToProfileUrl: string;
  credentialId: string;
  credentialUrl: string;
  onCopyCredentialId: () => void;
  onCopyCredentialUrl: () => void;
}

const CertificateShareDialog: React.FC<CertificateShareDialogProps> = ({
  isOpen,
  setIsOpen,
  linkedInShareUrl,
  linkedInAddToProfileUrl,
  credentialId,
  credentialUrl,
  onCopyCredentialId,
  onCopyCredentialUrl,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full sm:w-auto border-orange-500 text-orange-600 hover:bg-orange-50">
          <Share2 className="mr-2 h-4 w-4" /> Share & Add to Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Achievement</DialogTitle>
          <DialogDescription>
            Add this certification to your professional profiles and share your accomplishment!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* LinkedIn Professional Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">LinkedIn</h4>
            <div className="space-y-2">
              <a 
                href={linkedInAddToProfileUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full"
              >
                <Button variant="outline" className="w-full justify-start">
                  <Linkedin className="mr-2 h-4 w-4 text-blue-600" /> 
                  Add to LinkedIn Profile
                </Button>
              </a>
              <a 
                href={linkedInShareUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full"
              >
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="mr-2 h-4 w-4 text-blue-600" /> 
                  Share on LinkedIn
                </Button>
              </a>
            </div>
          </div>

          {/* Other Sharing Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Other Platforms</h4>
            <a 
              href={`https://api.whatsapp.com/send?text=I%20just%20completed%20the%2045-Day%20Fitness%20Challenge!%20🏆%0A%0ACredential%20ID:%20${encodeURIComponent(credentialId)}%0AVerify:%20${encodeURIComponent(credentialUrl)}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full"
            >
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="mr-2 h-4 w-4 text-green-600" /> 
                Share on WhatsApp
              </Button>
            </a>
          </div>

          {/* Quick Copy Options */}
          <div className="space-y-2 pt-2 border-t">
            <h4 className="font-medium text-gray-900 text-sm">Quick Copy</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" onClick={onCopyCredentialId}>
                <Copy className="mr-1 h-3 w-3" /> Credential ID
              </Button>
              <Button size="sm" variant="outline" onClick={onCopyCredentialUrl}>
                <Copy className="mr-1 h-3 w-3" /> Verify URL
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateShareDialog;
