"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { PhoneCall, Mail,Phone } from "lucide-react";
import Image from "next/image";

export function AgentCard() {
  return (
    <Card className="p-4 w-full">
              <h3 className="text-lg text-primaryText font-semibold pb-2">Assigned Agent Information</h3>

      <div className="bg-emerald-50 p-2 rounded-lg w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">

          <div className="flex justify-center w-full mb-4">
            <Image src="/assets/images/Avatar.png" alt= "imag" width={100} height={100}/>

        </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-700">Abel Hedeto</h3>
              <div className="flex  flex-col items-center  text-emerald-600">
                <div className="flex items-center mr-16 gap-1">
                  <Phone className="w-4 h-4 " />Phone No:
                  <span className="font-semibold">091022022</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />Email:
                  <span className="font-semibold">abel.hedet@lersha.com</span>
                </div>
              </div>
            </div>
          </div>
          <PhoneCall className="w-8 h-14 mr-4 text-emerald-600" />
        </div>
      </div>
    </Card>
  );
}