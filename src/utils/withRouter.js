import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// export default function withRouter(Child) {
//   return (props) => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     return <Child {...props} navigate={navigate} location={location} />;
//   };
// }

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
      location={location}
    />
  );
};

export default withRouter;
