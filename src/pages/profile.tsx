import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";
import { ProfileForm } from "@/components/profile-form";
import AppLayout from "@/layouts/AppLayout";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const ProfilePage = () => {
  return (
    <AppLayout>
      <div className="flex-1 lg:max-w-2xl">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Hey, [username]!</h3>
            <p className="text-sm text-muted-foreground">
              Welcome to Pryonaut! This is how others will see you on the site.
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
