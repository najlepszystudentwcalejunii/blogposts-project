import ListItem from "@/app/components/ListItem";
import { getPostsMeta } from "@/lib/posts";
import Link from "next/link";

export const revalidate = 86400;

type Props = {
   params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
   const posts = await getPostsMeta();

   if (!posts) return [];

   const tags = new Set(posts.map((post) => post.tags).flat());
   console.log(tags);

   return Array.from(tags).map((tag) => ({ tag }));
}

export async function generateMetadata(props: Props) {
   const { tag } = await props.params;

   return {
      title: `Posts about ${tag}`,
   };
}

export default async function TagPostList(props: Props) {
   const { tag } = await props.params;
   console.log(tag);

   const posts = await getPostsMeta();

   if (!posts)
      return <p className="mt-10 text-center">Sorry, no posts available</p>;

   const tagPosts = posts.filter((post) => post.tags.includes(tag));

   if (!tagPosts.length)
      return (
         <div className="text-center">
            <p className="mt-10">Sorry, no posts for that keyword</p>
            <Link href="/">Back to home</Link>
         </div>
      );
   else
      return (
         <>
            <h2 className="text-3xl mt-4 mb-0">Results for: #{tag}</h2>
            <section className="mt-6 mx-auto max-w-2xl">
               <ul className="w-full list-none p-0">
                  {tagPosts.map((post) => (
                     <ListItem key={post.id} post={post} />
                  ))}
               </ul>
            </section>
         </>
      );
}
