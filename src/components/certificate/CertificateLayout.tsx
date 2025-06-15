
import React, { RefObject } from "react";
import DesktopCertificate from "./DesktopCertificate";
import MobileCertificate from "./MobileCertificate";

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
  const commonProps = {
    certificateRef,
    name,
    routine,
    date,
    streak,
    credentialId,
    credentialUrl,
    onCopyCredentialUrl,
  };

  if (variant === "mobile") {
    return <MobileCertificate {...commonProps} />;
  }

  return <DesktopCertificate {...commonProps} />;
};

export default CertificateLayout;
