export enum ToastStatus {
  SUCCESS,
  ERROR
}

type ToastProps = {
  text: string,
  status: ToastStatus,
  hidden: boolean
}

export default function Toast(props: ToastProps) {
  return (
    <div className={`toast toast-top toast-end ${props.hidden ? 'hidden' : ''}`}>
      <div className={`alert ${props.status === ToastStatus.SUCCESS ? 'alert-success' : 'alert-error'}`}>
        <span>{props.text}</span>
      </div>
    </div>
  );
}