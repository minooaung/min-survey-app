import PageComponent from "../components/PageComponent.jsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import SurveyListItem from "../components/SurveyListItem.jsx";
import TButton from "../components/core/TButton.jsx";
import { PlusCircleIcon } from "@heroicons/react/24/outline/index.js";
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import PaginationLinks from "../components/PaginationLinks.jsx";

export default function Surveys() {
  // const { surveys } = useStateContext();

  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});

  // console.log(surveys);

  const onDeleteClick = () => {
    console.log("on delete click");
  };

  const onPageClick = (link) => {
    //alert(link.url);
    getSurveys(link.url);
  };

  const getSurveys = (url) => {
    url = url || "/survey";

    setLoading(true);

    axiosClient.get(url).then(({ data }) => {
      //debugger;
      // console.log(data);
      setSurveys(data.data);
      setMeta(data.meta);
      setLoading(false);
    });
  };

  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <PageComponent
      title="Surveys"
      buttons={
        <TButton color={"green"} to={"/surveys/create"}>
          <PlusCircleIcon className={"h-6 w-6 mr-2"} />
          Create new
        </TButton>
      }
    >
      {loading ? (
        <div className="text-center text-lg">Loading....</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {surveys.map((survey) => (
              <SurveyListItem
                survey={survey}
                key={survey.id}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>

          <PaginationLinks meta={meta} onPageClick={onPageClick} />
        </div>
      )}
    </PageComponent>
  );
}
