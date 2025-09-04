import { Button } from "../components/ui/button";

const ContactPage = () => {
  return (
    <section className="bg-background py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Side */}
          <div className="col-span-12 lg:col-span-6" >
            <div className="font-bold font-Syne leading-none flex flex-wrap flex-col gap-y-2 mb-10">
              <span className="text-primary text-xl">Contact</span>
              <h3 className="text-black-800 text-4xl lg:text-5xl xl:text-[64px] tracking-[-1.5px]">
                <span className="">
                  Le
                </span>
                t’s
                <br className="hidden lg:block" />
                connect
              </h3>
            </div>

            <div className="flex flex-wrap flex-col gap-7">
              <div className="flex flex-wrap gap-4 pb-4 border-b border-gray-300 lg:max-w-[416px]">
                <span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="text-black dark:text-white"
                  >
                    <path
                      d="M5.33366 5.33325H26.667C28.1337 5.33325 29.3337 6.53325 29.3337 7.99992V23.9999C29.3337 25.4666 28.1337 26.6666 26.667 26.6666H5.33366C3.86699 26.6666 2.66699 25.4666 2.66699 23.9999V7.99992C2.66699 6.53325 3.86699 5.33325 5.33366 5.33325Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M29.3337 8L16.0003 17.3333L2.66699 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div className="flex flex-wrap flex-col flex-1">
                  <span className="paragraph !leading-none">Email us</span>
                  <h5 className="text-xl font-bold font-Syne text-black-800 leading-7">
                    info@stumate.com
                  </h5>
                </div>
              </div>
              {/* Phone */}
              <div className="flex flex-wrap gap-4 pb-4 border-b border-gray-300 lg:max-w-[416px]">
                <span>
                  {/* Phone Icon */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-black dark:text-white"
                  >
                    <path
                      d="M20.0663 6.66658C21.3686 6.92067 22.5654 7.55759 23.5037 8.49583C24.4419 9.43407 25.0788 10.6309 25.3329 11.9333M20.0663 1.33325C22.772 1.63383 25.295 2.84548 27.2212 4.76926C29.1474 6.69304 30.3623 9.2146 30.6663 11.9199M29.3329 22.5599V26.5599C29.3344 26.9313 29.2584 27.2988 29.1096 27.639C28.9608 27.9793 28.7427 28.2847 28.469 28.5357C28.1954 28.7868 27.8724 28.9779 27.5206 29.0969C27.1688 29.2158 26.7961 29.26 26.4263 29.2266C22.3234 28.7808 18.3823 27.3788 14.9196 25.1333C11.698 23.0861 8.9667 20.3548 6.91959 17.1333C4.66622 13.6549 3.26391 9.69458 2.82625 5.57325C2.79293 5.20454 2.83675 4.83293 2.95492 4.48208C3.07309 4.13124 3.26301 3.80884 3.51261 3.53541C3.7622 3.26199 4.06599 3.04353 4.40464 2.89395C4.74329 2.74436 5.10937 2.66693 5.47959 2.66659H9.47959C10.1267 2.66022 10.754 2.88936 11.2446 3.3113C11.7352 3.73323 12.0557 4.31918 12.1463 4.95992C12.3151 6.24001 12.6282 7.49689 13.0796 8.70659C13.259 9.18382 13.2978 9.70247 13.1915 10.2011C13.0851 10.6997 12.8381 11.1574 12.4796 11.5199L10.7863 13.2133C12.6843 16.5513 15.4482 19.3152 18.7863 21.2133L20.4796 19.5199C20.8421 19.1614 21.2998 18.9144 21.7984 18.808C22.297 18.7017 22.8157 18.7405 23.2929 18.9199C24.5026 19.3713 25.7595 19.6844 27.0396 19.8533C27.6873 19.9446 28.2788 20.2709 28.7016 20.7699C29.1245 21.269 29.3491 21.906 29.3329 22.5599Z"
                      stroke="currentColor"

                      strokeOpacity="0.9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="flex flex-wrap flex-col flex-1">
                  <span className="paragraph !leading-none">Call us</span>
                  <h5 className="text-xl font-bold font-Syne text-black-800 leading-7">
                    +880 9611-458506
                  </h5>
                </div>
              </div>
              {/* Address */}
              <div className="flex flex-wrap gap-4 pb-4 border-b border-gray-300 lg:max-w-[416px]">
                <span>
                  {/* Address Icon */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-black dark:text-white"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 29C6 28.4477 6.44772 28 7 28H25C25.5523 28 26 28.4477 26 29C26 29.5523 25.5523 30 25 30H7C6.44772 30 6 29.5523 6 29Z"
                      fill="currentColor"


                      fillOpacity="0.9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 10C14.3431 10 13 11.3431 13 13C13 14.6569 14.3431 16 16 16C17.6569 16 19 14.6569 19 13C19 11.3431 17.6569 10 16 10ZM11 13C11 10.2386 13.2386 8 16 8C18.7614 8 21 10.2386 21 13C21 15.7614 18.7614 18 16 18C13.2386 18 11 15.7614 11 13Z"
                      stroke="currentColor"

                      fillOpacity="0.9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 4C13.6131 4 11.3239 4.94821 9.63604 6.63604C7.94821 8.32387 7 10.6131 7 13C7 17.1399 9.31185 20.9096 11.7546 23.7188C12.9638 25.1094 14.1755 26.2305 15.0851 27.0037C15.4449 27.3095 15.7562 27.5599 16 27.75C16.2438 27.5599 16.5551 27.3095 16.9149 27.0037C17.8245 26.2305 19.0362 25.1094 20.2454 23.7188C22.6882 20.9096 25 17.1399 25 13C25 10.6131 24.0518 8.32387 22.364 6.63604C20.6761 4.94821 18.3869 4 16 4ZM16 29C15.4265 29.8192 15.4263 29.819 15.4259 29.8188L15.4251 29.8182L15.4228 29.8166L15.4154 29.8114L15.39 29.7933C15.3683 29.7778 15.3375 29.7557 15.2981 29.7269C15.2192 29.6693 15.1059 29.5853 14.9631 29.4762C14.6775 29.2579 14.2732 28.9384 13.7899 28.5276C12.8245 27.707 11.5362 26.5156 10.2454 25.0312C7.68815 22.0904 5 17.8601 5 13C5 10.0826 6.15893 7.28473 8.22183 5.22183C10.2847 3.15893 13.0826 2 16 2C18.9174 2 21.7153 3.15893 23.7782 5.22183C25.8411 7.28473 27 10.0826 27 13C27 17.8601 24.3118 22.0904 21.7546 25.0312C20.4638 26.5156 19.1755 27.707 18.2101 28.5276C17.7268 28.9384 17.3225 29.2579 17.0369 29.4762C16.8941 29.5853 16.7808 29.6693 16.7019 29.7269C16.6625 29.7557 16.6317 29.7778 16.61 29.7933L16.5846 29.8114L16.5772 29.8166L16.5749 29.8182L16.5741 29.8188C16.5737 29.819 16.5735 29.8192 16 29ZM16 29L16.5735 29.8192C16.2291 30.0603 15.7709 30.0603 15.4265 29.8192L16 29Z"
                      fill="currentColor"
                      fillOpacity="0.9"
                    />
                  </svg>
                </span>
                <div className="flex flex-wrap flex-col flex-1">
                  <span className="paragraph !leading-none">
                    Office address
                  </span>
                  <h5 className="text-xl font-bold font-Syne text-black-800 leading-7">
                    7756 Olson Loop. Fort Meade, Maryland 20755
                  </h5>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side - Form */}
          <div
            className="col-span-12 lg:col-span-6 pt-5"

          >
            <form
              id="contact-form"
              className="grid grid-cols-12 gap-[18px]"
            >
              <div className="col-span-12 md:col-span-6">
                <label
                  className="text-sm font-normal font-Inter leading-tight mb-3 block"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  className="font-normal w-full leading-7 placeholder:opacity-100 placeholder:text-black-text-600 border border-black-800/40 rounded-[8px] p-4 focus:border-black-800/40 focus:outline-none"
                  type="text"
                  required
                  placeholder="Your name*"
                  name="name"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label
                  className="text-sm font-normal font-Inter leading-tight mb-3 block"
                  htmlFor="Email"
                >
                  Email
                </label>
                <input
                  id="Email"
                  className="font-normal w-full leading-7 placeholder:opacity-100 placeholder:text-black-text-600 border border-black-800/40 rounded-[8px] p-4 focus:border-black-800/40 focus:outline-none"
                  type="email"
                  required
                  placeholder="Your email*"
                  name="email"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label
                  className="text-sm font-normal font-Inter leading-tight mb-3 block"
                  htmlFor="Phone"
                >
                  Phone
                </label>
                <input
                  id="Phone"
                  className="font-normal w-full leading-7 placeholder:opacity-100 placeholder:text-black-text-600 border border-black-800/40 rounded-[8px] p-4 focus:border-black-800/40 focus:outline-none"
                  type="text"
                  required
                  placeholder="Your number"
                  name="phone"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label
                  className="text-sm font-normal font-Inter leading-tight mb-3 block"
                  htmlFor="Subject"
                >
                  Subject*
                </label>
                <input
                  id="Subject"
                  className="font-normal w-full leading-7 placeholder:opacity-100 placeholder:text-black-text-600 border border-black-800/40 rounded-[8px] p-4 focus:border-black-800/40 focus:outline-none"
                  type="text"
                  required
                  placeholder="Your subject*"
                  name="subject"
                />
              </div>
              <div className="col-span-12">
                <label
                  className="text-sm font-normal font-Inter leading-tight mb-3 block"
                  htmlFor="Message"
                >
                  Message
                </label>
                <textarea
                  className="h-[100px] font-normal w-full leading-7 placeholder:opacity-100 placeholder:text-black-text-600 border border-black-800/40  rounded-[8px] p-4 focus:border-black-800/40  focus:outline-none resize-none"
                  name="message"
                  id="Message"
                  cols={30}
                  rows={10}
                  required
                  placeholder="Type your message"
                ></textarea>
              </div>
              <div className="col-span-12">
                <Button
                  type="submit"
                  className="px-6 py-6 text-lg font-semibold hover:scale-105 transition-all"
                >
                  Submit

                </Button>

                <p className="form-message mt-3"></p>
              </div>

            </form>
          </div>
          {/* End form */}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;