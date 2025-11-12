type Props = { qrBase64: string };

const QRCodeViewer = (props: Props) => {
  return <img src={props.qrBase64} className="qr-code aspect-square w-48" />;
};

export default QRCodeViewer;
