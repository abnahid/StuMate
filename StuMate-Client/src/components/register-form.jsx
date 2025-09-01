import { useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaGoogle, FaTimes } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { AuthContext } from "./../context/AuthProvider";
import useAxiosPublic from "./../hooks/useAxiosPublic";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function RegisterForm({ className, ...props }) {
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [type, setType] = useState("password");
  const { createUser, updateUserProfile, setUser, googleLogin } =
    useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const axiosPublic = useAxiosPublic();

  const PASSWORD_REQUIREMENTS = [
    { regex: /.{6,}/, text: "At least 6 characters" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  ];

  const STRENGTH_CONFIG = {
    colors: {
      0: "text-border",
      1: "text-red-500",
      2: "text-orange-500",
      3: "text-amber-500",
      4: "text-emerald-500",
    },
    texts: {
      0: "Enter a password",
      1: "Weak password",
      2: "Medium password!",
      3: "Strong password!!",
      4: "Very Strong password!!!",
    },
  };

  const calculateStrength = useMemo(() => {
    const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
      met: req.regex.test(password),
      text: req.text,
    }));
    return {
      score: requirements.filter((req) => req.met).length,
      requirements,
    };
  }, [password]);

  const handleGoogle = () => {
    googleLogin()
      .then((result) => {
        const email = result.user?.email;
        const name = result.user?.displayName;
        const photoUrl = result.user?.photoURL;

        if (!email || !name) {
          toast.error("Missing user info from Google");
          return;
        }

        const userInfo = {
          email,
          name,
          photoUrl,
          createdAt: new Date().toISOString(),
        };

        axiosPublic.post("/users", userInfo).then((res) => {

          if (res.data.insertedId || res.data.message === "user already exists") {
            navigate("/");
          } else {
            toast.error("User not saved to DB");
          }
        });
      })
      .catch((error) => toast.error(`Google Login Failed: ${error.message}`));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    const photoUrl =
      "https://i.ibb.co/rQr6L83/default-avatar-icon-of-social-media-user-vector.jpg";
    const createdAt = new Date().toISOString();

    if (name.length < 5) {
      setError({ ...error, name: "Name should be more than 5 characters" });
      return;
    }

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (calculateStrength.score < 4) {
      toast.error("Password does not meet complexity requirements");
      return;
    }

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);

        updateUserProfile(name, photoUrl)
          .then(() => {
            const userInfo = {
              name,
              email,
              photoUrl,
              createdAt,
            };

            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                toast.success("User created successfully 🎉"); // ✅ show toast
                navigate("/"); // ✅ redirect homepage
              }
            });
          })
          .catch((err) => {
            console.error(err);
            toast.error(`Error updating profile: ${err.message}`);
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error(`Error creating user: ${err.message}`);
      });
  };



  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">User Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Enter user name"
            required
          />
          {error.name && (
            <label className="label text-sm text-red-500">{error.name}</label>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <HoverCard openDelay={200}>
              <HoverCardTrigger>
                <IoMdInformationCircleOutline
                  size={20}
                  className={`cursor-pointer  ${STRENGTH_CONFIG.colors[calculateStrength.score]
                    } transition-all `}
                />
              </HoverCardTrigger>
              <HoverCardContent className="bg-background">
                <ul className="space-y-1.5" aria-label="Password requirements">
                  {calculateStrength.requirements.map((req, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      {req.met ? (
                        <FaCheck size={16} className="text-emerald-500" />
                      ) : (
                        <FaTimes
                          size={16}
                          className="text-muted-foreground/80"
                        />
                      )}
                      <span
                        className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"
                          }`}
                      >
                        {req.text}
                        <span className="sr-only">
                          {req.met
                            ? " - Requirement met"
                            : " - Requirement not met"}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              aria-invalid={calculateStrength.score < 4}
              aria-describedby="password-strength"
              className="w-full p-2 border-2 rounded-md bg-background outline-none focus-within:border-blue-700 transition"
            />
            <button
              type="button"
              onClick={() => setIsVisible((prev) => !prev)}
              aria-label={isVisible ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 outline-none flex items-center justify-center w-9 text-muted-foreground/80 hover:text-foreground"
            >
              {isVisible ? <LuEyeOff size={16} /> : <LuEye size={16} />}
            </button>
          </div>

          <Button type="submit" className="w-full">
            Register
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogle}>
            <FaGoogle />
            Login with Google
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Login here
          </Link>
        </div>
      </div>
    </form>
  );
}
