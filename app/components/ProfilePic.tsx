import Image from "next/image";

export default function ProfilePic() {
   return (
      <section className="w-full mx-auto">
         <Image
            className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
            src="/item0001.jpg"
            width={200}
            height={200}
            alt="Wrist watch"
            priority={true}
         />
      </section>
   );
}
