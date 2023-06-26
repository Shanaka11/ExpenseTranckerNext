"use client";
import { useForm, SubmitHandler } from "react-hook-form";

const DashboardTransactionForm = () => {
  type FormInputs = {
    amount: number;
  };

  const { register, handleSubmit, reset } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-28 w-full flex-col justify-evenly align-middle md:col-span-2 md:h-full lg:col-span-1"
    >
      <input
        className="w-full rounded-lg border border-slate-300 p-2 text-right outline-blue-400"
        placeholder="New Transaction Amount"
        type="number"
        {...register("amount", { required: true })}
      />
      <button
        className="cursor-pointer rounded-lg bg-blue-400 p-1 text-white "
        type="submit"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default DashboardTransactionForm;
