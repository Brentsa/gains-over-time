import { faCirclePlus, faPenToSquare, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import CreateExerciseTForm from "./forms/CreateExerciseTForm";
import UpdateExerciseTForm from "./forms/UpdateExerciseTForm";
import TabContent from "./utilities/TabContent";
import VerticalTabs from "./utilities/VerticalTabs";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";


export default function RenderVerticalTabs(){
    return (
      <VerticalTabs>
        <TabContent label='New Template' icon={faPlusSquare}>
          <CreateExerciseTForm />
        </TabContent>
        <TabContent label='Edit Template' icon={faPenToSquare}>
          <UpdateExerciseTForm />
        </TabContent>
        {/* <TabContent label='Workout' icon={faCirclePlus}>
          <div>Hello 2</div>
        </TabContent> */}
      </VerticalTabs>
    );
  }