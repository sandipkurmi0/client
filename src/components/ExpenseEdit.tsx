import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { user, IsEdit, Expense } from "../interface";
import Swal from "sweetalert2";
import {
  createExpense,
  retriveOneExpense,
  updateExpense,
  deleteExpense,
} from "../service/expense";

type ExpenseForm = {
  expenseName: string;
  paymentType: string;
  amount: number;
  expenseCatgory: string;
  expenseDate?: Date;
  type: string;
  description: string;
};

const ExpenseEdit: FC<IsEdit> = ({ isEdit }) => {
  const userInfo: user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState<Expense | ExpenseForm | null>(null);

  const schema = yup.object().shape({
    expenseName: yup.string().required("Enter you Expense Title"),
    paymentType: yup.string().required("Enter your Payment Type"),
    amount: yup.number().required().positive().integer(),
    expenseCatgory: yup.string().required("Enter your Expense Category"),
    expenseDate: yup.date().required("This field is required"),
    type: yup.string().required("Enter Type of Account"),
    description: yup.string().max(100).required("Enter Description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseForm>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (!isEdit) {
      setForm({
        expenseName: "",
        paymentType: "",
        amount: 0,
        expenseCatgory: "",
        type: "",
        description: "",
      });
      return;
    }

    (async () => {
      try {
        const response = await retriveOneExpense(id);
        if (response) {
          setForm(response?.data.data);
        }
      } catch (error) {
        console.warn(error);
      }
    })();
  }, [id, isEdit]);

  const onSubmit: SubmitHandler<ExpenseForm> = async (payload: any) => {
    try {
      if (id) {
        payload.user = userInfo._id;
        const response = await updateExpense(id, payload);
        if (response?.status === 200) {
          navigate("/");
        }
        return;
      }

      payload.user = userInfo._id;
      const response = await createExpense(payload);
      if (response?.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const deleteHandle = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteExpense(id);
          if (response?.status === 200) {
            navigate("/");
          }
          Swal.fire("Deleted!", "Your Record has been deleted.", "success");
        }
      });
    } catch (error) {
      console.warn(error);
    }
  };

  if (form === null) {
    return <div className="flex justify-center py-80">Loading...</div>;
  }
  return (
    <div>
      <div className="">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 gap-3 dark:text-white md:text-5xl lg:text-4xl flex justify-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Budgeting Your Money
          </span>
          <span>Scalable AI.</span>
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 flex justify-center">
          YOU MUST GAIN CONTROL OVER YOUR MONEY OR THE LACK OF IT WILL FOREVER
          CONTROL YOU
        </p>
      </div>
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 ">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Expense Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                {...register("expenseName")}
                placeholder="Traval"
              />
              <p className="text-red-500 text-xs italic">
                {errors.expenseName?.message}
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-paymen"
              >
                Payment Type
              </label>
              <div className="relative">
                <select
                  {...register("paymentType")}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-paymen"
                >
                  <option value="Cash">Cash</option>
                  <option value="Debit Cards">Debit Cards</option>
                  <option value="Credit Cards">Credit Cards</option>
                  <option value="Online">Online</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                <p className="text-red-500 text-xs italic">
                  {errors.paymentType?.message}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-number"
              >
                $ amount
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-number"
                type="number"
                {...register("amount")}
                placeholder="$10"
              />
              <p className="text-red-500 text-xs italic">
                {errors.amount?.message}
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-Catgory"
              >
                expense Catgory
              </label>
              <div className="relative">
                <select
                  {...register("expenseCatgory")}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-Catgory"
                >
                  <option value="Housing">Housing</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Personal">Personal</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                <p className="text-red-500 text-xs italic">
                  {errors.expenseCatgory?.message}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-type"
              >
                Type
              </label>
              <div className="relative">
                <select
                  {...register("type")}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3  rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-type"
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                <p className="text-red-500 text-xs italic">
                  {errors.type?.message}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-Date"
              >
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register("expenseDate")}
                  id="grid-Date"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <p className="text-red-500 text-xs italic">
                  {errors.expenseDate?.message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-description"
              >
                Description
              </label>
              <input
                {...register("description")}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-description"
                type="text"
              />
              <p className="text-red-500 text-xs italic">
                {errors.description?.message}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {!isEdit && (
              <button type="submit">
                <span className="relative cursor-pointer rounded px-5 py-2.5 overflow-hidden group bg-green-500  hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">Create</span>
                </span>
              </button>
            )}

            {isEdit && (
              <button type="submit">
                <span className="relative cursor-pointer rounded px-5 py-2.5 overflow-hidden group bg-green-500  hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">Update</span>
                </span>
              </button>
            )}
            {isEdit && (
              <button onClick={deleteHandle}>
                <span className="relative cursor-pointer rounded px-5 py-2.5 overflow-hidden group bg-red-500  hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">Delete</span>
                </span>
              </button>
            )}
            <span
              onClick={() => navigate(-1)}
              className="inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700"
            >
              <svg
                className="w-6 h-6"
                data-darkreader-inline-stroke=""
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              <span>Back</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseEdit;
