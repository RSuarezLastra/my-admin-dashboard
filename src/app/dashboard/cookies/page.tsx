import { cookies } from 'next/headers'
import { TabBar } from "@/components";

export default async function CookiesPage() {

  const cookieStore = await cookies();
  const tab = Number(cookieStore.get('selectedTab')?.value ?? '1');

  return (
    <>
      <h1 className="text-3xl mb-4">Cookies page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2">

        <TabBar currentTab={tab} />
      </div>
    </>
  );
}