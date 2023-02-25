import BlogTable from "@/src/components/BlogTable";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";

const ManageBlogPost = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  // GET ALL DATA
  useEffect(() => {
    axios("http://127.0.0.1:5000/data").then((res) => {
      setData(res.data.data);
      setLoading(false);
      setStatus();
    });
  }, [status]);
  return (
    <div>
      <Toaster />
      {loading ? (
        <div className="text-gray-500 italic text-center my-4">Loading...</div>
      ) : (
        <div className="w-[80%] mx-auto my-4">
          {data.length === 0 ? (
            <div className="text-gray-500 italic">
              No data available right now!
            </div>
          ) : (
            <div>
              <div className="container flex items-center justify-between px-6">
                <p className="text-xl font-semibold text-gray-500">ALL POST</p>
                <button
                  onClick={() => setOpen(true)}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-blue-500 bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add post
                </button>
              </div>
              <div className="">
                <section className="container px-4 mx-auto">
                  <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                >
                                  <div className="flex items-center gap-x-3">
                                    <span>Title</span>
                                  </div>
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                >
                                  <button className="flex items-center gap-x-2">
                                    <span>Description</span>
                                  </button>
                                </th>

                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                >
                                  Created At
                                </th>

                                <th
                                  scope="col"
                                  className="relative py-3.5 px-4"
                                >
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            {data?.map((data, i) => {
                              return (
                                <BlogTable
                                  key={data.id}
                                  data={data}
                                  setStatus={setStatus}
                                />
                              );
                            })}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      )}
      {open && (
        <PostCreateModal open={open} setOpen={setOpen} setStatus={setStatus} />
      )}
    </div>
  );
};

export default ManageBlogPost;

// POST MODAL
const PostCreateModal = ({ open, setOpen, setStatus }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`http://127.0.0.1:5000/create`, {
        title: data.title,
        description: data.description,
        url: data.url,
        like: 0,
      })
      .then((res) => {
        reset();
        setOpen(false);
        setStatus("Post created successfully");
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
