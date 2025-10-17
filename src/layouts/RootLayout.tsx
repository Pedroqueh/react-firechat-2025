import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
};

export default RootLayout;
