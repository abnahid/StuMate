
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ProfileImageUploader from "./ProfileImageUploader";

const UserProfile = () => {
  const { user, setUser } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "name" or "photo"
  const [formName, setFormName] = useState(user.name);
  const [formPhoto, setFormPhoto] = useState(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

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

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-10 gap-10">
      {/* Profile Card */}
      <div className="w-[640px] px-6 py-5 bg-[#f2f3f8] rounded-lg border border-[#e3e5ec] flex flex-col gap-4">
        <ProfileImageUploader
          user={user}
          onChange={handlePhotoChange}
          onEdit={() => handleOpenModal("photo")}
        />
        <hr className="border-[#b9becf]" />
        <div>
          <h2 className="text-lg font-bold text-[#131314]">{user.name}</h2>
          <p className="text-sm font-medium text-[#8c94ab]">{user.email}</p>
        </div>
      </div>

      {/* Profile Settings Form */}
      <div className="w-[640px] flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#595e70]">Your name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="px-3 py-2 bg-white rounded-lg border border-[#e3e5ec] text-sm font-semibold text-[#131314] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Name"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#595e70]">Email address</label>
          <div className="px-3 py-2 bg-[#f2f3f8] rounded-lg border border-[#b9becf] opacity-70">
            <span className="text-sm font-semibold text-[#8c94ab]">{user.email}</span>
          </div>
        </div>

        {/* Password */}
        <div className="flex items-end gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs text-[#595e70]">Password</label>
            <div className="px-3 py-2 bg-white rounded-lg border border-[#e3e5ec]">
              <span className="text-sm font-semibold text-[#131314]">*************</span>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-white rounded-lg border border-[#b9becf] text-sm font-semibold text-[#595e70]"
            onClick={() => setChangePasswordOpen(true)}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Modal for Name / Photo */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] flex flex-col gap-4">
            <h3 className="text-lg font-bold">
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
                  <img src={formPhoto} alt="Preview" className="w-32 h-32 object-cover rounded-full mt-2" />
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
