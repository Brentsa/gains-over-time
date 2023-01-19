import { faCirclePlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import CreateExerciseTForm from "./forms/CreateExerciseTForm";
import UpdateExerciseTForm from "./forms/UpdateExerciseTForm";
import TabContent from "./utilities/TabContent";
import VerticalTabs from "./utilities/VerticalTabs";


export default function RenderVerticalTabs(){
    return (
      <VerticalTabs>
        <TabContent label='Exercise' icon={faCirclePlus}>
          <CreateExerciseTForm />
        </TabContent>
        <TabContent label='Exercise' icon={faPenToSquare}>
          <UpdateExerciseTForm />
        </TabContent>
        {/* <TabContent label='Workout' icon={faCirclePlus}>
          <div>Hello 2</div>
        </TabContent> */}
      </VerticalTabs>
    );
  }