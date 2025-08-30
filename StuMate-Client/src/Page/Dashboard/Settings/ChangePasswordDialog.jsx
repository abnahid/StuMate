import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { DrawerHeader, DrawerTitle } from "../../../components/ui/drawer";

export default function ChangePasswordDialog({
    open,
    onOpenChange,
    trigger,
}) {
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = () => {
        setShowComingSoon(true);
    };

    const handleDialogClose = () => {
        setShowComingSoon(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onOpenChange(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
                <DialogContent className="min-w-[612px] bg-white rounded-xl shadow-[0px_12px_40px_rgba(0,0,0,0.40)] p-0 flex-col overflow-hidden">
                    <DrawerHeader className="px-6 py-4 border-b border-gray-200 flex flex-row justify-between items-center">
                        <DrawerTitle className="text-lg font-bold text-gray-700">
                            Change Password
                        </DrawerTitle>

                    </DrawerHeader>

                    {/* Body */}
                    <div className="flex flex-col gap-4 px-6 py-6">
                        <PasswordField
                            label="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="*************"
                        />
                        <PasswordField
                            label="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="At least 8 characters"
                        />
                        <PasswordField
                            label="Retype New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Password must match"
                        />
                    </div>

                    {/* Actions */}
                    <DialogFooter className="px-6 pt-4 pb-6 bg-white flex justify-end items-center gap-2.5">
                        <Button
                            variant="outline"
                            className="px-[13px] py-2 bg-white rounded-[10px] outline-1 outline-offset-[-1px] outline-[#b9becf] text-[#595e70] text-[13px] font-semibold w-fit"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="default"
                            className="px-[13px] py-2 bg-[#415ad7] rounded-[10px] text-white text-[13px] font-semibold w-fit"
                            onClick={handleSubmit}
                        >
                            Set New Password
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Coming Soon Modal */}
            <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
                <DialogContent className="max-w-[340px] bg-white rounded-xl shadow-lg text-center flex flex-col items-center justify-center">
                    <DrawerHeader className="py-4">
                        <DrawerTitle className="text-lg font-bold text-gray-700">
                            Coming Soon!
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="pb-2 text-md text-gray-500">
                        Password change will be available soon.
                    </div>
                    <DialogFooter className="pb-4">
                        <Button
                            variant="default"
                            className="px-4 py-2 bg-[#415ad7] rounded-[10px] text-white text-[13px] font-semibold w-fit"
                            onClick={handleDialogClose}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

function PasswordField({
    label,
    value,
    onChange,
    placeholder,
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-[#595e70]">{label}</label>
            <input
                type="password"
                className="px-3 py-2 bg-white rounded-[10px]  outline-1 outline-[#e3e5ec] text-sm text-[#8c94ab]"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}