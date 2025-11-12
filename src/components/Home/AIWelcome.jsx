// "use client"
// import React from "react";


// export default function AIWelcome({
//   eyebrow = "",
//   title = "AI that transforms prompts into visual magic.",
//   subtitle = "An AI that converts text prompts into high-quality images — sell, customize, and deliver ready-to-use prompts and artwork for creators and businesses.",
//   ctaPrimary = "Watch a demo",
//   className = ""
// }) {
//   return (


//     <>
//           {/* <ThreadParent/> */}
//     <section className={`relative bg-black overflow-hidden ${className}`}>
//       {/* Soft white light effects from both bottom corners */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         {/* Left bottom corner light */}
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_left,white_0%,transparent_70%)] opacity-20 blur-xl translate-x-[-2rem] translate-y-[-2rem]"></div>
//         {/* Right bottom corner light */}
//         <div className="absolute bottom-0 right-0 w-40 h-96 bg-[radial-gradient(circle_at_bottom_right,white_0%,transparent_70%)] opacity-20 blur-xl translate-x-[2rem] translate-y-[-2rem]"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 pb-20 md:pb-28  text-center relative z-10">
//         {eyebrow ? <div className="text-sm text-slate-600 mb-6">{eyebrow}</div> : null}

//         <h1 className="mx-auto max-w-4xl text-4xl md:text-6xl font-extrabold leading-tight text-white">
//           {title}
//         </h1>

//         <p className="mt-8 mx-auto max-w-3xl text-lg md:text-xl text-slate-300">
//           {subtitle}
//         </p>

//         <div className="mt-12 flex justify-center gap-6">
//          <button
//   className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-transparent border border-white text-white text-lg font-medium hover:bg-white/10 transition-colors duration-300"
//   onClick={() => console.log('Watch demo')}
//   aria-label={ctaPrimary}
// >
//   <span>{ctaPrimary}</span>
//   <span className="w-10 h-10 bg-[#c3512a] rounded-full flex items-center justify-center text-white">→</span>
// </button>


         
//         </div>
//       </div>

//       {/* optional decorative rounded image card like the site bottom inset */}
//       <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 w-[80%] md:w-[65%] h-48 md:h-64 bg-cover bg-center rounded-3xl shadow-xl"
//            style={{ backgroundImage: `url('/hero-photo.jpg')`, zIndex: 0, pointerEvents: 'none' }}>
//       </div>
//     </section>
//     </>
//   );
// }



"use client"
import React from "react";
import Threads from "./Threads";


export default function AIWelcome({
  eyebrow = "",
  title = "AI that transforms prompts into visual magic.",
  subtitle = "An AI that converts text prompts into high-quality images — sell, customize, and deliver ready-to-use prompts and artwork for creators and businesses.",
  ctaPrimary = "Watch a demo",
  className = ""
}) {
  return (


    <>
        <section className={`relative bg-black overflow-hidden ${className}`}>
    <div style={{ width: '100%', height: '350px', position: 'relative' , background:'black' }}>
<Threads/>
</div>


          {/* <ThreadParent/> */}

      {/* Soft white light effects from both bottom corners */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left bottom corner light - triangular shape */}
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[radial-gradient(circle_at_bottom_left,white_0%,transparent_70%)] opacity-20 blur-xl clip-[polygon(0%_100%,_0%_0%,_90%_0%)]"></div>
        {/* Right bottom corner light - triangular shape */}
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-[radial-gradient(circle_at_bottom_right,white_0%,transparent_70%)] opacity-20 blur-xl clip-[polygon(100%_100%,_100%_0%,_10%_0%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 md:pb-28  text-center relative z-10">
        {eyebrow ? <div className="text-sm text-slate-600 mb-6">{eyebrow}</div> : null}

        <h1 className="mx-auto max-w-4xl text-4xl md:text-6xl font-extrabold leading-tight text-white">
          {title}
        </h1>

        <p className="mt-8 mx-auto max-w-3xl text-lg md:text-xl text-slate-300">
          {subtitle}
        </p>

        <div className="mt-12 flex justify-center gap-6">
         <button
  className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-transparent border border-white text-white text-lg font-medium hover:bg-white/10 transition-colors duration-300"
  onClick={() => console.log('Watch demo')}
  aria-label={ctaPrimary}
>
  <span>{ctaPrimary}</span>
  <span className="w-10 h-10 bg-[#c3512a] rounded-full flex items-center justify-center text-white">→</span>
</button>


         
        </div>
      </div>

      {/* optional decorative rounded image card like the site bottom inset */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 w-[80%] md:w-[65%] h-48 md:h-64 bg-cover bg-center rounded-3xl shadow-xl"
           style={{ backgroundImage: `url('/hero-photo.jpg')`, zIndex: 0, pointerEvents: 'none' }}>
      </div>
    </section>
    </>
  );
}