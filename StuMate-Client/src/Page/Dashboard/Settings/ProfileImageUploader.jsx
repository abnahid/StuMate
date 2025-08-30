import imageCompression from "browser-image-compression";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { DrawerClose, DrawerHeader, DrawerTitle } from "../../../components/ui/drawer";
import { Slider } from "../../../components/ui/slider";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function ProfileImageUploader() {
    const { user, setUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [open, setOpen] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [profileImage, setProfileImage] = useState(user.photoURL || null);
    const [tempImage, setTempImage] = useState(null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setFile(e.target.files[0]);
            setTempImage(url);
            setOpen(true);
        }
    };

    const handleSave = async () => {
        if (!file) return setOpen(false);

        setUploading(true);

        try {
            // Compress image
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
                fileType: "image/webp",
            };
            const compressedFile = await imageCompression(file, options);

            // Upload to imgbb
            const formData = new FormData();
            formData.append("image", compressedFile);

            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
                const imageUrl = res.data.data.display_url;

                // Update local state
                setProfileImage(imageUrl);
                setUser({ ...user, photoURL: imageUrl });

                // Update backend
                await axiosPublic.patch(`/users/${user.email}`, { photoURL: imageUrl });

                Swal.fire("Success", "Profile image updated!", "success");
            } else {
                throw new Error("Image upload failed. Please try again.");
            }
        } catch (err) {
            Swal.fire("Error", err.message || "Failed to upload image", "error");
        } finally {
            setUploading(false);
            setOpen(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <img
                    className="w-16 h-16 rounded-full"
                    src={profileImage || "/default-avatar.png"}
                    alt="Profile"
                />
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        id="profile-upload"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="profile-upload"
                        className="px-4 py-2 bg-white rounded-lg border border-[#b9becf] text-sm font-semibold text-[#595e70] cursor-pointer"
                    >
                        Upload New
                    </label>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[660px] bg-white rounded-xl shadow-xl p-0 flex-col overflow-hidden">
                    <DrawerHeader className="px-6 py-4 border-b border-gray-200 flex flex-row justify-between items-center">
                        <DrawerTitle className="text-lg font-bold text-gray-700">
                            Upload new profile image
                        </DrawerTitle>
                        <DrawerClose asChild>
                            <div className="p-[5px] rounded-full bg-WhiteSubtle cursor-pointer">
                                <RxCross2 className="text-[14px] text-Subtitle" />
                            </div>
                        </DrawerClose>
                    </DrawerHeader>

                    <div className="flex flex-col gap-6 p-6">
                        <div className="relative h-[340px] bg-muted rounded-md overflow-hidden">
                            <Cropper
                                image={tempImage || profileImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                            />
                        </div>

                        <div className="space-y-6">
                            <p className="text-sm font-medium">Drag to adjust image</p>
                            <Slider
                                value={[zoom]}
                                onValueChange={(val) => setZoom(val[0])}
                                min={1}
                                max={3}
                                step={0.1}
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => setOpen(false)} disabled={uploading}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={uploading}>
                                {uploading ? "Uploading..." : "Save Profile Image"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
