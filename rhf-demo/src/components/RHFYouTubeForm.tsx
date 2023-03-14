import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  address: {
    line1: string;
    line2: string;
  };
  addressArray: string[];
  age: number;
  dob: Date;
};

export const RHFYouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
      address: {
        line1: "",
        line2: "",
      },
      addressArray: ["", ""],
      age: 0,
      dob: new Date(),
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  const handleGetValues = () => {
    console.log("Get values", getValues("username"));
  };

  const handleSetValue = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // const watchUsername = watch("username");
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  renderCount++;
  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>

      {/* <h2>Watched value: {watchUsername}</h2> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: { value: true, message: "Username is required" },
          })}
        />
        <p className="error">{errors.username?.message}</p>

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: { value: true, message: "Channel is required" },
          })}
        />
        <p className="error">{errors.channel?.message}</p>

        <label htmlFor="address-line1">Address Line 1</label>
        <input
          type="text"
          id="address-line1"
          {...register("address.line1", {
            required: { value: true, message: "Address is required" },
          })}
        />
        <p className="error">{errors.address?.line1?.message}</p>

        <label htmlFor="address-line2">Address Line 2</label>
        <input
          type="text"
          id="address-line2"
          {...register("address.line2", {
            required: { value: true, message: "Address is required" },
            disabled: watch("address.line1") === "",
          })}
        />
        <p className="error">{errors.address?.line2?.message}</p>

        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true,
            required: { value: true, message: "Age is required" },
          })}
        />
        <p className="error">{errors.age?.message}</p>

        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          {...register("dob", {
            valueAsDate: true,
            required: { value: true, message: "Date of Birth is required" },
          })}
        />
        <p className="error">{errors.dob?.message}</p>

        <button type="button" onClick={handleGetValues}>
          Get values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set value
        </button>
        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
