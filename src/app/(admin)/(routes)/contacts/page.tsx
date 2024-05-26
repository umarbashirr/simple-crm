import AddNewContact from "../../_components/contact/add-new-contact";
import { cookies } from "next/headers";
import { DataTable } from "../../_components/data-table";
import { contactColumns } from "../../_components/contact/contact-columns";

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
    <div>
      <div className="p-4">
        <h1 className="font-semibold text-xl">Contact List</h1>
        <p className="text-sm">
          Here you can see the list of all your contacts
        </p>
      </div>
      <div className="bg-white m-4 p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-end">
          <AddNewContact />
        </div>
        <div>
          <DataTable
            columns={contactColumns}
            data={contacts}
            filterColumn="email"
            filterPlaceHolder="Filter by email ..."
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
