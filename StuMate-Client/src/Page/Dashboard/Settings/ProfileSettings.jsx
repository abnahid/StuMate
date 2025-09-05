import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Skeleton } from "../../../components/ui/skeleton";
import useAuth from "../../../hooks/useAuth";
import { useProfile } from "../../../hooks/useProfile";
import { useToast } from "../../../hooks/useToast";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ProfileImageUploader from "./ProfileImageUploader";

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  university: z.string().optional(),
  department: z.string().optional(),
  grade: z.string().optional(),
});

function ProfileSkeleton() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-10 gap-10">
      <div className="w-full max-w-[640px] px-4 py-5 sm:px-6 bg-card rounded-lg border border-[#e3e5ec] flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
          <Skeleton className="h-5 w-32 sm:h-6 sm:w-40 mt-2" />
          <Skeleton className="h-4 w-40 sm:w-56" />
        </div>
        <hr className="border-[#b9becf]" />
      </div>

      <div className="w-full max-w-[640px] flex flex-col gap-4 px-4 sm:px-0">
        <Skeleton className="h-10 w-full sm:h-12" />
        <Skeleton className="h-10 w-full sm:h-12" />
        <Skeleton className="h-10 w-full sm:h-12" />
        <Skeleton className="h-10 w-full sm:h-12" />
        <Skeleton className="h-8 w-24 sm:h-10 sm:w-32" />
        <Skeleton className="h-6 w-32 sm:h-8 sm:w-48 mt-4" />
        <div className="flex flex-col sm:flex-row items-end gap-3 mt-2">
          <Skeleton className="h-6 w-24 sm:h-8 sm:w-32" />
          <Skeleton className="h-6 w-24 sm:h-8 sm:w-32" />
        </div>
      </div>
    </div>
  );
}

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const { profile, updateProfile, isLoading } = useProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "name" or "photo"
  const [formName, setFormName] = useState(user.name);
  const [formPhoto, setFormPhoto] = useState(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      university: '',
      department: '',
      grade: '',
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name || user?.displayName || '',
        university: profile.university || '',
        department: profile.department || '',
        grade: profile.grade || '',
      });
    }
  }, [profile, user, form]);

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    setFormName(user.name);
    setFormPhoto(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormPhoto(null);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    if (modalType === "photo" && formPhoto) {
      setUser({ ...user, photo: formPhoto });
    }
    if (modalType === "name" && formName) {
      setUser({ ...user, name: formName });
    }
    handleCloseModal();
  };

  const handleChangePassword = (current, newPass, confirm) => {
    if (newPass !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Current:", current, "New:", newPass);
    alert("Password changed successfully!");
  };

  const handleProfileSave = (values) => {
    updateProfile.mutate(values, {
      onSuccess: () => {
        toast({
          title: 'Profile Updated',
          description: 'Your profile information has been saved.',
        });
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Update Failed',
          description: 'Could not save your profile information.',
        });
      },
    });
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-6 sm:pt-10 gap-6 sm:gap-10">
      {/* Profile Card */}
      <div className="w-full max-w-[640px] px-4 py-5 sm:px-6 bg-card rounded-lg border border-[#e3e5ec] flex flex-col gap-4">
        <ProfileImageUploader
          user={user}
          onChange={handlePhotoChange}
          onEdit={() => handleOpenModal("photo")}
        />
        <hr className="border-[#b9becf]" />
        <div>
          <h2 className="text-base sm:text-lg font-bold text-card-foreground">{user.name}</h2>
          <p className="text-xs sm:text-sm font-medium text-[#8c94ab]">{user.email}</p>
        </div>
      </div>

      {/* Profile Settings Form */}
      <div className="w-full max-w-[640px] flex flex-col gap-4 px-4 sm:px-0">
        {/* Name */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleProfileSave)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University / School</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Harvard University" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department / Major</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade / Year</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2nd Year, 11th Grade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full sm:w-auto">
                {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#595e70]">Email address</label>
          <div className="px-3 py-2 bg-[#f2f3f8] rounded-lg border border-[#b9becf] opacity-70">
            <span className="text-xs sm:text-sm font-semibold text-[#8c94ab]">{user.email}</span>
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs text-[#595e70]">Password</label>
            <div className="px-3 py-2 bg-white rounded-lg border border-[#e3e5ec]">
              <span className="text-xs sm:text-sm font-semibold text-[#131314]">*************</span>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-white rounded-lg border border-[#b9becf] text-xs sm:text-sm font-semibold text-[#595e70] mt-2 sm:mt-0"
            onClick={() => setChangePasswordOpen(true)}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Modal for Name / Photo */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-[90vw] max-w-[400px] flex flex-col gap-4">
            <h3 className="text-base sm:text-lg font-bold">
              {modalType === "photo" ? "Change Profile Photo" : "Change Name"}
            </h3>

            {modalType === "name" && (
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none"
              />
            )}

            {modalType === "photo" && (
              <>
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                {formPhoto && (
                  <img src={formPhoto} alt="Preview" className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mt-2 mx-auto" />
                )}
              </>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Dialog */}
      <ChangePasswordDialog
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
        onChangePassword={handleChangePassword}
      />
    </div>
  );
};

export default UserProfile;