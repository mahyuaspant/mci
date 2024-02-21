import React from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Textarea,
} from "@material-tailwind/react";

export default function SetupModal({ open = false, handleOpen, children }) {
    return (
        <>
            <Dialog
                size="xl"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none "
            >
                {children}
            </Dialog>
        </>
    );
}
