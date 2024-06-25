import { IoBarChartSharp } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";

import { ImProfile } from "react-icons/im";
import { FaTasks } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";

const links = [
  {
    id: 1,
    text: "Report Dashboard",
    path: "report-dashboard",
    icon: <FaProjectDiagram />,
  },
  {
    id: 2,
    text: "Analytics",
    path: "analytics",
    icon: <FaTasks />,
  },
  { id: 3, text: "Url Generate", path: "url-generate", icon: <ImProfile /> },
  {
    id: 4,
    text: "Product",
    path: "product",
    icon: <MdOutlineAddBox />,
  },
  {
    id: 4,
    text: "Cart",
    path: "cart",
    icon: <IoBarChartSharp />,
  },
];


export default links;
