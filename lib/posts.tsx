import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import Video from "@/app/components/Video";
import CustomImage from "@/app/components/CustomImage";

type FileTree = {
   tree: [
      {
         path: string;
      }
   ];
};

export async function getPostByName(
   fileName: string
): Promise<BlogPost | undefined> {
   const res = await fetch(
      `https://raw.githubusercontent.com/najlepszystudentwcalejunii/blogposts/main/${fileName}`,
      {
         headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28",
         },
      }
   );
   if (!res.ok) return undefined;

   const rawMDX = await res.text();

   if (rawMDX === "404: Not Found") return undefined;

   const { frontmatter, content } = await compileMDX<{
      title: string;
      date: string;
      tags: string[];
   }>({
      source: rawMDX,
      components: {
         Video,
         CustomImage,
      },
      options: {
         parseFrontmatter: true,
         mdxOptions: {
            rehypePlugins: [
               rehypeHighlight,
               rehypeSlug,
               [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ],
         },
      },
   });

   const id = fileName.replace(".mdx", "");

   const blogPostObj: BlogPost = {
      meta: {
         id,
         title: frontmatter.title,
         date: frontmatter.date,
         tags: frontmatter.tags,
      },
      content,
   };
   return blogPostObj;
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
   const res = await fetch(
      "https://api.github.com/repos/najlepszystudentwcalejunii/blogposts/git/trees/main?recursive=1",
      {
         headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28",
         },
      }
   );

   if (!res.ok) return undefined;

   const repoFileTree: FileTree = await res.json();

   const filesArray = repoFileTree.tree
      .map((obj) => obj.path)
      .filter((path) => path.endsWith(".mdx"));

   const posts: Meta[] = [];

   for (const file of filesArray) {
      const post = await getPostByName(file);
      if (post) {
         const { meta } = post;
         posts.push(meta);
      }
   }

   return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}
