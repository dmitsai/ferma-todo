import { TodoCreator } from "~/features/todoCreator";
import { TodoList } from "~/widgets/todoList";

const Home = () => (
    <main className={'flex flex-col p-4 sm:p-6 md:p-page w-full h-full gap-y-7 sm:gap-y-16'}>
        <section className={'flex flex-col gap-y-4 sm:gap-y-10 w-full items-center'}>
            <h1 className={'text-primary font-bold text-2xl sm:text-4xl md:text-8xl'}>{'Список дел'}</h1>
            <TodoCreator />
        </section>
        <TodoList />
    </main>
)

export default Home;