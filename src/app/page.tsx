import { TodoCreator } from "~/features/todoCreator";
import { TodoList } from "~/widgets/todoList";

const Home = () => (
    <div className="flex flex-col gap-y-5 w-full h-screen px-32 pt-10">
        <h3>Список дел</h3>
        <TodoCreator />
        <TodoList />
    </div>
)

export default Home;