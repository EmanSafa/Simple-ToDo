interface IProps {
  msg: string;
}

const ErrorMsg = ({ msg }: IProps) => {
  return <span className="text-red-400 text-sm block">{msg}</span>;
};

export default ErrorMsg;
