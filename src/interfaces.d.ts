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

interface Post {
  post_id: number;
  user_id: number;
  caption?: string;
  likes: number;
  comments?: Comment[];
  users?: [];
  poster: {};
  img: string;
}

interface Posts {
  posts: Post[];
}

interface Comment {
  name: string;
  comment: string;
}

type SetLogin = Dispatch<LoginModal>;
type SetRegister = Dispatch<RegisterModal>;
type SetPostModal = Dispatch<PostModal>;
type SetBackDrop = Dispatch<Backdrop>;
type SetDropDown = Dispatch<Dropdown>;
type SetPosts = Dispatch<Posts[]>;
type SetComment = React.Dispatch<Comment>;
type FormEvent = React.ChangeEvent<HTMLFormElement>;
type ClickEvent = React.MouseEvent<HTMLButtonElement>;
