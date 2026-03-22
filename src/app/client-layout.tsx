"use client";

import Sidebar from "@/components/ui/Sidebar";
import PageTransition from "@/components/ui/PageTransition";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <PageTransition>{children}</PageTransition>
        </div>
    );
}
