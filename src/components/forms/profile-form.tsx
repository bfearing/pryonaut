import { useUser } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ProfileForm() {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(user, "user");

  return (
    <div className="flex flex-col gap-8">
      <form>
        <Label htmlFor="email">Email</Label>
        <Input
          className="mt-2"
          type="email"
          id="email"
          value={user?.primaryEmailAddress?.emailAddress}
          disabled
        />
      </form>
    </div>
  );
}
