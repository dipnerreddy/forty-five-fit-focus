
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CongratsMessageCard: React.FC = () => (
  <Card className="mt-6 border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
    <CardContent className="p-6 text-center">
      <h3 className="text-xl font-bold text-green-800 mb-2">🎉 Congratulations! 🎉</h3>
      <p className="text-green-700 leading-relaxed">
        You've completed an incredible journey of discipline and self-improvement. 
        This certificate represents your dedication to becoming the best version of yourself. 
        Add it to your LinkedIn profile to showcase your commitment to health and fitness!
      </p>
    </CardContent>
  </Card>
);

export default CongratsMessageCard;
