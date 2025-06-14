
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface LogoutSectionProps {
  onLogout: () => void;
}

const LogoutSection = ({ onLogout }: LogoutSectionProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default LogoutSection;
