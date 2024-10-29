import { Helmet } from "react-helmet";
import fileInvoice from "../images/file-invoice-solid.svg";
const CustomPageHeader = () => {
  return (
    <Helmet>
      <title>invoicely</title>
      <link rel="icon" type="image/svg+xml" href={fileInvoice} />
    </Helmet>
  );
};

export default CustomPageHeader;
