import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let count = 0;

export const RHFYouTubeForm = () => {
  const form = useForm();
  const { register, control } = form;
  count++;
  return (
    <div>
      <h1>YouTube Form ({count})</h1>

      <form>
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
