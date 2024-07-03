import { useState } from "react";
import { useForm } from "react-hook-form";
interface IForm {
  toDo: string;
}
function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    console.log("add to do ", data.toDo); // input의 이름이 그대로 data에 들어감
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", {
            required: "Write TODO",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;

/*
interface IForm {
  Email: string;
  FirstName: string;
  LastName: string;
  Username: string;
  Password: string;
  Password1: string;
  extraError: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      Email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.Password !== data.Password1) {
      setError(
        "Password1",
        {
          message: "Password are not the same",
        },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "Server offline" });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("Email", {
            required: "Email is Required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.Email?.message}</span>
        <input
          {...register("FirstName", {
            required: "FirstName is Required",
            // validate: (value) => !value.includes("nico"),
          })}
          placeholder="FirstName"
        />
        <span>{errors?.FirstName?.message}</span>
        <input
          {...register("LastName", { required: "LastName is Required" })}
          placeholder="LastName"
        />
        <span>{errors?.LastName?.message}</span>
        <input
          {...register("Username", {
            required: "Username is Required",
            minLength: 10,
          })}
          placeholder="Username"
        />
        <span>{errors?.Username?.message}</span>
        <input
          {...register("Password", {
            required: "Password is Required",
            minLength: 5,
          })}
          placeholder="Password"
        />
        <span>{errors?.Password?.message}</span>
        <input
          {...register("Password1", {
            required: "Password is Required",
            minLength: {
              value: 5,
              message: "Your Password is too short",
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.Password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
export default ToDoList;
 */
