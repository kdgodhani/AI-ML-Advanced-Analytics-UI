import { IoBarChartSharp } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";

import { ImProfile } from "react-icons/im";
import { FaTasks } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";

const links = [
  {
    id: 1,
    text: "Txn Report",
    path: "report-dashboard",
    icon: <FaProjectDiagram />,
  },
  {
    id: 2,
    text: " Txn Chart Report",
    path: "chart-report",
    icon: <FaProjectDiagram />,
  },
  {
    id: 3,
    text: "ML Analytics",
    path: "analytics",
    icon: <FaTasks />,
  },
  { id: 4, text: "Url Generate", path: "url-generate", icon: <ImProfile /> },
  {
    id: 5,
    text: "Product",
    path: "product",
    icon: <MdOutlineAddBox />,
  },
  {
    id: 6,
    text: "Cart",
    path: "cart",
    icon: <IoBarChartSharp />,
  },
];


export default links;
