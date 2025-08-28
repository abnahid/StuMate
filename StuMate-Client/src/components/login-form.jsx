import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../context/AuthProvider";

export function LoginForm({ className, ...props }) {
  const { loginUser, setUser, googleLogin } = useContext(AuthContext);
  const [type, setType] = useState("password");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogle = () => {
    googleLogin()
      .then((result) => {
        navigate("/");
      })
      .catch((error) => toast.error(`Google Login Failed: ${error.message}`));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userCaptchaValue = e.target.captcha?.value;

    if (!validateCaptcha(userCaptchaValue)) {
      toast.error("Invalid captcha. Please try again.");
      return;
    }

    loginUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success(`User Login successfully: ${user.email}`);
        e.target.reset();
        setUser(user);
        navigate(location?.state?.from || "/");
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
  };

  const handleGuestLogin = () => {
    // Automatically log in with guest credentials and skip captcha validation
    const guestEmail = "guest@abnahid.com";
    const guestPassword = "guest2@Ab";
    loginUser(guestEmail, guestPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success(`Guest login successful: ${user.email}`);
        setUser(user);
        navigate(location?.state?.from || "/");
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const togglePasswordVisibility = () => {
    setType(type === "password" ? "text" : "password");
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="ml-auto text-sm text-muted-foreground"
            >
              {type === "password" ? "Show" : "Hide"} Password
            </button>
          </div>

          <Input id="password" type={type} name="password" required />
        </div>
        <div className="grid gap-2">
          <label className="label">
            <LoadCanvasTemplate />
          </label>
          <Input
            onBlur={handleValidateCaptcha}
            type="text"
            name="captcha"
            placeholder="type the captcha above"
          />
        </div>
        <Button type="submit" className="w-full" disabled={disabled}>
          Login
        </Button>
        <Button type="button" variant="outline" className="w-full" onClick={handleGuestLogin}>
          Login as Guest
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          <svg className="w-4" viewBox="0 0 533.5 544.3">
            <path
              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
              fill="#4285f4"
            />
            <path
              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
              fill="#34a853"
            />
            <path
              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
              fill="#fbbc04"
            />
            <path
              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
              fill="#ea4335"
            />
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
