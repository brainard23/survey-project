import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";

export default function Survey() {
const {surveys} = useStateContext();

const deleteHandler = () => {
  console.log('click')
}
console.log(surveys)
  return (
    <PageComponent title="Survey"
     buttons={(
      <TButton color="green" to="/surveys/create">
        <PlusCircleIcon className="h-6 w-6 mr-2"/>
        Create new
      </TButton>
     )}>
      <div className="grid grid-cols-1 gap-5 sm:grid-col-2 md:grid-cols-3">
      {surveys.map(survey => (
      <SurveyListItem survey={survey} key={survey.id} deleteHandler={deleteHandler}/>
    ))}
      </div>
   </PageComponent>
  );
}
