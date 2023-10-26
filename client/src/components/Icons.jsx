export const Cart = (props) => {
  return (
    <svg
      width="40px"
      height="40px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="icon glyph"
      {...props}
    >
      <path
        d="M10.62 14l-1 2H19a1 1 0 010 2H9.62a2 2 0 01-1.79-2.89L8.9 13 5.32 4H3a1 1 0 010-2h2.32a2 2 0 011.86 1.26L7.88 5h13.01a1 1 0 01.48.05 1 1 0 01.56 1.3l-2.8 7a1 1 0 01-.93.63zm-.12 5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5zm6 0a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z"
        fill="currentColor"
      />
    </svg>
  );
};
export const Search = (props) => {
  return (
    <svg
      fill="currentColor"
      width="20px"
      height="20px"
      viewBox="0 0 512 512"
      data-name="11 Search"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        data-name="Path 16"
        d="M497.914 497.913a48.085 48.085 0 01-68.008 0l-84.863-84.863a222.6 222.6 0 01-120.659 35.717C100.469 448.767 0 348.313 0 224.383S100.469 0 224.384 0c123.931 0 224.384 100.452 224.384 224.383a222.872 222.872 0 01-35.718 120.676l84.864 84.863a48.066 48.066 0 010 67.991zm-273.53-433.8a160.274 160.274 0 10160.274 160.269A160.271 160.271 0 00224.384 64.109z"
        fillRule="evenodd"
      />
    </svg>
  );
};
export const Plane = (props) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
    </svg>
  );
};

export function TrashIcon(props) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 6l-.8 12.013c-.071 1.052-.106 1.578-.333 1.977a2 2 0 01-.866.81c-.413.2-.94.2-1.995.2H9.994c-1.055 0-1.582 0-1.995-.2a2 2 0 01-.866-.81c-.227-.399-.262-.925-.332-1.977L6 6M4 6h16m-4 0l-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 00-.803-.578C13.938 3 13.524 3 12.694 3h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 00-.803.578c-.243.29-.374.684-.636 1.471L8 6m6 4v7m-4-7v7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PencilIcon(props) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 192 192"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path
        d="M26.252 131.616L22 170l38.383-4.252L170 56.073v-12.93L148.857 22h-12.93zm98.164-96.96l31.671 31.67"
        stroke="currentColor"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M117.733 73.917l-52.882 52.882"
        stroke="currentColor"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={5}
      />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 9l-6 6m6 0L9 9m3 12a9 9 0 100-18 9 9 0 000 18z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserIcon(props) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="none" d="M0 0H24V24H0z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-6a4 4 0 100 8 4 4 0 000-8zm5.111 9.997c.758.488.721 1.552.031 2.132A7.968 7.968 0 0112 20a7.967 7.967 0 01-5.114-1.848c-.697-.58-.734-1.649.028-2.14.236-.153.494-.287.774-.402C8.815 15.145 10.254 15 12 15c1.755 0 3.202.136 4.331.595.283.115.542.25.78.402z"
        fill="currentColor"
      />
    </svg>
  )
}