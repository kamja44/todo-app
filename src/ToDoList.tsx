import { useForm } from "react-hook-form";
/*
function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
}
   */
interface IForm {
  Email: string;
  FirstName: string;
  LastName: string;
  Username: string;
  Password: string;
  Password1: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      Email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
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
          {...register("FirstName", { required: "FirstName is Required" })}
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
      </form>
    </div>
  );
}
export default ToDoList;
