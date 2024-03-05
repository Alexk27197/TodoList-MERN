import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { useState } from "react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && name && msg) {
      setEmail("");
      setMsg("");
      setName("");
      toast.success(
        "Received your details. We will get back to you as soon as possible."
      );
    }
  };

  const checkInputs = () => {
    if (email && name && msg) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  return (
    <Layout title={"Contact Us Page"}>
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                checkInputs();
              }}
              id="name"
              name="name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                checkInputs();
              }}
              name="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
                checkInputs();
              }}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={disabledBtn}
              className={`${
                disabledBtn ? "bg-slate-400" : ""
              } px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ContactUs;
