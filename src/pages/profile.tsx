import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";
import { ProfileForm } from "@/components/profile-form";
import AppLayout from "@/layouts/AppLayout";
import useUser from "@/data/use-user";
import { TypeAnimation } from "react-type-animation";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const ProfilePage = () => {
  const { user } = useUser();

  return (
    <AppLayout>
      <div className="flex-1 lg:max-w-2xl">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">
              Welcome, {user && user.name}!
            </h3>
            <p className="inline-block min-h-[40px] text-sm text-muted-foreground">
              Have a look around for trusted space answers. Use the sidebar menu
              to view a list of all current, space-faring astronauts as well as
              the location of the International Space Station in real-time.
            </p>
          </div>
          <Separator />
          <ProfileForm />
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
