import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/forms/profile-form";
import AppLayout from "@/layouts/AppLayout";
import useUser from "@/data/use-user";
import PageHeader from "@/components/page-header";

export const metadata = {
  title: "Profile | Pryonaut",
  description: "",
  ogImage: "",
};

const ProfilePage = () => {
  const { user } = useUser();

  return (
    <AppLayout meta={metadata}>
      <PageHeader
        title={`Welcome, ${user && user.name}!`}
        description="Have a look around for trusted space answers. Use the sidebar menu
              to view a list of all current, space-faring astronauts as well as
              the location of the International Space Station in real-time."
      />
      <Separator />
      <ProfileForm />
    </AppLayout>
  );
};

export default ProfilePage;
