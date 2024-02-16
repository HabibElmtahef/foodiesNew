"use client"

import BreadCrumb from "@/components/breadcrumb";
import OffeTable from "@/components/tables/offre-table/OffeTable";
import { UserClient } from "@/components/tables/user-tables/client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { users } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const breadcrumbItems = [{ title: "Les Offres", link: "/dashboard/offres" }];
export default function page() {
  const router = useRouter()
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
        <Heading
          title={`Les Offres`}
          description="Manage Votre Offres"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator className="my-6" />
        <OffeTable />
      </div>
    </>
  );
}
