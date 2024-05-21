"use client";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Logo from "./components/icons/logo";
import { gsap } from "gsap";

enum EnumMode {
  MENU = "Menu",
  TAKE_PICTURE = "TakePicture",
  PICTURE_PREVIEW = "PicturePreview",
  RESULTS = "Results",
}

export default function Home() {
  const [modeStack, setModeStack] = useState<EnumMode[]>([EnumMode.MENU]);
  const overlayPathRef = useRef<SVGPathElement | null>(null);
  const [text, setText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setText(event.target.value);
    textareaResize();
  };
  const textareaResize = () => {
    const textareaRef = document.querySelector(".input") as HTMLElement;
    textareaRef.style.height = "auto";
    textareaRef.style.height = textareaRef.scrollHeight + "px";
  };

  useEffect(() => {
    const circle = document.querySelector(".path");

    const tlcircularAnimation = gsap.timeline({
      defaults: { duration: 1.5, ease: "power1.inOut", repeat: -1 },
    });

    tlcircularAnimation
      .to(circle, { strokeDasharray: "1 200", strokeDashoffset: 0 })
      .to(circle, { strokeDasharray: "89 200", strokeDashoffset: "-35px" }, "<")
      .to(
        circle,
        { strokeDasharray: "89 200", strokeDashoffset: "-124px" },
        "<"
      );

    tlcircularAnimation.play();

    const fillCircle = () => {
     
        tlcircularAnimation.pause();
        const timeline = gsap.timeline();
        timeline
          .to(".circular .path", {
            strokeDasharray: "200, 200",
            strokeDashoffset: 0,
            duration: 1,
            ease: "power1.inOut",
          })
          .set(".circular .path", {
            opacity: 0,
            delay: 0.3,
          })
          .set(".input", {
            opacity: 1,
          })
          .to(".input", {
            width: "100%",
            borderRadius: "0.5rem",
            duration: 0.3,
            ease: "power1.inOut",
            onComplete: () => {
              document.querySelector(".input")?.classList.add(
                "placeholder:text-neutral-200",
                "dark:placeholder-neutral-500"
              );
              document.querySelector(".input")?.classList.remove("placeholder:text-transparent");
            },
          })
          .to(".input", {
            paddingBottom: "5rem",
            duration: 0.3,
            ease: "power1.inOut",
          })
          .to(".input-action", {
            opacity: 1,
            duration: 0.3,
            ease: "power1.inOut",
          })
          .to(".input-container", {
            top: `calc(100% - ${document.querySelector(".input-container")?.clientHeight}px)`,
            duration: 0.3,
            ease: "power1.inOut",
          }).set(".input-container", {
            bottom: "0",
            top:"unset",
            onComplete:()=>{
              document.querySelector(".input-container")?.classList.add("bg-white");
            }
          })
          .to(".input-separator", {
            width: "100%",
            duration: 2,
            ease: "power1.inOut",
          })
  
    };

    gsap
      .timeline({
        delay: 0.5,
        onComplete: () => {
          window.setTimeout(() => {
            fillCircle();
          }, 500);
        },
      })
      .to(overlayPathRef.current, {
        duration: 0.3,
        ease: "power2.in",
        attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
      })
      .to(overlayPathRef.current, {
        duration: 0.8,
        ease: "power4",
        attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
      });
  }, []);

  const changeMode = (newMode: EnumMode) => {
    if (isAnimating) return;
    setIsAnimating(true);
    gsap
      .timeline({
        onComplete: () => setIsAnimating(false),
      })
      .set(overlayPathRef.current, {
        attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
      })
      .to(
        overlayPathRef.current,
        {
          duration: 0.8,
          ease: "power4.in",
          attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
        },
        0
      )
      .to(overlayPathRef.current, {
        duration: 0.3,
        ease: "power2",
        onComplete: () => setModeStack((prevStack) => [...prevStack, newMode]),
        attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
      })
      .set(overlayPathRef.current, {
        attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
      })
      .to(overlayPathRef.current, {
        duration: 0.3,
        ease: "power2.in",
        attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
      })
      .to(overlayPathRef.current, {
        duration: 0.8,
        ease: "power4",
        attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
      });
  };

  const goBack = () => {
    if (modeStack.length > 1) {
      if (isAnimating) return;
      setIsAnimating(true);
      gsap
        .timeline({
          onComplete: () => setIsAnimating(false),
        })
        .set(overlayPathRef.current, {
          attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
        })
        .to(
          overlayPathRef.current,
          {
            duration: 0.8,
            ease: "power4.in",
            attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
          },
          0
        )
        .to(overlayPathRef.current, {
          duration: 0.3,
          ease: "power2",
          attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
        })
        .set(overlayPathRef.current, {
          attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
          onComplete: () => setModeStack((prevStack) => prevStack.slice(0, -1)),
        })
        .to(overlayPathRef.current, {
          duration: 0.3,
          ease: "power2.in",
          attr: { d: "M 0 100 V 50 Q 50 100 100 50 V 100 z" },
        })
        .to(overlayPathRef.current, {
          duration: 0.8,
          ease: "power4",
          attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
        });
    }
  };

  return (
    <>
      <svg
        className="overlay"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          className="overlay__path"
          ref={overlayPathRef}
          vector-effect="non-scaling-stroke"
          d="M 0 0 V 100 Q 50 100 100 100 V 0 z"
        />
      </svg>
      {/* <button onClick={() => changeMode(EnumMode.MENU)}>change</button>
      <button onClick={() => goBack()}>change</button> */}
      <div className="relative h-screen overflow-y-auto min-h-screen flex flex-col justify-center items-center">
        <div className="content h-fit  max-w-2xl pb-[220px]">
          <div className=" flex flex-col pb-[25%] justify-center pt-6">
            <div className="relative h-fit  max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center flex-col">
              <div className="flex justify-center items-center relative w-20">
                <Logo />
              </div>

              <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                Welcome to Gilles AI
              </h1>

              <p className="mt-3 text-gray-600 dark:text-neutral-400">
                Your AI-powered copilot for maintenance and troubleshooting
              </p>
            </div>
          </div>
          
        </div>
        <div className="input-container left-0 fixed w-full h-fit top-[40%] z-10 flex justify-center items-center flex-col pt-2 pb-3 sm:pt-4 sm:pb-6 dark:bg-neutral-900 dark:border-neutral-700">
            <div
              className="lg:max-w-4xl absolute top-0 opacity-5 input-separator w-[0%] h-[1px]"
              style={{
                background:
                  "linear-gradient(to right, transparent 5%, gray, transparent 95%)",
              }}
            />

            <div className="mt-10  w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl w-full relative flex justify-center items-center">
                <div className="absolute z-40 w-[4.2rem] h-[4.2rem]">
                  <svg className="circular" viewBox="25 25 50 50">
                    <circle
                      className="path"
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      stroke-width="1"
                      stroke-miterlimit="10"
                    />
                  </svg>
                </div>
                <textarea
                  className="input placeholder:text-transparent opacity-0 p-4 block w-[3.5rem] min-h-[3.5rem] border-[1.2px] border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400  dark:focus:ring-neutral-600"
                  placeholder="Ask me anything..."
                  value={text}
                  onChange={handleChange}
                ></textarea>

                <div className="input-action opacity-0 absolute bottom-px inset-x-px p-2 rounded-b-md dark:bg-neutral-900">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:text-blue-500"
                      >
                        <svg
                          className="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            rx="2"
                          ></rect>
                          <line x1="9" x2="15" y1="15" y2="9"></line>
                        </svg>
                      </button>

                      <button
                        type="button"
                        className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:text-blue-500"
                      >
                        <svg
                          className="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-x-1">
                      <button
                        type="button"
                        className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:text-blue-500"
                      >
                        <svg
                          className="flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                          <line x1="12" x2="12" y1="19" y2="22"></line>
                        </svg>
                      </button>

                      <button
                        type="button"
                        className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <svg
                          className="flex-shrink-0 size-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* <footer className="mt-auto max-w-4xl text-center mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-600 dark:text-neutral-500">
            Developped by{" "}
            <a
              className="text-gray-800 decoration-2 hover:underline font-semibold dark:text-neutral-300"
              href="#"
              target="_blank"
            >
              Régis Grumberg
            </a>{" "}
            x{" "}
            <a
              className="text-gray-800 decoration-2 hover:underline font-semibold dark:text-neutral-300"
              href="#"
              target="_blank"
            >
              Célian Noel
            </a>
          </p>
        </footer> */}
      </div>
    </>
  );
}
