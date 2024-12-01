import { TabBar } from "@/components";


export default function CookiesPage() {
  return (
    <>
      <h1 className="text-3xl mb-4">Cookies page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2">

        <TabBar />
      </div>
    </>
  );
}