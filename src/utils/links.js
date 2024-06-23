import { IoBarChartSharp } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";

import { ImProfile } from "react-icons/im";
import { FaTasks } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";

const links = [
  { id: 1, text: "Report Dashboard", path: "report-dashboard", icon: <FaProjectDiagram /> },
  {
    id: 2,
    text: "Analytics",
    path: "analytics",
    icon: <FaTasks />,
  },
  { id: 3, text: "Url Generate", path: "url-generate",
     icon: <ImProfile /> 
    },
  /*{
    id: 4,
    text: 'create project',
    path: 'add-project',
    icon: <MdOutlineAddBox />,
  },*/
];


export default links;
