import { AuthContext } from "@/context/AuthProvider";
import ThemeContext from "@/context/ThemeContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import imageCompression from "browser-image-compression";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProfileSettings = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const { isDarkMode } = useContext(ThemeContext);

  const [compressedImage, setCompressedImage] = useState(null);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (user?.email) {
          setLoading(true);
          const response = await axiosPublic.get(`/users/${user.email}`);
          setProfileData(response.data);
          setFormData(response.data || {});
        }
      } catch (err) {
        setError(err.message || "Failed to fetch user data");
        Swal.fire("Error", err.message || "Failed to fetch user data", "error");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, axiosPublic]);

  const openModal = (section) => {
    setActiveSection(section);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormData(profileData || {});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      try {
        // Compress and convert the image to WebP
        const options = {
          maxSizeMB: 1, // Maximum size in MB
          maxWidthOrHeight: 1024, // Maximum width or height
          useWebWorker: true, // Use web worker for performance
          fileType: "image/webp" // Convert the image to WebP format
        };

        const compressedFile = await imageCompression(imageFile, options);
        setFormData((prevData) => ({
          ...prevData,
          photoFile: compressedFile, // Store the compressed WebP file
        }));
      } catch (error) {
        console.error("Error compressing or converting image to WebP:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToUpdate = { ...formData };

      // Handle photo updates
      if (activeSection === "photo" && formData.photoFile) {
        const photoFormData = new FormData();
        photoFormData.append("image", formData.photoFile);

        const res = await axiosPublic.post(image_hosting_api, photoFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          dataToUpdate.photoUrl = res.data.data.display_url;

          // Call updateUserProfile with only photoURL
          await updateUserProfile(null, dataToUpdate.photoUrl);
        } else {
          throw new Error("Image upload failed. Please try again.");
        }
      }

      // Update data on the server
      await axiosPublic.patch(`/users/${user.email}`, dataToUpdate);

      // Update local state with the updated data
      setProfileData((prevData) => ({
        ...prevData,
        ...dataToUpdate,
      }));

      Swal.fire("Success", "Profile updated successfully!", "success");
      closeModal();
    } catch (err) {
      console.error("Error updating profile:", err);
      Swal.fire("Error", err.response?.data?.message || err.message || "Failed to update profile", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (loading) return <div className="p-4">Loading...</div>;
  if (!profileData) return <div className="p-4">No profile data found</div>;

  const userData = profileData;
  const userPhoto = userData?.photoUrl || user?.photoURL;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">


      {/* Profile Header with Photo */}
      <div
        className={`relative rounded-lg p-4 border ${isDarkMode
          ? "border-gray-600 bg-gray-800"
          : "border-gray-400 bg-white"
          }`}
      >
        <button
          onClick={() => openModal("photo")}
          className={`absolute top-4 right-4 flex items-center gap-1 ${isDarkMode
            ? "text-gray-300 hover:text-blue-400"
            : "text-gray-500 hover:text-blue-600"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span className="text-sm">Edit</span>
        </button>
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {userPhoto ? (
                <img
                  src={userPhoto || "https://avatar.iran.liara.run/public/20"}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://avatar.iran.liara.run/public/20";
                  }}
                />
              ) : (
                <div
                  className={`h-32 w-32 rounded-full flex items-center justify-center text-4xl font-bold border-4 shadow-md ${isDarkMode
                    ? "bg-gray-700 text-gray-300 border-gray-600"
                    : "bg-gray-300 text-gray-600 border-white"
                    }`}
                >
                  {userData?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "JD"}
                </div>
              )}
              <button
                onClick={() => openModal("photo")}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => openModal("photo")}
              className={`text-sm font-medium ${isDarkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-800"
                }`}
            >
              Change photo
            </button>
          </div>

          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold">
              {userData?.name || "No name"}
            </h1>
            <p
              className={`capitalize ${isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
            >
              {userData?.role || "No role"}
            </p>
            <p className={isDarkMode ? "text-gray-500" : "text-gray-600"}>
              {userData?.city
                ? `${userData.city}, ${userData.country}`
                : "No location"}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div
        className={`relative space-y-6 border p-4 rounded-lg ${isDarkMode
          ? "border-gray-600 bg-gray-800"
          : "border-gray-400 bg-white"
          }`}
      >
        <button
          onClick={() => openModal("personal")}
          className={`absolute top-4 right-4 flex items-center gap-1 ${isDarkMode
            ? "text-gray-300 hover:text-blue-400"
            : "text-gray-500 hover:text-blue-600"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span className="text-sm">Edit</span>
        </button>
        <h2
          className={`text-lg font-semibold border-b pb-2 ${isDarkMode ? "border-gray-700" : "border-gray-300"
            }`}
        >
          Personal information
        </h2>

        <div className="flex gap-14">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              First Name
            </label>
            <p className="font-medium">
              {userData?.name?.split(" ")[0] || "Not provided"}
            </p>
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Last Name
            </label>
            <p className="font-medium">
              {userData?.name?.split(" ").slice(1).join(" ") || "Not provided"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Email address
            </label>
            <p className="font-medium">{userData?.email || "Not provided"}</p>
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Phone
            </label>
            <p className="font-medium">{userData?.phone || "Not provided"}</p>
          </div>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
          >
            Bio
          </label>
          <p className="font-medium">{userData?.bio || "Not provided"}</p>
        </div>
      </div>



      <div
        className={`relative space-y-6 border rounded-lg p-4 ${isDarkMode
          ? "border-gray-600 bg-gray-800"
          : "border-gray-400 bg-white"
          }`}
      >
        <button
          onClick={() => openModal("address")}
          className={`absolute top-4 right-4 flex items-center gap-1 ${isDarkMode
            ? "text-gray-300 hover:text-blue-400"
            : "text-gray-500 hover:text-blue-600"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span className="text-sm">Edit</span>
        </button>
        <h2
          className={`text-lg font-semibold border-b pb-2 ${isDarkMode ? "border-gray-700" : "border-gray-300"
            }`}
        >
          Address
        </h2>

        <div className="flex gap-10">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Country
            </label>
            <p className="font-medium">{userData?.country || "Not provided"}</p>
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              City/State
            </label>
            <p className="font-medium">{userData?.city || "Not provided"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Postal Code
            </label>
            <p className="font-medium">
              {userData?.postalCode || "Not provided"}
            </p>
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              TAX ID
            </label>
            <p className="font-medium">{userData?.taxId || "Not provided"}</p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className={`modal modal-open ${isDarkMode ? "bg-BgDarkPrimary/80" : "bg-gray-500/80"
            }`}
        >
          <div
            className={`modal-box ${isDarkMode
              ? "bg-BgDarkSecondary text-gray-300 border border-BgDarkAccent"
              : "bg-white text-gray-800 border border-gray-300"
              }`}
          > {/* Added bg-white */}
            <h3 className="text-lg font-bold">Edit {activeSection} Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4 ">
              {activeSection === "photo" && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium">Upload Photo</label>

                  <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center">
                    {formData.photoFile && formData.photoFile instanceof Blob ? (
                      <div className="relative w-32 h-32 mb-3">
                        <img
                          src={URL.createObjectURL(formData.photoFile)}
                          alt="Preview"
                          className="object-cover w-full h-full rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, photoFile: null })}
                          className="absolute top-0 right-0 bg-white rounded-full p-1 text-red-500"
                        >
                          &times;
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <p>Drag & drop an image or click to browse</p>
                        <p className="text-xs">Supports jpg, png, jpeg, and converts to WebP</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="photoUploadInput"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="photoUploadInput"
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
                    >
                      Upload Photo
                    </label>
                  </div>
                </div>
              )}
              {activeSection === "personal" && (
                <>
                  <div>
                    <label className="block text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.name?.split(" ")[0] || ""}
                      onChange={(e) => {
                        const lastName = formData.name?.split(" ").slice(1).join(" ") || "";
                        setFormData((prev) => ({
                          ...prev,
                          name: `${e.target.value} ${lastName}`,
                        }));
                      }}
                      className={`w-full p-2 border rounded ${isDarkMode ? 'bg-BgDarkAccent text-white border-gray-600' : 'bg-white text-black border'
                        }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.name?.split(" ").slice(1).join(" ") || ""}
                      onChange={(e) => {
                        const firstName = formData.name?.split(" ")[0] || "";
                        setFormData((prev) => ({
                          ...prev,
                          name: `${firstName} ${e.target.value}`,
                        }));
                      }}
                      className={`w-full p-2 border rounded ${isDarkMode ? 'bg-BgDarkAccent text-white border-gray-600' : 'bg-white text-black border'
                        }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${isDarkMode ? 'bg-BgDarkAccent text-white border-gray-600' : 'bg-white text-black border'
                        }`}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio || ""}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full p-2 border rounded ${isDarkMode ? 'bg-BgDarkAccent text-white border-gray-600' : 'bg-white text-black border'
                        }`}
                    ></textarea>
                  </div>
                </>
              )}
              {activeSection === "address" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${isDarkMode ? 'bg-BgDarkAccent text-white border-gray-600' : 'bg-white text-black border'
                          }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${isDarkMode ? 'bg-BgDarkAccent text-white border-gray-600' : 'bg-white text-black border'
                          }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${isDarkMode ? 'bg-BgDarkAccent text-white border-gray-600' : 'bg-white text-black border'
                          }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">TAX ID</label>
                      <input
                        type="text"
                        name="taxId"
                        value={formData.taxId || ""}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${isDarkMode ? 'bg-BgDarkAccent text-white border-gray-600' : 'bg-white text-black border'
                          }`}
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="modal-action">
                <button type="button" onClick={closeModal} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn bg-BgPrimary" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div >
      )}

    </div >
  )
};
export default ProfileSettings;