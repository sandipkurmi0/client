import { FC, Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Expense } from "../interface";
import { retrieveExpense } from "../service/expense";
import moment from "moment";

const ExpenseInfo: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [expenseState, setExpenseState] = useState<Expense[] | null>(null);

  const singleExpenseFilter = expenseState?.filter((item) => item._id === id);

  const IncomeAmount: any = expenseState
    ?.filter((item) => item.type === "Income")
    .reduce((prev, next) => prev + next.amount, 0);

  const ExpenseAmoutn: any = expenseState
    ?.filter((item) => item.type === "Expense")
    .reduce((prev, next) => prev + next.amount, 0);

  useEffect(() => {
    (async () => {
      const response = await retrieveExpense();
      if (response?.status === 200) {
        const { data } = response?.data;
        setExpenseState(data);
      }
    })();
  }, []);

  return (
    <Fragment>
      <header className="bg-white w-full mt-10"></header>
      <div className="flex flex-col bg-white m-auto p-auto">
        <div className="flex flex-nowrap ml-10 justify-around ">
          <div className="inline-block">
            <div className=" px-8 py-8 bg-gray-900 w-96 h-48 max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="flex  justify-around">
                <h1 className="text-4xl font-bold font-mono text-blue-500">
                  Total
                </h1>
                <span className="text-blue-500 dark:red-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </div>

              <h3 className="py-2 text-4xl font-bold font-mono mt-5 text-center">
                $ {(IncomeAmount + ExpenseAmoutn) / 100}
              </h3>
            </div>
          </div>
          <div className="inline-block">
            <div className=" px-8 py-8 bg-gray-900 w-96 h-48 max-w-xs overflow-hidden rounded-lg shadow-md  hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="flex  justify-around">
                <h1 className="text-4xl font-bold font-mono text-green-500">
                  Income
                </h1>
                <span className="text-green-500 dark:red-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </span>
              </div>

              <h3 className="py-2 text-4xl font-bold font-mono mt-5 text-center">
                ${IncomeAmount / 100}
              </h3>
            </div>
          </div>
          <div className="inline-block">
            <div className=" px-8 py-8 bg-gray-900 text-white w-96 h-48 max-w-xs overflow-hidden rounded-lg shadow-md  hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="flex  justify-around">
                <h1 className="text-4xl font-bold font-mono text-red-600">
                  Expense
                </h1>
                <span className="text-red-600 dark:red-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                    />
                  </svg>
                </span>
              </div>

              <h3 className="py-2 text-4xl font-bold font-mono mt-5 text-center ">
                ${ExpenseAmoutn / 100}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="antialiased max-w-6xl mx-auto my-12 px-8">
          <div className="relative block md:flex justify-center">
            <div className="w-full md:w-1/2 relative z-1 bg-gray-100 rounded shadow-lg overflow-hidden">
              {singleExpenseFilter?.map((item) => (
                <div key={item._id}>
                  <div className="text-lg font-medium text-green-500 uppercase p-8 text-center border-b border-gray-200 tracking-wide">
                    {item.expenseName}
                  </div>
                  <div className="flex justify-center mt-10">
                    <ul>
                      <li className="flex items-center">
                        <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg ml-3">
                          {item.amount / 100}
                        </span>
                      </li>
                      <li className="flex items-center mt-3">
                        <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg ml-3">
                          {item.expenseCatgory}
                        </span>
                      </li>
                      <li className="flex items-center mt-3">
                        <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg ml-3">
                          {item.paymentType}
                        </span>
                      </li>
                      <li className="flex items-center mt-3">
                        <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                          <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="primary"
                              d="M14 13h6.78a1 1 0 0 1 .97 1.22A10 10 0 1 1 9.78 2.25a1 1 0 0 1 1.22.97V10a3 3 0 0 0 3 3z"
                            />
                            <path
                              className="secondary"
                              d="M20.78 11H14a1 1 0 0 1-1-1V3.22a1 1 0 0 1 1.22-.97c3.74.85 6.68 3.79 7.53 7.53a1 1 0 0 1-.97 1.22z"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg ml-3">
                          {item.type}
                        </span>
                      </li>
                      <li className="flex items-center mt-3">
                        <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg ml-3">
                          {moment(item.expenseDate).calendar()}
                        </span>
                      </li>
                      <li className="flex items-center mt-3">
                        <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
                          <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="primary"
                              d="M14 13h6.78a1 1 0 0 1 .97 1.22A10 10 0 1 1 9.78 2.25a1 1 0 0 1 1.22.97V10a3 3 0 0 0 3 3z"
                            />
                            <path
                              className="secondary"
                              d="M20.78 11H14a1 1 0 0 1-1-1V3.22a1 1 0 0 1 1.22-.97c3.74.85 6.68 3.79 7.53 7.53a1 1 0 0 1-.97 1.22z"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg ml-3">
                          {item.description}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <span
                    onClick={() => navigate(-1)}
                    className=" flex items-center justify-center bg-gray-200 gap-2 cursor-pointer hover:bg-gray-300 p-8 text-md font-semibold text-gray-800 uppercase mt-10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                      />
                    </svg>

                    <span>Back</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ExpenseInfo;
