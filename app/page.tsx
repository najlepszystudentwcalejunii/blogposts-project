import Posts from "./components/Posts";
import ProfilePic from "./components/ProfilePic";

export const revalidate = 86400;

export default function Home() {
   return (
      <div className="px-6 mx-auto">
         <ProfilePic />
         <p className="my-12 text-3xl text-center dark:text-white">
            Hello and Welcome 👋 I'm{" "}
            <span className="font-bold">Michal</span>
         </p>
         <Posts />
      </div>
   );
}
