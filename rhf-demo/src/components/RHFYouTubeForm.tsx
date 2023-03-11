import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let count = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const RHFYouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  count++;
  return (
    <div>
      <h1>YouTube Form ({count})</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
