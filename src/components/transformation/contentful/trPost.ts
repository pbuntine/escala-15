import { transformEntries } from "./trEntries";
import { Entry } from "contentful";
import {
  IPost,
  IPostCategory,
} from "../../../types/cf-types";
import { fetchCFJSON } from "../../extraction/contentful/fetchCFData";
import { parseTemplate } from "./trTemplates";
import { IPostDetails } from "../../../types/esc-types";
// import { IPostSummary } from "../../../types/esc-types";
// import { IPostPaths } from "../../../types/esc-types";
import { IFetchPostParams } from "../../../types/esc-types";

export const getPost = async (
  slugPost: string
): Promise<IPostDetails | null> => {
  const params: IFetchPostParams = {
    contentType: "post",
    limit: 1,
    include: 5,
    slugPost: slugPost,
  };

  const objPost: IPost = await fetchCFJSON(params);
  if (!objPost.total) {
    const postDetails = null;
    return postDetails;
  }
  // console.log("objPost");
  // console.log(objPost);
  const postDetails = transformPost(objPost.items[0]);
  // const postDetails = objPost;

  return postDetails;
};

export function transformPost(
  entry: IPost & {
    fields: {
      postCategories?: IPostCategory[];
      renderer?: {
        fields?: {
          entries?: unknown[];
          className?: string;
          acl?: string;
          reactComponentPath?: string;
        };
      };
      entries?: unknown[];
      relatedPosts?: IPost[];
      template?: { sys?: { id?: string } };
      date?: string;
      className?: string;
      slugParent?: string;
      slugPost?: string;
      pagetitle?: string;
      metadescription?: string;
      keywords?: string;
      ogtitle?: string;
      ogdescription?: string;
      ogimage?: { fields?: { file?: { url?: string } } };
      primaryimage?: { fields?: { file?: { url?: string } } };
      primaryimagealttext?: string;
      title?: string;
      subtitle?: string;
      author?: { fields?: { title?: string } };
      text?: string;
      acl?: string;
      id?: string;
    };
  }
) {
  let postCategories = null;
  const postCategoriesList = [];
  if (entry.fields?.postCategories?.length) {
    postCategories = transformEntries(
      entry.fields.postCategories as unknown as Entry[]
    );
    // console.log("postCategories");
    // console.log(postCategories);
    for (let i = 0; i < postCategories?.length; i++) {
      postCategoriesList[i] =
        (postCategories[i] as IPostCategory).fields?.title || "";
    }
  }

  let rendererEntries = null;
  if (entry.fields?.renderer?.fields?.entries?.length) {
    rendererEntries = transformEntries(
      entry.fields.renderer?.fields?.entries as Entry[]
    );
  } else {
    rendererEntries = null;
  }

  let postEntries = null;
  if (entry.fields?.entries?.length) {
    postEntries = transformEntries(entry.fields?.entries);
  } else {
    postEntries = null;
  }

  let postRelatedPosts = null;
  if (entry.fields?.relatedPosts?.length) {
    postRelatedPosts = transformEntries(
      entry.fields?.relatedPosts,
      "postSummary"
    );
  } else {
    postRelatedPosts = null;
  }

  const postTemplateContents = parseTemplate(entry.fields?.template);

  const objDate = new Date(entry.fields?.date); // formated_Date - SDK returned date
  const stringDate = objDate.toString(); // formated_Date - SDK returned date

  const postDate = stringDate.substring(0, 15);

  // Concatenate classNames
  // ----------------------
  let postClassName = "";
  if (entry.fields?.className) {
    postClassName = " " + entry.fields?.className;
  } else {
    postClassName = "";
  }

  let postRendererClassName = "";
  if (entry.fields?.renderer?.fields?.className) {
    postRendererClassName = " " + entry.fields?.renderer?.fields?.className;
  } else {
    postRendererClassName = "";
  }
  const postClassNames = "post" + postClassName + postRendererClassName;

  const postDetails = {
    reactComponentPath:
      entry.fields?.renderer?.fields?.reactComponentPath || null,
    id: entry.sys.id,
    name: entry.fields?.name,
    contentType: entry.sys.contentType?.sys.id,
    postName: entry.fields?.name || null,
    postSlugParent: entry.fields?.slugParent || null,
    postSlug: entry.fields?.slugPost || null,
    pageTitle: entry.fields?.pagetitle || null,
    pageMetadescription: entry.fields?.metadescription || null,
    pageKeywords: entry.fields?.keywords || null,
    ogTitle: entry.fields?.ogtitle || null,
    ogDescription: entry.fields?.ogdescription || null,
    ogImage: entry.fields?.ogimage?.fields?.file?.url || null,
    postPrimaryImage: entry.fields?.primaryimage?.fields?.file?.url || null,
    postPrimaryImageAltText: entry.fields?.primaryimagealttext || null,
    postTitle: entry.fields?.title || null,
    postSubtitle: entry.fields?.subtitle || null,
    postDate: postDate || null,
    postAuthor: entry.fields?.author.fields.title || null,
    postText: entry.fields?.text || null,
    postCategories: postCategories || null,
    postCategoriesList: postCategoriesList || null,
    postACL: entry.fields?.acl || null,
    postClassName: entry.fields?.className || "",
    postID: entry.fields?.id || null,
    postRendererID: entry.fields?.renderer?.sys.id || null,
    postRendererClassName: entry.fields?.renderer?.fields?.className || "",
    postRendererACL: entry.fields?.renderer?.fields?.acl || null,
    postRendererEntries: rendererEntries || null,
    postTemplateID: entry.fields?.template?.sys.id || null,
    postTemplateContents: postTemplateContents,
    postRelatedPosts: postRelatedPosts,
    postEntries: postEntries || null,
    postClassNames: postClassNames,
  };
  return postDetails;
}

