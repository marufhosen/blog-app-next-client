import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import { useForm } from "react-hook-form";

const BlogTable = ({ data, setStatus }) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(false);
  // HANDLE DELETE POST
  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/delete?id=${id}`)
      .then((res) => {
        setStatus("Deleted sucessfully");
        toast.success(res?.data?.message, {
          position: "top-center",
          duration: 3000,
        });
      })
      .catch((err) => {
        toast.error("Something went wrong! Try again", {
          position: "top-center",
          duration: 3000,
        });
      });
  };
  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200">
        <Toaster />
        <tr>
          <td className="px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap">
            <div className="inline-flex items-center gap-x-3">
              <div className="flex items-center gap-x-2">
                <Image
                  width={500}
                  height={500}
                  className="object-cover w-10 h-10 rounded-full"
                  src={data?.url}
                  alt=""
                />
                <div>
                  <h2 className="font-medium text-gray-800">{data?.title}</h2>
                </div>
              </div>
            </div>
          </td>
          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
            {`${data?.description?.substring(0, 20)}...`}
          </td>
          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
            {data?.created_at?.split("T")[0]}
          </td>
          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <div className="flex items-center gap-x-6">
              <button
                onClick={() => handleDelete(data?._id)}
                className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  setEditData(data);
                  setOpen(true);
                }}
                className="text-gray-500 transition-colors duration-200  hover:text-yellow-500 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      {open && (
        <PostEditModal
          open={open}
          setOpen={setOpen}
          editData={editData}
          setStatus={setStatus}
        />
      )}
    </>
  );
};

export default BlogTable;

// POST MODAL
const PostEditModal = ({ open, setOpen, editData, setStatus }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  //   SET DEFAULI VALUE
  useEffect(() => {
    if (editData) {
      setValue("title", editData.title);
      setValue("description", editData.description);
      setValue("url", editData.url);
    }
  }, [editData, setValue]);

  //   SUBMIT UPDATE DATA
  const onSubmit = (data) => {
    if (editData) {
      axios
        .put(`http://127.0.0.1:5000/update?id=${editData._id}`, {
          title: data.title,
          description: data.description,
          url: data.url,
        })
        .then((res) => {
          reset();
          setOpen(false);
          setStatus("Post updated successfully");
          toast.success(res?.data?.message, {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((err) => {
          toast.error("Something went wrong! Try again", {
            position: "top-center",
            duration: 3000,
          });
        });
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="w-full">
                      <div>
                        <label for="title" class="block text-sm text-gray-800">
                          Title
                        </label>
                        <input
                          type="text"
                          {...register("title")}
                          class="block text-sm w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                      <div>
                        <label for="img" class="block text-sm text-gray-800">
                          Image url
                        </label>
                        <input
                          type="text"
                          {...register("url")}
                          class="block text-sm w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                      <div>
                        <label for="img" class="block text-sm text-gray-800">
                          Description
                        </label>
                        <textarea
                          {...register("description")}
                          rows={4}
                          class="block text-sm w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
