export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: {
    name: string;
    imageUrl: string;
  };
  tags: string[];
  category: string;
}

const posts: Post[] = [
  {
    slug: "journey-into-canvas",
    title: "A Journey into the World of HTML5 Canvas",
    excerpt: "Exploring the powerful capabilities of the HTML5 canvas element for creating dynamic graphics and animations on the web.",
    content: "The HTML5 canvas is a versatile tool for web developers. It allows for rendering graphics, animations, and interactive visualizations directly in the browser. In this post, we'll dive deep into its core concepts, from drawing basic shapes to complex animations and data visualizations. We'll cover the 2D rendering context, path manipulation, transformations, and image handling. Join us as we unlock the creative potential of the canvas.",
    imageUrl: "https://placehold.co/600x400.png",
    date: "2024-05-15",
    author: {
      name: "Alex Johnson",
      imageUrl: "https://placehold.co/100x100.png",
    },
    tags: ["HTML5", "Canvas", "Web Development", "JavaScript"],
    category: "Web Development",
  },
  {
    slug: "modern-ui-design",
    title: "Principles of Modern UI Design",
    excerpt: "A look at the key principles that guide the creation of beautiful, intuitive, and effective user interfaces.",
    content: "Modern UI design is more than just aesthetics; it's about creating seamless and intuitive user experiences. This article explores fundamental principles like clarity, consistency, feedback, and flexibility. We'll analyze real-world examples from popular applications, highlighting how these principles are applied to create user-centric designs. Whether you're a seasoned designer or just starting, these guidelines will help you elevate your UI work.",
    imageUrl: "https://placehold.co/600x400.png",
    date: "2024-05-10",
    author: {
      name: "Samantha Lee",
      imageUrl: "https://placehold.co/100x100.png",
    },
    tags: ["UI Design", "UX", "Design Principles", "Modern"],
    category: "Design",
  },
  {
    slug: "getting-started-with-react-hooks",
    title: "Getting Started with React Hooks",
    excerpt: "A beginner-friendly introduction to React Hooks and how they simplify state management and side effects in functional components.",
    content: "React Hooks revolutionized how we write components. They allow us to use state and other React features without writing a class. This guide will walk you through the most common hooks like `useState`, `useEffect`, and `useContext`. We'll build practical examples to demonstrate how hooks can make your code more readable, reusable, and concise. Say goodbye to class components and embrace the power of hooks!",
    imageUrl: "https://placehold.co/600x400.png",
    date: "2024-05-05",
    author: {
      name: "Chris Williams",
      imageUrl: "https://placehold.co/100x100.png",
    },
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    category: "Web Development",
  },
    {
    slug: "ai-in-creative-coding",
    title: "The Role of AI in Creative Coding",
    excerpt: "How artificial intelligence is transforming the landscape of art, design, and creative expression through code.",
    content: "Artificial intelligence is no longer just for data scientists. It's becoming an incredibly powerful tool for artists and creative coders. From generative art created with GANs to interactive installations that respond to human emotion, AI is pushing the boundaries of what's possible. This post explores various AI techniques and platforms that creatives can use to bring their visions to life, showcasing stunning examples of AI-driven art.",
    imageUrl: "https://placehold.co/600x400.png",
    date: "2024-04-28",
    author: {
      name: "Alex Johnson",
      imageUrl: "https://placehold.co/100x100.png",
    },
    tags: ["AI", "Creative Coding", "Art", "Technology"],
    category: "Technology",
  },
  {
    slug: "the-art-of-minimalism",
    title: "The Art of Minimalism in Web Design",
    excerpt: "Discover how 'less is more' can lead to more engaging and user-friendly websites. A deep dive into minimalist design.",
    content: "Minimalism in web design focuses on simplicity and functionality. By stripping away unnecessary elements, we can create a cleaner, more focused user experience. This article covers the core tenets of minimalist design, including whitespace, typography, color palettes, and grid layouts. We'll look at how this approach can improve loading times, enhance readability, and guide users towards their goals effectively.",
    imageUrl: "https://placehold.co/600x400.png",
    date: "2024-04-22",
    author: {
      name: "Samantha Lee",
      imageUrl: "https://placehold.co/100x100.png",
    },
    tags: ["Web Design", "Minimalism", "UI", "UX"],
    category: "Design",
  },
  {
    slug: "nextjs-for-the-win",
    title: "Why Next.js is a Game-Changer for Modern Web Apps",
    excerpt: "An overview of Next.js features like Server-Side Rendering, Static Site Generation, and API routes that make it a top choice.",
    content: "Next.js has become the go-to framework for building production-ready React applications. Its hybrid approach to rendering, combining Server-Side Rendering (SSR) and Static Site Generation (SSG), offers unparalleled performance and SEO benefits. This post breaks down the key features of Next.js, including its file-system based router, image optimization, and built-in API routes. Find out why developers are flocking to Next.js for their projects.",
    imageUrl: "https://placehold.co/600x400.png",
    date: "2024-04-15",
    author: {
      name: "Chris Williams",
      imageUrl: "https://placehold.co/100x100.png",
    },
    tags: ["Next.js", "React", "Web Development", "Framework"],
    category: "Web Development",
  }
];

