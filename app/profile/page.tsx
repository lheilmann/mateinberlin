import UserDetails from "./UserDetails";
import SignOut from "./SignOut";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Profil</h1>
      <UserDetails />
      <SignOut />
    </div>
  );
}
