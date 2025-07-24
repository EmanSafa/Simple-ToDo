interface IProps {
  msg: string;
}

const ErrorMsg = ({ msg }: IProps) => {
  return msg ? <span className="text-red-400 text-sm block">{msg}</span> : null;
};

export default ErrorMsg;
