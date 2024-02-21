import { useLogin } from "@/hooks";
import { useAuth } from "@/store";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export function SignIn() {
  const { token } = useAuth();
  const mutation = useLogin();
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    let body = {
      username: data.username,
      password: data.password,
    };
    mutation.mutate(body);
  };

  const checkToken = () => {
    if (token) {
      navigate("/dashboard/home");
    }
  };

  useLayoutEffect(() => {
    checkToken();
  }, []);
  return (
    <section className="flex gap-4 w-full min-h-screen">
      <div className="w-full lg:flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("username", { required: true })}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("password", { required: true })}
            />
          </div>

          <Button
            type="submit"
            className="mt-6"
            fullWidth
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </div>
      <div className="w-1/2 bg-black hidden lg:flex items-center justify-center">
        <h1 className="text-yellow-400 text-center text-3xl animate-pulse font-bold uppercase">
          MUALAF CENTER <br /> KALIMANTAN SELATAN
        </h1>
      </div>
    </section>
  );
}

export default SignIn;