export function transformPostSummary(entry: IPost) {
  let postCategories = null;
  const postCategoriesList = [];
  if (entry.fields?.postCategories?.length) {
    postCategories = transformEntries(entry.fields.postCategories);
    for (let i = 0; i < postCategories?.length; i++) {
      postCategoriesList[i] = postCategories[i].postcategoryTitle;
    }
  } else {
    postCategories = null;
  }

  let postEntries = null;
  if (entry.fields?.entries?.length) {
    postEntries = transformEntries(entry.fields?.entries);
  } else {
    postEntries = null;
  }

  const objDate = new Date(entry.fields?.date); // formated_Date - SDK returned date
  const stringDate = objDate.toString(); // formated_Date - SDK returned date
  const postDate = stringDate.substring(0, 15);

  const postSummary = {
    id: entry.sys.id,
    postID: entry.fields?.id || null,
    postClassName: entry.fields?.className || null,
    postSlugParent: entry.fields?.slugParent || null,
    postSlug: entry.fields?.slugPost || null,
    ogDescription: entry.fields?.ogdescription || null,
    ogImage: entry.fields?.ogimage?.fields?.file?.url || null,
    postPrimaryImage: entry.fields?.primaryimage?.fields?.file?.url || null,
    postPrimaryImageAltText: entry.fields?.primaryimagealttext || null,
    postTitle: entry.fields?.title || null,
    postSubtitle: entry.fields?.subtitle || null,
    postDate: postDate || null,
    postAuthor: entry.fields?.author.fields.title || null,
    postText: entry.fields?.text || null,
    postCategories: postCategories || null,
    postCategoriesList: postCategoriesList || null,
    postACL: entry.fields?.acl || null,
    postRendererACL: entry.fields?.renderer?.fields?.acl || null,
    postEntries: postEntries || null,
  };
  return postSummary;
}

export const getAllPostsPath = async () => {
  const objPosts: IPost[] = await fetchCFJSON({
    contentType: "post",
    limit: 1000,
    include: 1,
  });

  const postPaths = transformPostPaths(objPosts.items);
  return postPaths;
};

export function transformPostPaths(posts: IPost[]) {
  // console.log("posts in transf");
  // console.log(posts);

  const PostPaths = [];
  posts.map((post, index) => {
    const postSlugParent = post.fields?.slugParent;
    const postSlug = post.fields?.slugPost;
    const postFullPath = "/" + postSlugParent + "/" + postSlug + "/";

    PostPaths[index] = postFullPath;

    return PostPaths[index];
  });

  return PostPaths;
}
