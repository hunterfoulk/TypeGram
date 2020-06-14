interface LoginModal {
  login: boolean;
}

interface RegisterModal {
  register: boolean;
}

interface PostModal {
  postModal: boolean;
}

interface Backdrop {
  backdrop: boolean;
}

interface Dropdown {
  dropdown: boolean;
}

interface Posts {
  posts: [];
}

interface PostModalFunc {
  PostModalFunc: () => void;
}

interface PostModalFuncClose {
  PostModalFuncClose: () => void;
}

interface GetPosts {
  GetPosts: () => void;
}

// interface Posts {
//   post_id: number;
//   user_id: number;
//   caption: string;
//   likes: number;
//   comments: Comments[];
//   users: [];
//   poster: {};
//   img: string;
// }

// interface Comments {
//   name: string;
//   comment: string;
// }
