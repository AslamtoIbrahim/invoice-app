import type React from "react";
import { StatusContext } from "./status-context";
import { useState } from "react";


function StatusProvider({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState("");
    const value = {
        status,
        setStatus
    }
    return <StatusContext value={value}>
        {children}
    </StatusContext>
}


export default StatusProvider;