let categories: string[] = [...new Set(posts.map(post => post.category))].sort();
let tags: string[] = [...new Set(posts.flatMap(post => post.tags))].sort();

export const getPosts = async (): Promise<Post[]> => {
  // In a real app, you'd fetch this from a database or CMS
  return new Promise(resolve => setTimeout(() => resolve(posts), 500));
};

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  return new Promise(resolve => {
    const post = posts.find((post) => post.slug === slug);
    setTimeout(() => resolve(post), 300);
  });
};

export const getCategories = async (): Promise<string[]> => {
  return Promise.resolve(categories);
}

export const getTags = async (): Promise<string[]> => {
    return Promise.resolve(tags);
}

export const addCategory = async (name: string): Promise<{success: boolean, message?: string}> => {
  if (categories.find(c => c.toLowerCase() === name.toLowerCase())) {
    return { success: false, message: 'Category already exists.' };
  }
  categories.push(name);
  categories.sort();
  return { success: true };
}

export const updateCategory = async (oldName: string, newName:string): Promise<{success: boolean, message?: string}> => {
  if (oldName.toLowerCase() !== newName.toLowerCase() && categories.find(c => c.toLowerCase() === newName.toLowerCase())) {
    return { success: false, message: 'New category name already exists.' };
  }
  
  const index = categories.findIndex(c => c.toLowerCase() === oldName.toLowerCase());
  if (index === -1) {
    return { success: false, message: 'Category not found.' };
  }
  
  categories[index] = newName;

  posts.forEach(post => {
    if (post.category === oldName) {
      post.category = newName;
    }
  });

  categories.sort();
  return { success: true };
}

export const deleteCategory = async (name: string): Promise<{success: boolean, message?: string}> => {
  const isUsed = posts.some(post => post.category.toLowerCase() === name.toLowerCase());
  if (isUsed) {
    return { success: false, message: 'Cannot delete category as it is in use by one or more posts.' };
  }
  categories = categories.filter(c => c.toLowerCase() !== name.toLowerCase());
  return { success: true };
}

export const addTag = async (name: string): Promise<{success: boolean, message?: string}> => {
  if (tags.find(t => t.toLowerCase() === name.toLowerCase())) {
    return { success: false, message: 'Tag already exists.' };
  }
  tags.push(name);
  tags.sort();
  return { success: true };
}

export const updateTag = async (oldName: string, newName:string): Promise<{success: boolean, message?: string}> => {
  if (oldName.toLowerCase() !== newName.toLowerCase() && tags.find(t => t.toLowerCase() === newName.toLowerCase())) {
    return { success: false, message: 'New tag name already exists.' };
  }
  
  const index = tags.findIndex(t => t.toLowerCase() === oldName.toLowerCase());
  if (index === -1) {
    return { success: false, message: 'Tag not found.' };
  }
  
  tags[index] = newName;

  posts.forEach(post => {
    const tagIndex = post.tags.findIndex(t => t.toLowerCase() === oldName.toLowerCase());
    if (tagIndex !== -1) {
      post.tags[tagIndex] = newName;
    }
  });

  tags.sort();
  return { success: true };
}

export const deleteTag = async (name: string): Promise<{success: boolean, message?: string}> => {
  const isUsed = posts.some(post => post.tags.some(t => t.toLowerCase() === name.toLowerCase()));
  if (isUsed) {
    return { success: false, message: 'Cannot delete tag as it is in use by one or more posts.' };
  }
  tags = tags.filter(t => t.toLowerCase() !== name.toLowerCase());
  return { success: true };
}
