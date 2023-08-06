import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import useUser from "@/data/use-user";

export function ProfileForm() {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-8">
      <form>
        <Label htmlFor="email">Email</Label>
        <Input
          className="mt-2"
          type="email"
          id="email"
          value={user!.email}
          disabled
        />
      </form>
    </div>
  );
}
