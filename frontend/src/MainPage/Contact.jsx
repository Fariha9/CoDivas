import { Link } from "react-router";
import { TfiCommentsSmiley } from "react-icons/tfi";

const Contact = () => {
  return (
    <>
    
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      <div
        className="flex flex-col justify-center py-10 px-8 lg:px-16 bg-white"
        data-aos="fade-right"
      >
        <h3 className="card-title font-bold items-center text-center text-5xl text-purple-700">Contact us</h3>
                <div className="text-xl">
                <p className="mt-6">You can contact us by sending us an email.</p>
                    <p className="mt-2">Email: CoDivas@gmail.com</p>
                <p className="mt-2">Or you can also send us a message.</p>
                </div>

        <img
          src="https://i.ibb.co.com/5hKzW8L4/contact.jpg"
          alt="Contact"
          className="max-w-md w-full animate-float"
        />
      </div>
      <div
        className="flex flex-col justify-center px-8 lg:px-20 bg-white"
        data-aos="fade-up"
      >
        <h3 className="card-title font-bold items-center text-center text-5xl text-purple-700">Fill up the form</h3>
        <form
                onSubmit={(e) => {
                e.preventDefault();
                document.getElementById('my_modal_1').showModal();
                e.target.reset();
                }}>
              <fieldset className="fieldset">
                <div className="font-bold text-xl mt-6">What is your name?</div>
                  <input type="text" className="input w-full" placeholder="Type here"/>
              </fieldset>
              <div className="font-bold text-xl mt-6">Your Email Address?</div>
              <input type="email" placeholder="Email"
                required
                className="input input-bordered w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200"/>
              <fieldset className="fieldset mt-6">
                <legend className="fieldset-legend font-bold text-xl">Tell us more about what you want to know or describe your issues</legend>
                <textarea className="textarea textarea-bordered w-full h-40 p-3" placeholder="Type here"></textarea>
              </fieldset>
              <div className="card-actions justify-end">
                <button type="submit" className="btn bg-purple-700 text-white hover:bg-purple-500 font-bold">Submit</button>
              </div>
            </form>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box bg-purple-200">
                <TfiCommentsSmiley size={70} className="mx-auto text-purple-800"/>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="text-lg text-center flex justify-center mt-4">
                  Thank you for contacting us. We have received your inquiries.
                  We will contact you shortly through your email.
                </h3>
              </div>
            </dialog>
      </div>
    </div>
    </>
  );
};

export default Contact;
