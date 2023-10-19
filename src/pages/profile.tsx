import { ProfileForm } from "@/components/forms/profile-form";
import PageHeader from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
// import useUser from "@/data/use-user";
import AppLayout from "@/layouts/AppLayout";
import { useUser } from "@clerk/nextjs";

export const metadata = {
  title: "Profile | Pryonaut",
  description: "",
  ogImage: "",
};

const ProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  console.log("isLoaded >>", isLoaded);
  console.log("isSignedIn >>", isSignedIn);
  console.log("user >>", user);

  return (
    <AppLayout meta={metadata}>
      <PageHeader
        title={`Welcome, ${user && user.firstName}!`}
        description="Have a look around for trusted space answers. Use the menu
              to view a list of all current, space-faring astronauts as well as
              the location of the International Space Station in real-time."
      />
      <Separator />
      <ProfileForm />
    </AppLayout>
  );
};

export default ProfilePage;
