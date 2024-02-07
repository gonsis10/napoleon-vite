import ToDoList from "../components/ToDoList";
import Plan from "../components/Plan";

function Dashboard() {
  return (
    <div className="absolute font-spacegrotesk bg-gray-200 h-full w-full overflow-hidden">
      <div className="absolute bg-gray-200 h-full w-full fade">
        <div className="grid grid-cols-12 grid-rows-6 h-full lg:gap-8 lg:p-8 md:gap-6 md:p-6 gap-4 p-4">
          <div className="bg-gray-100 rounded-lg col-span-5 row-start-1 row-end-4 shadow-lg">
            <ToDoList emoji="📍" name="Personal" />
          </div>
          <div className="bg-gray-100 rounded-lg col-span-5 row-start-4 row-end-7 shadow-lg">
            <ToDoList emoji="🧬" name="Work" />
          </div>
          <div className="bg-gray-100 rounded-lg col-span-7 row-start-1 row-end-7 shadow-lg">
            <Plan />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
