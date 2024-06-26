import { cookies } from "next/headers";
import AddNewContact from "../../_components/contact/add-new-contact";
import { contactColumns } from "../../_components/contact/contact-columns";
import { DataTable } from "../../_components/data-table";

const fetchContact = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_APP_URL + "/api/contact";
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        token: `${cookies().get("token")?.value}`,
      },
    });

    const data = await response.json();

    return data?.data;
  } catch (error: any) {
    console.error(error?.message);
  }
};

const Page = async () => {
  const contacts = await fetchContact();

  return (
    <div className="p-6">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="font-bold text-xl">Manage Your Contacts</h1>
          <p className="text-sm text-muted-foreground">
            Effortlessly organize, track, and connect with your leads and
            clients.
          </p>
        </div>
        <AddNewContact />
      </div>
      <DataTable
        columns={contactColumns}
        data={contacts}
        filterColumn="email"
        filterPlaceHolder="Filter by email ..."
      />
    </div>
  );
};

export default Page;
